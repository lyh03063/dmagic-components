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
    >
     
    </dm_list_data>
  </div>
</template>
<script>

//变量：{存储普通列表的差异化配置}
PUB.listCFAddon = {
  role: {
    methods: {
      //角色列表修改时触发的函数
      async afterModify(doc) {
        //如果修改的是当前的角色，更新当前的权限
        if (doc._id == PUB.$sys.roleId) {
          util.setLocalStorageObj(PUB.keyPower, doc.power); //调用：{设置一个对象到LocalStorage}
          let clickStatus = await this.$confirm(
            "当前用户的角色被修改，需要刷新页面才能生效，是否刷新？"
          ).catch(() => { });
          if (clickStatus == "confirm") {//如果点击了确定
            window.location.reload(); //函数调用：{重载页面}
          }
        }
      }
    },
  },
  file: {
    methods: {
      //文件列表删除文件后触发的函数
      async afterDelete(arrDoc) {
        let url = lodash.get(arrDoc, `[0].file[0].url`);//实体文件路径
        if (!url) return
        let clickStatus = await this.$confirm("是否删除对应的实体文件？").catch(() => { });
        if (clickStatus != "confirm") return
        let dataResult = await util.deleteQiNiuFile(url)
        await util.ajaxDeleteBaseFile(url)

        if (dataResult.code == 0) {//如果{000}000
          this.$message.success('删除文件成功!');
        } else {
          this.$message.error(dataResult.error);
        }
      }
    },
  },
  file_base: {
    methods: {
      //文件列表删除文件后触发的函数
      async afterDelete(arrDoc) {
        let url = lodash.get(arrDoc, `[0].link`);//实体文件路径
        if (!url) return
        let clickStatus = await this.$confirm("是否删除对应的实体文件？").catch(() => { });
        if (clickStatus != "confirm") return
        let dataResult = await util.deleteQiNiuFile(url)
        if (dataResult.code == 0) {//如果{000}000
          this.$message.success('删除文件成功!');
        } else {
          this.$message.error(dataResult.error);
        }
      }
    },
  }
}
PUB.listCFAddon.image = PUB.listCFAddon.file//图片列表页加上删除对应的实体文件

PUB.listCFAddon.data_item = {
  methods: {
    //批量操作栏按钮事件
    async bacthBtnClick(eventType) {
      if (eventType == "buildDebugJs") {//如果{事件类型}生成调试版本Js文件
        let { data } = await axios({
          //请求接口
          method: "post", url: `${PUB.domain}/info/builtAllItemJS`,
          data: { "version": "1.0.0", "uplloadQiNiu": false }
        });
        if (data.code == 0) {//如果ok
          this.$alert(`生成文件成功:${PUB.domain}/built_js/config_item.1.0.0.js`, {
            confirmButtonText: '确定',
          });
        }
      } else if (eventType == "buildDebugQiNiuJs") {//如果{事件类型}生成Js文件并上传七牛云
        alert(`{事件类型}生成Js文件并上传七牛云`);

      }
    }
  },
}
PUB.listCFAddon.js_file = {
  methods: {
    //批量操作栏按钮事件
    async singleBtnClick(eventType, doc) {
      let { _id, fileName } = doc
      if (eventType == "buildDebugJs") {//如果{事件类型}生成调试版本Js文件
        const loading = this.$loading({
          lock: true, text: "执行中，请勿关闭", spinner: "el-icon-loading", background: "rgba(0, 0, 0, 0.7)"
        });
        let { data } = await axios({//请求接口
          method: "post", url: `${PUB.domain}/info/builtJSFile`,
          data: { _id, "uplloadQiNiu": false }
        });
        loading.close(); //关闭loding
        if (data.code == 0) {//如果ok
          this.$alert(`生成文件成功:${PUB.domain}/built_js/${fileName}`, {
            confirmButtonText: '确定',
          });
        } else {
          this.$message.error(data.error);
        }
      } else if (eventType == "buildProductionJs") {//如果{事件类型}生成Js文件并上传七牛云
        let clickStatus = await this.$confirm("将生成新版本Js文件并上传七牛云，确定操作？").catch(() => { });
        if (clickStatus != "confirm") return
        const loading = this.$loading({
          lock: true, text: "执行中，请勿关闭", spinner: "el-icon-loading", background: "rgba(0, 0, 0, 0.7)"
        });

        let { data } = await axios({//请求接口
          method: "post", url: `${PUB.domain}/info/builtJSFile`,
          data: { _id, "uplloadQiNiu": true, "transES5": true }
        });
        loading.close(); //关闭loding
        if (data.code == 0) {//如果ok
          let { result } = data
          this.$alert(`生成文件成功:${result.downloadDomain}/${result.fileName}`, {
            confirmButtonText: '确定',
          });
        } else {
          this.$message.error(data.error);
        }



      }
    }
  },
}


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







  }, mounted() {

  }
};
</script>


<style>
</style>
