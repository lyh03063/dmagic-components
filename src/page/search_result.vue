<template>
  <div>
    <dm_debug_list>
      <dm_debug_item v-model="activeName" text="activeName" />
    </dm_debug_list>

    <div class v-if="ready">
      <div class="LH50 TAC H50 C_999" v-if="!activeName">
        没有匹配的搜索结果！
      </div>
      <el-tabs v-model="activeName" v-else>
        <el-tab-pane
          :name="item.name"
          :label="`${$dictLable('dictDataType', item.name)}（${item.count}）`"
          v-for="item in arrTypeShow"
          :key="item.name"
        >
          <div
            class="DataBox"
            v-for="doc in dataResult[item.name].list"
            :key="doc._id"
          >
            <a class="n-a" :href="getLink(doc)" target="_blank">
              <span>{{ getText(doc) }}</span>
              <span style="color: red">{{ getHighLightText(doc) }}</span>
              <span>{{ getEndText(doc) }}</span>
            </a>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <dm_loading height="200" v-else></dm_loading>
  </div>
</template>
<script>
let arrType = [
  "note",
  "vedio",
  "front_demo",
  "group",
  "html_api",
  "css_api",
  "js_api",
  "url",
  "task"
];
export default {
  name: "search_result",
  mixins: [MIX.base],
  data() {
    return {
      ready: false,
      activeName: null,
      arrTypeShow: [],
      dataResult: null,
      input: "",
      keywordData: null
    };
  },
  watch: {
    $route: function (newUrl, oldUrl) {
      if (newUrl != oldUrl) {
        this.getList(); //调用：{获取列表函数}
      }
    },
    immediate: true,
    deep: true
  },
  methods: {
    //函数：{获取第一文本的函数}
    getText(doc) {
      this.startIndex = doc.title
        .toLowerCase()
        .indexOf(this.keywordData.toLowerCase());
      return doc.title.slice(0, this.startIndex);
    },
    //函数：{获取高亮文本的函数}
    getHighLightText(doc) {
      this.endIndex = this.startIndex + this.keywordData.length;
      return doc.title.slice(this.startIndex, this.endIndex);
    },
    //函数：{获取末尾文本的函数}
    getEndText(doc) {
      return doc.title.substr(this.endIndex);
    },
    //函数：{获取链接地址函数}
    getLink(doc) {
     let arrTypeGoLink = ["url"]
      let link = '#/detail_data?dataId=' + doc._id
      if (doc.link && arrTypeGoLink.includes(doc._dataType)) {
        debugger
        link = doc.link
      }

      if(doc._dataType=="front_demo"){

        if(doc.link){
          link = doc.link
        }else{
            link = `#/open/auto_layout?demoId=${doc._id}`
        }
      }
      return link
    },
    //函数：{获取列表函数}
    async getList() {
      let keyword = this.$route.query.keyword;

      let params = {
        _systemId: "sys_api",
        keyword,
        arrDateType: arrType
      }
      if (this.$route.params.gid) {//如果带分组范围id，补充参数
        params.gIdRange = this.$route.params.gid
      }
      this.keywordData = keyword;
      let {
        data: { dataResult }
      } = await axios({
        method: "post",
        url: `${PUB.domain}/info/search_info`,
        data: params
      });

      this.dataResult = dataResult;

      let arr = arrType.map(name => {
        return {
          name,
          count: lodash.get(dataResult, `[${name}].page.allCount`, 0)
        };
      });

      this.arrTypeShow = arr.filter(doc => doc.count); //过滤大于0的选项

      this.activeName = lodash.get(this.arrTypeShow, `[0].name`); //获取第一个有效选项名聚焦
      this.ready = true;
    }
  },
  //计算属性
  computed: {},
  created() {
    //在创建后调用一次消息列表接口接口
    this.getList();
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