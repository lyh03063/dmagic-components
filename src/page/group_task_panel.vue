<template>
  <div class="out">
    <div class="DPFC JCC H60">
      <div class="FS24">{{ pagetitle}}</div>

      <div class="ML20 box_switch">
        <a
          href="javascript:;"
          v-if="$route.name == 'group_task_panel_complete'"
          @click="
            $router.push({ name: 'group_task_panel_doing', query: { gid } })
          "
          >切换到未完成</a
        >
        <a
          href="javascript:;"
          v-if="$route.name == 'group_task_panel_doing'"
          @click="
            $router.push({ name: 'group_task_panel_complete', query: { gid } })
          "
          >切换到已完成</a
        >
      </div>
    </div>

    <router-view style="padding: 0 10px"></router-view>
  </div>
</template>
<script>
export default {
  mixins: [MIX.base,],
  name: "group_task_panel",//
  props: {
    cf: {
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {
      gid: null,
      groupDoc: {},
    };
  },
  computed: {
    pagetitle: function () {
      let statusText = (this.$route.name == 'group_task_panel_complete') ? "已完成" : "未完成"
      let title = `${this.groupDoc.title}-${statusText}任务`
      return title
    }
  },
  methods: {
    async getGroupDoc() {
      let { data } = await axios({//请求接口
        method: "post", url: `${PUB.domain}/info/commonDetail`,
        data: { _id: this.gid, _systemId: "$all", }, //传递参数
      });
      this.groupDoc = data.doc;
      document.title = this.groupDoc.title; //修改浏览器标题栏文字
      this.systemId = this.groupDoc._systemId;

      //修改PUB._paramAjaxAddon***
      PUB._paramAjaxAddon = { _systemId: this.systemId || "sys_apiaaaa" };

    },

  },
  async created() {

  },
  async mounted() {
    this.gid = this.$route.query.gid
    util.changeFavicon(`https://qn-static.dmagic.cn/task_panel.png`)//函数：{改变网页标题图标的函数}
    console.log(`this.$route:`, this.$route);
    this.$emit("inited", { vm: this }); //将当前对象抛出

    await this.getGroupDoc(); //调用：{获取分组详情函数}
  }
};
</script>
<style scoped>
.box_switch a {
  color: #999;
}
</style>