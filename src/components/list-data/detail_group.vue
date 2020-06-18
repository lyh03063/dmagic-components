<template>
  <div class style="padding:10px">
    <!--如果是路由组件模式，显示标题-->
    <h1 class="title" v-if="!prop_groupId">{{groupDoc.title||"标题"}}</h1>

    <dm_debug_list>
      <dm_debug_item v-model="groupId" text="groupId" />
      <dm_debug_item v-model="componentName" text="对应的列表组件名" />
      <dm_debug_item v-model="groupDoc" text="groupDoc" />
      <dm_debug_item v-model="isSpecial" text="isSpecial" />
    </dm_debug_list>

    <template class v-if="ready">
      <!--动态组件-->
      <component
        :is="componentName"
        :groupId="groupId"
        :data-type="groupDoc.dataType"
        v-if="isSpecial"
      ></component>
      <dm_detail_group_common
        :groupId="groupId"
        :data-type="groupDoc.dataType"
        @update_count="update_count"
        @inited="initedDetailGCommon"
        @single-btn-click="singleBtnClick"
        :cf="cf"
        v-else
      ></dm_detail_group_common>
    </template>
    <div class="PSF B0 R0 BC_fff W200 H20 LH_20 C_999 FS12 PL10">系统编号：{{systemId}}</div>
  </div>
</template>

<script>
//变量：{模块导入对象}
// let objDetailGroupMoudles = {};

// PUB.arrGroupMoudlesSpe.forEach(itemEach => {
//   //循环：{分组数据列表的模块名称数组}
//   objDetailGroupMoudles[`detail_group_${itemEach}`] = () =>
//     import(`@/page/detail_group_${itemEach}`);
// });

//这个不能动态import，晕死！！！！！！！！！！！！！！！
//可能是显式地使用detail_group_common标签
//而component标签动态组件却可以！！！还需待确认
// import detail_group_common from "@/page/detail_group_common.vue";

export default {
  name: "detail_group",
  // components: {
  // ...objDetailGroupMoudles, //展开{模块导入对象}
  // detail_group_group: import(`@/page/detail_group_group.vue`),
  // detail_group_note: import(`@/page/detail_group_note.vue`),
  // detail_group_common: detail_group_common
  // },
  data() {
    return {
      systemId: null,
      componentName: null, //动态组件名称
      groupDoc: {},
      groupId: null,
      ready: false
    };
  },

  props: {
    prop_groupId: {},//***属性过来的groupId，这种是组件形式而不是路由形式！！！！
    cf: {
      default: function () {
        return {};
      }
    }
  },
  computed: {
    //变量：{是否为特殊数据类型}
    isSpecial() {
      return PUB.arrGroupMoudlesSpe.includes(this.groupDoc.dataType);
    }
  },

  methods: {
    //函数：{单条数据操作事件}
    singleBtnClick: async function (actionType, row) {
      this.$emit("single-btn-click", actionType, row);
    },
    //函数：{分组数据量变更事件函数}
    update_count: async function (countData) {
      this.$emit("update_count", countData);//继续抛出
    },
    //函数：{获取分组详情函数}
    async getGroupDoc() {
      let { data } = await axios({  //请求接口
        method: "post", url: `${PUB.domain}/info/commonDetail`,
        data: { _id: this.groupId, _systemId: "$all" } //传递参数
      });
      this.groupDoc = data.doc;
      this.componentName = `detail_group_${this.groupDoc.dataType}`;
      //如果hash值是当前页面为主（不是嵌套在其他路由下）
      if (location.hash.startsWith(`#/detail_group?`)) {
        document.title = this.groupDoc.title; //修改浏览器标题栏文字
      }

      let { _systemId } = this.groupDoc
      this.systemId = _systemId;




      if (!PUB._paramAjaxAddon) {//如果{PUB._paramAjaxAddon}不存在
        //存在了就不要去覆盖！！！！！
        PUB._paramAjaxAddon = { _systemId: _systemId || "sys_apiaaaa" }
      }



      this.ready = true;
    },
    //函数：{detail_group_common组件加载后的回调函数}
    initedDetailGCommon: async function ({ vm }) {
      this.vm_detail_group_common = vm;


    },
    //函数：{初始化CF配置函数}
    initCf: async function () {
      let cfAAA = lodash.get(this.cf, `cfAAA`, {});
      let cfAAADefault = {
        aaaa: "11111"
      }
      util.setObjDefault(cfAAA, cfAAADefault);
      util.setObjDefault(this.cf, {
        // isShowSearchForm: false,
        cfAAA
      });


    },
  },
  async created() {
    this.groupId = this.prop_groupId || this.$route.query.groupId;//***优先使用prop_groupId
    this.initCf(); //调用：{初始化CF配置函数}

    this.getGroupDoc(); //调用：{获取分组详情函数}



  },
  mounted() {
    this.$emit("inited", { vm: this }); //将当前对象抛出
  }
};
</script>


<style scoped>
.title {
  font-size: 18px;
  text-align: center;
  line-height: 1;
  padding: 0 0 10px 0;
}
</style>
