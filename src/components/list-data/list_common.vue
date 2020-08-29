<template>
  <div class>
    <!--数据列表-->
    <dm_list_data
      :cf="cfList"
      v-if="ready"
      ref="listData"
      @after-search="afterSearch"
      @after-modify="afterModify"
      @after-delete="afterDelete"
      @bacth-btn-click="bacthBtnClick"
      @single-btn-click="singleBtnClick"
    ></dm_list_data>
  </div>
</template>
<script>


export default {

  mixins: [],
  components: {},

  data() {
    return {
      ready: false,
      cfList: null,
      listIndex: null,
      dataType: null,
    };
  },
  computed: {
    //计分板筛选时的查询条件
    arrLookup: function () {
      return this.$store.state.arrLookup[this.listIndex] || [];
    },

  },
  watch: {
    "$route.query.type": {
      async handler(newUrl, oldUrl) {
        if (newUrl != oldUrl) {
          this.dataType = this.$route.query.type;
          this.listIndex = `list_${this.dataType}`
          this.ready = false;
          this.cfList = util.deepCopy(PUB.listCF[this.listIndex]);//***改变列表类型
          if (this.$route.path == "/manage/list_common") {//如果是主后台
            FN.listCFaddItemSystemId(this.cfList)//调用：{补充_systemId列表字段配置函数}

          }

          this.setFamiliarityAjaxCF()//调用：{补充熟悉度动态数据字典ajax配置函数}
          await this.$nextTick(); //延迟到视图更新
          this.ready = true;
        }
      },
      immediate: true,
      deep: true
    },
    arrLookup: {//有计分板时的监听
      async handler(newVal, oldVal) {
        //更新列表的联合查询参数-这句会有问题！！影响到原来的表单查询
        //cf.objParamAddon换成objParam解决！！！！

        this.$refs.listData.objParam.arrLookup = newVal;
        await this.$nextTick(); //延迟到视图更新
        if (!this.$refs.listData) return//注意位置！！要在await后
        this.$refs.listData.getDataList();//列表更新
      },
      // immediate: true,
      deep: true
    }
  },
  methods: {
    singleBtnClick(eventType, doc) {
      let singleBtnClick = lodash.get(PUB, `listCFAddon.${this.dataType}.methods.singleBtnClick`);
      if (singleBtnClick) {//如果函数存在，调用它
        singleBtnClick.call(this, eventType, doc)//**改变this指向 */
      }

    },
    bacthBtnClick(eventType) {
      let bacthBtnClick = lodash.get(PUB, `listCFAddon.${this.dataType}.methods.bacthBtnClick`);
      if (bacthBtnClick) {//如果函数存在，调用它
        bacthBtnClick.call(this, eventType)//**改变this指向 */
      }

    },
    afterDelete(doc) {

      let afterDelete = lodash.get(PUB, `listCFAddon.${this.dataType}.methods.afterDelete`);
      if (afterDelete) {//如果函数存在，调用它


        afterDelete.call(this, doc)//**改变this指向 */
      }
    },
    afterModify(doc) {
      let afterModify = lodash.get(PUB, `listCFAddon.${this.dataType}.methods.afterModify`);
      if (afterModify) {//如果函数存在，调用它
        afterModify.call(this, doc)//**改变this指向 */
      }
    },

    afterSearch() {
      //计分板子组件，注意定位后是一个数组，取第一个元素
      let com_score_panel = lodash.get(this, `$refs.listData.$refs.score_panel[0]`);
      if (com_score_panel) {//Q1：{计分板子组件}存在
        let comTarget2 = com_score_panel.$refs.scorePanel//真正的计分组件
        comTarget2.ajaxGetScore(); //调用：{ajax获取分数函数}
      }


      let com_stat_panel = lodash.get(this, `$refs.listData.$refs.stat_panel[0]`);
      if (com_stat_panel) {//Q1：{子组件}存在
        com_stat_panel.ajaxGetData(); //调用：{ajax获取统计数据函数}
      }


    },
    //函数：{补充熟悉度动态数据字典ajax配置函数}
    setFamiliarityAjaxCF() {
      let arrNeedScore = ["note", "html_api", "css_api", "js_api",]
      if (arrNeedScore.includes(this.dataType)) {
        //补充熟悉度ajax配置（动态数据字典）
        window.setFamiliarityAjaxCF(this.cfList);
      }
    }
  },

  created() {


    let { sysId } = this.$route.params;

    if (!sysId) {//如果不在系统页中嵌入
      util.changeFavicon(`//qn-dmagic.dmagic.cn/202007171024703232_71993_list_common.png`)//函数：{改变网页标题图标的函数}
    }



  }, mounted() {









  }
};
</script>


<style>
</style>
