<template>
  <div class>
   
    <div class>
      赛事类型:
      <span
        class="C_f30"
        v-if="matchInfo&&matchInfo.matchType"
      >{{matchInfo.matchType==2?"全国赛":"普通赛"}}</span>
，
<span  v-if="matchInfo&&matchInfo.matchType==2">选择场馆:</span>
    </div>
    <div class v-if="matchInfo&&matchInfo.matchType==2">
  <el-radio
      class="MB10"
        v-model="valueNeed"
        :label="doc.venueId"
        border
        v-for="(doc,index) in matchInfo.cityVenueList"
        :key="index"
        @change="$emit('input', doc.venueId)"
      >{{doc.cityName}}--{{doc.venueName}}</el-radio>
    </div>
  </div>
</template>

<script>
export default {
  //用于列表模糊查询的组件
  props: {
    value: [Number, String],
    matchId: {
      type: [Number, String],
      default: null
    }, //赛事ID
   
  },
  data() {
    return {
      matchInfo: null, //赛事信息
      url: {
        detail: "/crossDetail?page=tangball_match"
      },
      valueNeed: this.value
    };
  },
  watch: {
    valueNeed: {
      handler(newVal, oldVal) {
        this.$emit("input", this.valueNeed); //同步valueNeed值到value
      },
      // immediate: true,//组件初始化时立即执行一次变动
      deep: true //深度监听
    },
    matchId: {
      handler(newVal, oldVal) {
        if (!this.matchId) return;
        this.getMatchData();
      },
      immediate: true, //组件初始化时立即执行一次变动
      deep: true //深度监听
    }
  },
  methods: {
    async getMatchData() {
      //函数：{根据赛事id，ajax获取赛事信息函数}
      let { data } = await axios({
        //请求接口
        method: "post",
        url: PUB.domain+this.url.detail,
        data: {
          id: this.matchId
        } //传递参数
      });

      this.matchInfo = data.Doc;
    }
    // changeVanue(doc) {

    //   this.$emit("change-venue-id", json); //触发双向绑定
    // }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
