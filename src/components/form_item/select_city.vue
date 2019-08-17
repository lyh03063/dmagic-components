<template>
  <div class>
    <el-cascader
      :options="options"
      @active-item-change="handleItemChange"
      @change="changeArea"
      :props="props"
      v-model="valueNeed"
    ></el-cascader>
  </div>
</template>

<script>

/** 这个组件比较坑的地方在于其默认绑定的value数据格式是编号数组形式
 * 获取城市名称很不方便
 *
 */
export default {
  props: {
    value: {
      // type: [Array,String],
      // default: function() {
      //   return ["44", "4401"];
      // }
    },
    cityName: {
      type: String
    },
    valueType: {
      //值类型
      type: String
    }
  },
  data() {
    return {
      url: {
        list: "/crossList?page=dmagic_area" //列表接口
      },
      valueNeed: [],
      options: [
        {
          value: "44",
          label: "广东",
          cities: [
            {
              value: "4401",
              label: "广州"
            }
          ]
        },
        {
          value: "45",
          label: "广西",
          cities: []
        }
      ],
      cityList: null, //缓存的城市文档列表，用于获取城市名称
      props: {
        // value: "label",
        children: "cities" //指定children键名
      }
    };
  },
  

  methods: {
    changeArea(arr) {
      //函数：{城市地区变动函数}
      //这里如何获取到cityName
      let cityId = arr[1];
      let docCity = this.cityList.find(doc => doc.P7 == cityId);
      let cityName = docCity.P2;
      this.$emit("change-city-name", cityName); //同步外部的城市名称
      //Q1:{值类型}是城市ID
      if (this.valueType == "cityId") {
        this.$emit("input", cityId); //同步valueNeed值到value
      } else {
        this.$emit("input", this.valueNeed); //同步valueNeed值到value
      }
    },
    //函数：{ajax获取子地区数据函数}
    async ajaxGetOp(pid) {
      //请求接口
      let { data } = await axios({
        method: "post",
        url: PUB.domain + this.url.list,
        //传递参数
        data: {
          findJson: { P8: pid },
          sortJson: {
            "tangball.countVenue": -1//按场馆数量降序
          },
        }
      });
      if (pid != "0001") {
        //如果不是获取一级数据
        this.cityList = data.list; //缓存城市列表
      }

      return data.list.map(docEach => {
        return {
          value: docEach.P7,
          label: docEach.P2,
          cities: pid == "0001" ? [] : null //如果是省份数据，给个空数组
        };
      });
    },
    async handleItemChange(val, p2) {
      let provinceId = val[0];
      if (!provinceId) return;
      let objOption = this.options.find(opEach => opEach.value == provinceId);
      //如果能找到
      if (objOption) {

        objOption.cities = await this.ajaxGetOp(provinceId);
      }
    }
  },
  async created() {
    this.options = await this.ajaxGetOp("0001");//调用：{ajax获取子地区数据函数}

    if (this.value && this.value[0]) {
      let provinceId = this.value[0];
      //Q1:{值类型}是城市ID
      if (this.valueType == "cityId") {
        provinceId = this.value.substr(0, 2); //字符串截取前2位

        this.valueNeed = [provinceId, this.value];
        //Q1:{值类型}是地区数组
      } else {
        this.valueNeed = this.value;
      }

console.log("this.valueNeed", this.valueNeed);
      let objOption = this.options.find(opEach => opEach.value == provinceId);
      if (objOption) {
        //如果{000}000
        objOption.cities = await this.ajaxGetOp(provinceId);//调用：{ajax获取子地区数据函数}
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
