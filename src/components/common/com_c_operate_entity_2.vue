<template>
  <div>
    <!--气泡弹窗-->
    <el-popover
      placement="right"
      width="300"
      v-model="visible"
      trigger="hover"
      :open-delay="300"
    >
      <div class="MB10">
        <i class="MR10 btn_mimi el-icon-edit" @click="fnEdit(doc)">修改</i>
        <i class="MR10 btn_mimi el-icon-delete" @click="fnDeleteRef(doc)"
          >删除引用</i
        >


        <i class="MR10 btn_mimi " @click="emit('copy')"
          >复制</i
        >
        <!-- <i class="MR10 btn_mimi el-icon-delete">删除实体</i> -->
      </div>

      <!--候选值列表-->
      <div class="">
        <!-- <el-button icon="el-icon-edit" circle @click="emit('modify')" size="mini"></el-button> -->

        <el-button
          title="置顶"
          class="sort-top-bottom"
          icon="el-icon-top"
          circle
          @click="emit('top')"
          size="mini"
        ></el-button>
        <el-button
          title="上移"
          icon="el-icon-top"
          circle
          @click="emit('up')"
          size="mini"
        ></el-button>
        <el-button
          title="下移"
          icon="el-icon-bottom"
          circle
          @click="emit('down')"
          size="mini"
        ></el-button>
        <el-button
          title="置底"
          class="sort-top-bottom"
          icon="el-icon-bottom"
          circle
          @click="emit('bottom')"
          size="mini"
        ></el-button>
      </div>

      <i class="DPIB FS20 C_999 el-icon-setting" slot="reference"></i>
    </el-popover>

    <!--编辑数据弹窗-->
    <dm_dialog_edit
      :cf="cfEditDialog"
      @after-modify="afterModify"
      v-if="readyEditDialog"
    ></dm_dialog_edit>

    <!-- {{groupDoc}} -->
  </div>
</template>

<script>
export default {
  mixins: [MIX.base],
  name: "com_c_operate_entity_2",
  props: {
    dataTypeP: {},
    doc: {
      default: function () {
        return {
        }
      }
    }
  },
  data() {
    return {
      visible: false,

      readyEditDialog: false,
      //编辑数据配置
      cfEditDialog: {
        listType: "common", //通用型列表-影响urlModify
        visible: false,
        cfFormModify: {
          paramAddonInit: {
            _id: "5e78bb5444ba565370025aa5",
            _systemId: "sys_api",//待优化
            _dataType: "url"
          }
        }
      }
    };
  },
  computed: {


  },
  methods: {
    //函数：{删除引用数据函数}
    fnDeleteRef: async function (doc) {
      let { _id } = doc
      let clickStatus = await this.$confirm("确定删除该数据？").catch(() => { });
      if (clickStatus != "confirm") return


      let ajaxParam = {
        _id: _id,
        _dataType: "relation",
        _systemId: "sys_api",//待优化

      };
      await axios({//请求删除接口
        method: "post", url: `${PUB.domain}/info/commonDelete`,
        data: ajaxParam //传递参数
      }).catch(function (error) {
        alert("异常:" + error);
      });

      this.$emit("single-action", { action: "delete_ref", doc });

    },
    //函数：{修改基础信息后的回调函数}
    afterModify: async function (docModify) {
      this.$set(this.doc, "title", docModify.title);
      console.log(`this.doc:`, this.doc);


    },
    //函数：{编辑数据函数}
    fnEdit: async function (doc) {
      let { dataType, _idRel2 } = doc
      this.cfEditDialog.cfFormModify.paramAddonInit._id = _idRel2//修改id
      this.cfEditDialog.cfFormModify.paramAddonInit._dataType = this.dataTypeP//数据类型--要拿父级的数据类型--因为dataType是子数据的类型
      this.$nextTickStatus("readyEditDialog")//重载组件，更新弹窗内部表单
      this.cfEditDialog.visible = true;


    },
    emit: async function (evType) {
      let { doc } = this;
      //   alert(`emit-${evType}`);
      //   this.vm_list = this.$closest({ vmT: this, name: "dm_list_data" })
      //  this.$emit("single-action", evType, this.doc);
      this.$emit("single-action", { action: evType, doc });


      this.visible = false;
    },

  },
  created() {






  }
};
</script>

<style scoped>
/* 小操作按钮 */
.btn_mimi {
  font-style: normal;
  border: 1px #ddd solid;
  color: #777;
  border-radius: 5px;
  padding: 3px 6px;
  font-size: 12px;
  text-decoration: none;
  margin: 0 5px 0 0;
  background-color: #fff;
  cursor: pointer;
}
</style>