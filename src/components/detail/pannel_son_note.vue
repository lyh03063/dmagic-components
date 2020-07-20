<template>
  <section class="out" :class="`layer_${layer}`">
    <section class="section_title">
      <span class="section_title_icon">{{indexText}}</span>
      <h2 class="FX1">{{doc.targetDoc.title}}</h2>
      <div class>
        熟悉度：
        <dm_familiarity_select
          class=""
          v-model="familiarityDoc"
          :data="doc.targetDoc"
          :dataType="doc.targetDoc._dataType"
          v-if="doc.targetDoc._dataType"
        ></dm_familiarity_select>
        <i class="el-icon-edit Cur1" @click="editDetail">编辑</i>
      </div>
    </section>
    <div class="DPF content_box">
      <!--连线效果-->
      <div class="left_line"></div>
      <div class="right_box FX1">
        <section v-html="doc.targetDoc._detail" class="section_content"></section>

        <div class v-if="doc.sonList">
          <dm_pannel_son_note
            :layer="layer+1"
            :indexText="getSonIndexText(i+1)"
            :index="i"
            :doc="docSon"
            v-for="(docSon,i) in doc.sonList"
            :key="i"
          ></dm_pannel_son_note>
        </div>
      </div>
    </div>
    <!--编辑笔记弹窗-->
    <dm_dialog_edit :cf="cfEditDialog" @after-modify="afterModify" v-if="ready"></dm_dialog_edit>
  </section>
</template>
<script>
export default {
  mixins: [MIX.base,],
  name: "pannel_son_note",//
  props: {
    index: {//当前笔记的序号
      default: 0
    },
    layer: {//当前笔记的层级
      default: function () {
        return 1;
      }
    },
    indexText: {//父笔记的序号文本
      default: ""
    },
    doc: {
    },
    cf: {
      default: function () {
        return {};
      }
    }
  },

  data() {
    return {
      familiarityDoc: {},
      ready: false,//是否准备完毕
      //编辑数据弹窗配置
      cfEditDialog: {
        listType: "common", //通用型列表-影响urlModify
        cfFormModify: {
          paramAddonInit: {
            _id: "5e78bb5444ba565370025aa5",
            _systemId: "$all",
            _dataType: "url"
          }
        }
      },
    };
  },
  computed: {
    getSonIndexText(i) {
      let fn = function (i) {
        let text = i;
        if (this.indexText) {//如果{000}000
          text = `${this.indexText}-${text}`
        }
        return text
      }
      return fn

    }
  },
  methods: {
    //函数：{编辑完成的回调函数}
    afterModify: async function (doc) {
      console.log(`doc:####`, doc);
      Object.assign(this.doc.targetDoc, doc)//合并对象

    },
    //函数：{编辑详情函数}
    editDetail: async function () {
      this.cfEditDialog.visible = true

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
    //函数：{ajax获取当前数据的熟悉度}
    async ajaxGetFamiliarity() {
      let { data } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/info/commonDetail`,
        data: {
          _systemId: "sys_api",//注意这里先写死了
          _dataType: "familiarity",
          findJson: {
            _idRel: this.doc.targetDoc._id,

            userId: PUB.$sys.userId
          } //获取列表的数据总量
        } //传递参数
      });
      this.familiarityDoc = data.doc;
    },
  },
  async created() {
    this.initCF()//调用：{初始化组件配置函数}

    this.cfEditDialog.cfFormModify.paramAddonInit._dataType = this.doc.targetDoc._dataType;
    this.cfEditDialog.cfFormModify.paramAddonInit._id = this.doc.targetDoc._id;

    await this.ajaxGetFamiliarity(); //调用：{ajax获取当前数据的熟悉度}

    // this.familiarityDoc = this.doc.targetDoc;
    this.ready = true;
  },
  mounted() {
    this.$emit("inited", { vm: this }); //将当前对象抛出
  }
};
</script>
<style scoped>
.section_title {
  padding: 3px 10px;
  display: flex;
}
.section_title h2 {
  font-size: 18px;
  padding: 7px 0;
  line-height: 1;
}

.section_title_icon {
  font-size: 18px;
  margin-right: 10px;
}

.layer_1 > .section_title > .section_title_icon {
  background-color: seagreen;
  display: inline-block;
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 50%;
  color: #ffffff;

  font-family: Arial;
}

.section_content {
  padding: 2px 0 12px 0;
  font-size: 15px;
}
.left_line {
  border-left: 1px #ccc dashed;
  margin-right: 15px;
}

.content_box {
  margin-left: 26px;
}
</style>