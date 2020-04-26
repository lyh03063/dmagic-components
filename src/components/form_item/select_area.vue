<template>
  <div class>
    <el-cascader
      placeholder="请选择城市地区"
      ref="cascader"
      :options="options"
      @change="changeArea"
      :props="props"
      v-model="valueNeed"
      v-if="ready"
    ></el-cascader>
    <span class="LH40 C_999" v-else>地区数据加载中...</span>
    <!-- valueNeed:{{valueNeed}} <br>
    options:{{options}}-->
  </div>
</template>

<script>

let T;
export default {
  props: {
    value: {},
    valueType: {
      //值类型
      type: String
    },
    level: {
      default: 3,
      //层级
      type: [String, Number]
    },
    opLevel1: {
      //第一层数据
      type: Array
    }
  },
  data() {
    let id = 0;
    return {
      ready: false, //选项数据是否准备完毕
      props: {
        lazy: true,
        //函数：{懒加载函数}
        async lazyLoad(node, resolve) {
          const { level } = node;
          let { value: pid } = node;
          //延迟函数
          let options = await T.ajaxGetOp(pid); //调用：{ajax获取子地区数据函数}
          resolve(options);
        }
      },
      url: {
        list: `/crossList?page=dmagic_area` //列表接口
      },
      valueNeed: [],
      options: [
        {
          value: "44",
          label: "广东"
        }
      ]
    };
  },

  methods: {
    //函数：{城市地区变动函数}
    changeArea(arr) {
      //Q1:{值类型}是末级地区ID
      if (T.valueType == "lastId") {
        //这里如何获取到cityName
        let lastId = arr[arr.length - 1]; //获取最后一个数组元素
        T.$emit("input", lastId); //同步valueNeed值到value
        //Q2:{值类型}是地区对象
      } else if (T.valueType == "arrObj") {
        //调用：{获取选中的节点数组}****
        let [{ pathNodes }] = T.$refs.cascader.getCheckedNodes();
        let arrObj = pathNodes.map(doc => {
          let { label, value } = doc;
          return { label, value };
        });
        T.$emit("input", arrObj); //同步valueNeed值到value
        //Q3:否则
      } else {
        T.$emit("input", T.valueNeed); //同步valueNeed值到value
      }
    },
    //函数：{ajax获取子地区数据函数}
    async ajaxGetOp(pid) {
      //请求接口
      let { data } = await axios({
        method: "post",
        url: PUB.domain + T.url.list,
        //传递参数
        data: {
          findJson: { P8: pid },
          sortJson: {
            // "tangball.countVenue": -1 //按场馆数量降序
          }
        }
      });

      let levelCurr = T.getLevel(pid); //变量：{当前请求的数据层级}

      return data.list.map(docEach => {
        let obj = {
          value: docEach.P7,
          label: docEach.P2
        };
        //如果当前列表的层级大于等于{显示层级}
        if (levelCurr >= T.level) {
          obj.leaf = true; //叶子节点
        }
        return obj;
      });
    },
    //函数：{根据返回当前地区数据的层级}
    getLevel(pid) {
      let level;
      if (pid == "0001") {
        //Q1:{父级id}是0001
        level = 1;
      } else if (pid.length == 2) {
        //Q2:{父级id}是2位
        level = 2;
      } else if (pid.length == 4) {
        //Q3:{父级id}是4位
        level = 3;
      }
      return level;
    },
    //函数：{初始化组件数据函数}
    async initData() {
      let countNeedAjaxInit = T.valueNeed.length - 1; //变量：{需初始化选项次数}

      let countHasInit = 0; //变量：{已初始化选项次数}
      async function fnGetChildren(list) {
        //函数定义：{递归ajax初始化选项函数}

        let areaId;
        //Q1:{值类型}是末级地区ID
        if (T.valueType == "lastId") {
          //根据 {已初始化选项次数}定位到地区id

          //变量：{用于提取地区id的位置数组}****

          let arrIndex;
          if (countHasInit == 0) {
            //Q1:{已初始化选项次数}为0
            arrIndex = [0, 2];
          } else if (countHasInit == 1) {
            //Q2:{已初始化选项次数}为1
            arrIndex = [0, 4];
          }

          areaId = T.value.slice(...arrIndex);
          //Q1:{值类型}是地区对象数组
        } else if (T.valueType == "arrObj") {
          //根据 {已初始化选项次数}定位到地区id
          areaId = lodash.get(T, `value[${countHasInit}].value`);
          //Q2:否则
        } else {
          areaId = lodash.get(T, `value[${countHasInit}]`);
        }

        let objOption = list.find(opEach => opEach.value == areaId);
        //如果对应的对象能找到
        if (objOption) {
          objOption.children = await T.ajaxGetOp(areaId); //调用：{ajax获取子地区数据函数}
          countHasInit++;
          if (countHasInit >= countNeedAjaxInit) return; //如果{已初始化选项次数}足够，结束递归
          await fnGetChildren(objOption.children);
        }
      }
      await fnGetChildren(T.options);
    }
  },
  beforeCreate() {
    T = this;
  },
  async created() {
    if (T.opLevel1) {
      //Q1:{初始第一层数据}存在
      T.options = T.opLevel1;
    } else {
      //Q2:{初始第一层数据}不存在
      T.options = await T.ajaxGetOp("0001"); //调用：{ajax获取子地区数据函数}
    }
    //如果有初始数据

    let firstEle = lodash.get(T, `value[0]`);
    if (firstEle) {
      //变量：{省份Id}
      let provinceId = firstEle;

      //Q1:{值类型}是末级地区ID
      if (T.valueType == "lastId") {
        provinceId = T.value.slice(0, 2); //字符串截取
        let cityId = T.value.slice(0, 4); //字符串截取

        if (T.value.length == 6) {
          T.valueNeed = [provinceId, cityId, T.value];
        } else if (T.value.length == 4) {
          T.valueNeed = [provinceId, T.value];
        } else {
          T.valueNeed = [T.value];
        }
        //Q2:{值类型}是地区对象数组
      } else if (T.valueType == "arrObj") {
        T.valueNeed = T.value.map(doc => doc.value);
        //Q3:否则
      } else {
        T.valueNeed = T.value;
      }
      //如果初始化的数组长度大于限制层级数，进行截取，否则初始化数据会有异常
      if (T.valueNeed.length > T.level) {
        T.valueNeed.length = T.level;
      }

      await T.initData(); //调用：{初始化组件数据函数}
    }
    T.ready = true;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to T component only -->
<style scoped>
</style>
