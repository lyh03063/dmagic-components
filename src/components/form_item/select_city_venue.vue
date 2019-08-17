<template>
  <div class>
    <table class="n-table">
      <tr>
        <td>选择城市</td>
        <td>
          <select_city v-model="arrArea" :cityName="cityName" @change-city-name="cityName=$event"></select_city>
        </td>
      </tr>
      <tr>
        <td>选择场馆</td>
        <td>
          <div class>
            <!-- <div class>根据地区id,ajax查询场馆列表</div> -->

            <el-radio
              v-model="venue"
              :label="doc.P1"
              border
              v-for="doc in venueOp"
              :key="doc.P1"
              @change="changeVanue(doc)"
            >{{doc.name}}</el-radio>
          </div>

          <div class="C_f60" v-if="!(venueOp&&venueOp.length)">该城市还没用合作的唐球馆</div>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import select_city from "./select_city.vue";

export default {
  components: { select_city },
  props: {
    value: {
      type: Object
      // default:function(){
      //  return ["44", "4401"]
      // }
    }
  },
  data() {
    return {
      valueNeed: this.value,
      venue: this.value.venueId,
      venueOp: [],
      cityName: this.value.cityName,
      url: {
        list: "/crossList?page=tangball_venue" //场馆列表接口
      },
      arrArea: [this.value.cityId.substr(0, 2), this.value.cityId]
    };
  },
  watch: {
    valueNeed: {
      handler(newName, oldName) {
        this.$emit("input", this.valueNeed); //同步valueNeed值到value
      },
      immediate: true,
      deep: true
    },
    arrArea: {
      //监听地区数组
      async handler(newName, oldName) {
     
        this.cityIdTemp = this.arrArea[1];
        if (!this.cityIdTemp)return 
        this.venueOp = await this.ajaxGetVenue(this.cityIdTemp);
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    changeVanue(docVenue) {
      //场馆变动的函数，进行数据同步
      this.valueNeed.venueId = docVenue.P1; //变动valueNeed
      this.valueNeed.venueName = docVenue.name; //变动valueNeed
      this.valueNeed.cityId = this.cityIdTemp; //变动valueNeed***
      this.valueNeed.cityName = this.cityName; //变动valueNeed***
    },
    async ajaxGetVenue(cityId) {
      //请求接口
      let { data } = await axios({
        method: "post",
        url: PUB.domain+this.url.list,
        //传递参数
        data: {
          findJson: { area: cityId }
        }
      });

      return data.list;
    }
  },
  async created() {
    //this.venueOp = await this.ajaxGetVenue("4401");
  }
};
</script>

