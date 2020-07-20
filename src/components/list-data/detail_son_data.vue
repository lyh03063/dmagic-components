<template>
  <div class="out">
    <dm_pannel_son_note class :index="i" :indexText="i+1" :doc="d" v-for="(d,i) in list" :key="i"></dm_pannel_son_note>
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
          "recursionGId": "sonNoteGId",//指定递归的分组ID**
          groupId: this.doc.sonNoteGId,
          arrType: ["group", "note"],
          $projectTgAddon: {
            _detail: "$targetDoc._detail",
            "sonNoteGId": "$targetDoc._data.sonNoteGId" //子数据分组ID返回来**
          }
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
</style>