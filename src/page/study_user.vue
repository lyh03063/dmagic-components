<template>
  <div class>
    <div class="PL20 PT20">
      <el-tabs tab-position="left" v-model="activeName0">
        <el-tab-pane label="我的" name="mine" :lazy="true">
          <dm_pannel_new class="ML8" title="我的" skin="default__version2">
            <el-tabs class="MT8" v-model="activeName1" type="card">
              <el-tab-pane label="学习概况" name="desc" :lazy="true">
                <el-row
                  class="MB10"
                  :gutter="10"
                  type="flex"
                  v-for="(doc) in arrObjScore"
                  :key="doc.scoreKey"
                >
                  <el-col style="width:190px">{{doc.name}} (数量：{{doc.allCount}})</el-col>
                  <el-col style="width:270px">
                    <el-progress
                      :stroke-width="26"
                      :percentage="doc.score"
                      :text-inside="true"
                      :color="customColors"
                    ></el-progress>
                  </el-col>
                  <el-col style="width:80px">
                    <a :href="doc.link">
                      <el-button type="primary" size="mini">去学习</el-button>
                    </a>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="我的demo" name="my_demo" :lazy="true">
                <dm_list_data :cf="cfListMyDemo" class></dm_list_data>
              </el-tab-pane>
              <el-tab-pane label="我的任务" name="my_task" :lazy="true">
                <dm_list_data :cf="cfListMyTask" class></dm_list_data>
              </el-tab-pane>
            </el-tabs>
          </dm_pannel_new>
        </el-tab-pane>
        <el-tab-pane label="最近访问" name="latest" :lazy="true">
          <dm_pannel_new class="ML8" title="最近访问" skin="default__version2">
            <el-tabs class="MT8" v-model="activeName" type="card">
              <el-tab-pane label="笔记" name="first" :lazy="true">
                <dm_list_visit_history
                  :cf="{'dataTypeDict':'note','findJsonAddon':{_userId: $sys.userId,'dataType':'note',}}"
                  class="PT10"
                ></dm_list_visit_history>
              </el-tab-pane>

              <el-tab-pane label="视频" name="second" :lazy="true">
                <dm_list_visit_history
                  :cf="{'dataTypeDict':'vedio','findJsonAddon':{_userId: $sys.userId,'dataType':'vedio',}}"
                  class="PT10"
                ></dm_list_visit_history>
              </el-tab-pane>
              <el-tab-pane label="JS代码块" name="js_code" :lazy="true">
                <dm_list_visit_history
                  :cf="{'dataTypeDict':'js_code','findJsonAddon':{_userId: $sys.userId,tagPage: 'js_code_edit',},cfListAddon: {comCard: 'dm_card_js_code_hs',cfComCard: { target: '_blank' },}}"
                  class="PT10"
                ></dm_list_visit_history>
              </el-tab-pane>
            </el-tabs>
          </dm_pannel_new>
        </el-tab-pane>
        <el-tab-pane label="访问最多" name="most" :lazy="true">
          <dm_pannel_new class="ML8" title="访问最多" skin="default__version2">
            <el-tabs class="MT8" v-model="activeName2" type="card">
              <el-tab-pane label="笔记" name="note" :lazy="true">
                <dm_list_visit_often
                  :cf="{'dataTypeDict':'note','findJsonAddon':{_userId: $sys.userId,'dataType':'note',},cfListAddon: {comCard: 'dm_card_note_often',cfComCard: { target: '_blank' },}}"
                  class="PT10"
                ></dm_list_visit_often>
              </el-tab-pane>
              <el-tab-pane label="视频" name="vedio" :lazy="true">
                <dm_list_visit_often
                  :cf="{'dataTypeDict':'vedio','findJsonAddon':{_userId: $sys.userId,'dataType':'vedio',},cfListAddon: {comCard: 'dm_card_note_often',cfComCard: { target: '_blank' },}}"
                  class="PT10"
                ></dm_list_visit_often>
              </el-tab-pane>
              <el-tab-pane label="JS代码块" name="js_code" :lazy="true">
                <dm_list_visit_often
                  :cf="{'dataTypeDict':'js_code','findJsonAddon':{_userId: $sys.userId,tagPage: 'js_code_edit',},cfListAddon: {comCard: 'dm_card_js_code_often',cfComCard: { target: '_blank' },}}"
                  class="PT10"
                ></dm_list_visit_often>
              </el-tab-pane>
            </el-tabs>
          </dm_pannel_new>
        </el-tab-pane>
      </el-tabs>

      <!--我的收藏-->
      <!-- <collect></collect> -->
    </div>
  </div>
</template>
<script>
export default {
  mixins: [MIX.base],
  components: {
    collect: () => import("@/page/study_collect.vue")
  },
  data() {
    return {
      activeName: 'first',
      activeName0: 'mine',
      activeName1: 'desc',
      activeName2: 'note',
      cfListMyTask: null,
      cfListMyDemo: null,
      cfListMyHisNote: null,
      ready: false,
      customColors: "#67C23A",
      arrObjScore: [
        {
          scoreKey: "note",
          name: "知识点",
          score: 0,
          allCount: 0,
          link:
            "#/study_home/detail_group_g_card?groupId=5e19d9fff3c94a3971f45595"
        },
        {
          scoreKey: "html_api",
          name: "Html API",
          score: 0,
          allCount: 0,
          link: "#/study_home/list_html_api"
        },
        {
          scoreKey: "css_api",
          name: "Css API",
          score: 0,
          allCount: 0,
          link: "#/study_home/list_css_api"
        },
        {
          scoreKey: "js_api",
          name: "Javascript API",
          score: 0,
          allCount: 0,
          link: "#/study_home/list_js_api"
        }
      ]
    };
  },
  watch: {
    $route: function (newUrl, oldUrl) {
      if (newUrl != oldUrl) {
      }
    },
    immediate: true,
    deep: true
  },
  methods: {
    //函数：{获取知识点分数函数}
    async getScoreNote() {
      let { data } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/info/commonDetail`,
        data: {
          _dataType: "familiarity",
          _systemId: PUB._systemId,
          findJson: {
            _userId: PUB.$sys.userId,
            _idRel: "5e19d9fff3c94a3971f45595"
          }
        } //传递参数
      });
      let doc = data.doc;
      let { score } = doc;
      if (!score) return;
      score.allCount = 540;
      Object.assign(this.dictScore[`note`], score); //合并对象
    },
    //函数：{获取其他分数函数}
    async getScoreOther() {
      let arrScoreKey = this.arrObjScore.map(doc => doc.scoreKey);

      let {
        data: { list }
      } = await axios({
        method: "post",
        url: `${PUB.domain}/info/getCommonList`,
        data: {
          _dataType: "score",
          _systemId: PUB._systemId,
          findJson: {
            scoreKey: { $in: arrScoreKey },
            _userId: PUB.$sys.userId
          }
        }
      });

      list.forEach(doc => {
        let { score, scoreKey } = doc;
        if (!score) return;
        score.score = parseFloat(score.score); //进度条要求数值类型
        if (!this.dictScore[scoreKey]) return;
        Object.assign(this.dictScore[scoreKey], score); //合并对象
      });

    },
    //函数：{初始化函数}
    async init() {
      this.getScoreNote(); //调用：{获取知识点分数函数}
      this.getScoreOther(); //调用：{获取其他分数函数}
    }
  },
  //计算属性
  computed: {},
  created() {
    //变量：{数据字典}
    this.dictScore = lodash.keyBy(this.arrObjScore, "scoreKey");

    //在创建后调用一次消息列表接口接口
    this.init();

    let cfListMyTask = lodash.cloneDeep(PUB.listCF.list_task_my);
    cfListMyTask.objParamAddon.findJson = { personCharge: this.$sys.userId };
    this.cfListMyTask = { ...cfListMyTask };


    let cfListMyDemo = lodash.cloneDeep(PUB.listCF.list_front_demo);
    cfListMyDemo.objParamAddon.findJson = { _userId: this.$sys.userId };
    cfListMyDemo.isShowBreadcrumb = false;
    cfListMyDemo.isShowToolBar = false;
    this.cfListMyDemo = { ...cfListMyDemo };



    // let cfListMyHisNote = lodash.cloneDeep(PUB.listCF.list_visit_record);
    // cfListMyHisNote.objParamAddon.findJson = { _userId: this.$sys.userId, dataType: "note", tagPage: "detail_data" };
    // this.cfListMyHisNote = { ...cfListMyHisNote };

    /****************************处理笔记历史记录列表配置-START****************************/

    let cfListMyHisNote = lodash.cloneDeep(PUB.listCF.list_visit_record);

    Object.assign(cfListMyHisNote, {//合并对象
      isShowTable: false,//隐藏表格
      isShowBreadcrumb: false,//面包屑
      isShowSearchForm: false,//查询表单
      isShowToolBar: false,//批量操作栏
      requireProp: ["timeVisited", "dataId"],//特殊数据对象返回
      comCard: "dm_card_note_history",//卡片组件
      cfListFlex: { col: 1 },
      dynamicDict: [
        { "ajax": { "url": "/info/getCommonList", "param": { "_dataType": "note" } }, "idColumn2": "_id", "idColumn": "dataId", "populateColumn": "dataTarget" }
      ],
      sortJsonDefault: { "timeVisited": 1 },//第二次排序
      pageSize: 10,
      cfPagination: {
        small: true,
        layout: "total,  prev,  next",
      }
    });
    cfListMyHisNote.objParamAddon.findJson = { _userId: this.$sys.userId, dataType: "note", tagPage: "detail_data" };
    cfListMyHisNote.objParamAddon.forbidSelectJson = true;//** */
    cfListMyHisNote.objParamAddon.arrLookup = [
      {
        "$group": {
          "_id": {
            "dataId": "$_data.dataId"
          },
          "timeVisited": {
            "$last": "$_data.timeVisited"//取最后一个
          },
          "arrTimeVisited": {//时间数组。用于测试
            "$push": "$_data.timeVisited"
          },
          "dataId": {
            "$last": "$_data.dataId"//取最后一个
          },
          "tagPage": {
            "$last": "$_data.tagPage"//取最后一个
          }
        }
      },

      {//第二次排序
        $sort: {
          timeVisited: -1
        }
      }
    ]

    this.cfListMyHisNote = cfListMyHisNote;
    /****************************处理笔记历史记录列表配置-END****************************/





  }
};
</script>
<style scoped>
.DataBox {
  width: 100%;
  text-align: left;
  font-size: 15px;
  height: 50px;
  border-bottom: 1px solid #dcdfe6;
  color: #60627e;
  line-height: 50px;
}
</style>