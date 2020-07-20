<template>
  <div>
    <dm_debug_list>
      <dm_debug_item v-model="activeName" text="activeName" />
    </dm_debug_list>

    <div class v-if="ready">
      <div class="collectBox" v-if="!activeName">收藏夹空空如也</div>
      <el-tabs v-model="activeName" v-else>
        <el-tab-pane
          :name="item.name"
          :label="`${$dictLable('dataType',item.name)}（${item.count}）`"
          v-for="item in arrTypeShow"
          :key="item.name"
        >
          <div class="DataBox" v-for="doc in dataResult[item.name].list" :key="doc._id">
            <a class="n-a" :href="'#/detail_data?dataId=' +doc._id" target="_blank">
              {{doc.title}}
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
  "url"
];
export default {
  mixins: [MIX.base],
  data() {
    return {
      ready: false,
      activeName: null,
      arrTypeShow: [],
      dataResult: null,
      input: "",
    };
  },
//   watch: {
//     $route: function(newUrl, oldUrl) {
//       if (newUrl != oldUrl) {
//         this.getList(); //调用：{获取列表函数}
//       }
//     },
//     immediate: true,
//     deep: true
//   },
  methods: {
   
    //函数：{获取列表函数}
    async getList() {
      let keyword = "三元";
      let {
        data: { dataResult }
      } = await axios({
        method: "post",
        url: `${PUB.domain}/info/search_info`,
        data: {
          _systemId: "sys_api",
          keyword,
          arrDateType: arrType
        }
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
.collectBox{
    color: #999999;
}
</style>
