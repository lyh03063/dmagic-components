<template>
  <div class>
    <div class v-if="enrollInfo">
      城市赛场馆Id:
      <span class="C_f30">
        <ajax_populate :id="enrollInfo.cityVenueId" page="tangball_venue">
          <template v-slot:default="{doc}">
            {{doc.P1}}
            (
            {{doc.name}})
          </template>
        </ajax_populate>
      </span>
    </div>
    <div class v-else>没有对应的城市赛场馆</div>
  </div>
</template>

<script>

export default {
  components: {  },
  //用于列表模糊查询的组件
  props: {
    value: [Number, String],
    matchId: {
      type: [Number, String],
      default: null
    }, //赛事ID
    memberId: {
      type: [Number, String],
      default: null
    } //会有ID
  },
  data() {
    return {
      enrollInfo: {}, //赛事信息
      url: {
        list: "/crossList?page=tangball_enroll"
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
      immediate: true //组件初始化时立即执行一次变动
    },
    memberId: {
      handler(newVal, oldVal) {
        if (!this.memberId) return;
        this.getMatchData();
      },
      immediate: true //组件初始化时立即执行一次变动
    }
  },
  methods: {
    async getMatchData() {
      if (!(this.memberId && this.matchId)) return;
      //函数：{根据赛事id，ajax获取赛事信息函数}
      let { data } = await axios({
        //请求接口
        method: "post",
        url: PUB.domain+this.url.list,
        data: {
          findJson: { memberId: this.memberId, matchId: this.matchId }
        } //传递参数
      });
      let { list } = data;
      if (list.length) {
        //如果{000}000
        this.enrollInfo = list[0];
        this.valueNeed = this.enrollInfo.cityVenueId;
      } else {
        this.enrollInfo = null;
        this.valueNeed = null;
      }
    }
    
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
