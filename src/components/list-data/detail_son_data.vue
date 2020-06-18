<template>
  <div class="out">
    <!-- <el-button plain @click="ajaxGetSonNote" size="mini">ajax刷新</el-button>
    <div class>{{doc.title}}</div> -->
    <section class v-for="(d,i) in list" :key="i">
      <h2 class="section_title">
        <span class="section_title_icon">{{i+1}}</span>
        {{d.targetDoc.title}}
      </h2>
      <section v-html="d.targetDoc._detail" class="section_content"></section>
    </section>
  </div>
</template>
<script>
export default {
  mixins: [MIX.base,],
  name: "detail_son_data",//
  props: {
    doc: {},
    cf: {
      default: function () {
        return {

        };
      }
    }
  },
  data() {
    return {

      list: null,
    };
  },
  methods: {
    //函数：{ajax获取笔记的子笔记列表函数}
    ajaxGetSonNote: async function () {
      let {
        data: { list }
      } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/info/getCommonGroupList`,
        data: {
          _systemId: "$all",
          groupId: this.doc.sonNoteGId,
          arrType: ["group", "note"],
          $projectTgAddon: { _detail: "$targetDoc._detail", }
        }
      });
      this.list = list
    },

    //函数：{初始化组件配置函数}
    initCF: async function () {
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
    this.initCF()//调用：{初始化组件配置函数}
    this.ajaxGetSonNote()//调用：{ajax获取笔记的子笔记列表函数}
  },
  mounted() {
    this.$emit("inited", { vm: this }); //将当前对象抛出
  }
};
</script>
<style scoped>
.section_title {
  font-size: 18px;
  padding: 5px 10px;
  line-height: 1;
}

.section_title_icon {
  background-color: seagreen;
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 50%;
  color: #ffffff;
  margin-right: 5px;
  font-family: Arial;
}

.section_content {
  padding: 8px 0;
  font-size: 15px;
}
</style>