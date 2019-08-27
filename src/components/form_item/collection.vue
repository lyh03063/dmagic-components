<template>
  <div class v-if="valueNeed && valueNeed.length">
    <ul>
      <li
        v-for="(doc,i) in valueNeed"
        :key="i"
        :class="{'data-group':true,'edit':editItem==i}"
        @mouseenter="focusItem=i"
        @mouseleave="focusItem=999"
        @dblclick="editItem=i"
      >
        <div class v-if="editItem==i">
          <!--注意这里v-model要直接绑定valueNeed才行-->
          <json_editor v-model="valueNeed[i]" @blur="afterBlur"></json_editor>
        </div>
        <div class v-else>
          <span>{{doc}}</span>
          <div class="tool-bar" v-if="focusItem==i">
            <i class="el-icon-top btn-op" title="上移" @click="move(i, 'up')" v-if="i>0"></i>
            <i
              class="el-icon-bottom btn-op"
              title="下移"
              @click="move(i, 'down')"
              v-if="i<valueNeed.length-1"
            ></i>
            <i class="el-icon-edit btn-op" title="编辑" @click="showEditDataDialog(i)"></i>
            <i class="el-icon-copy-document btn-op" title="复制" @click="copyData(i)"></i>
            <i class="el-icon-delete btn-op" title="删除" @click="deleteData(i)"></i>
          </div>
        </div>
      </li>
      <li></li>
    </ul>

    <!--修改对象弹窗-->
    <el-dialog
      custom-class="n-el-dialog"
      width="75%"
      title="编辑一个对象"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :append-to-body="true"
      v-bind:visible.sync="showDialog"
      v-if="showDialog"
    >
      <div class>
        <!--注意这里v-model要直接绑定valueNeed才行-->
        <dm_dynamic_form :cf="cfForm" v-model="valueNeed[editIndex]"></dm_dynamic_form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import json_editor from "../../components/form_item/json_editor.vue";

export default {
  components: {
    //注册组件
    json_editor
  },
  mixins: [MIX.form_item], //混入
  props: ["prop"],
  data() {
    return {
      editIndex: 0, //编辑对象的索引
      showDialog: false,
      cfForm: {
        formItems: [
          {
            label: "字段标签",
            prop: "label"
          },
          {
            label: "字段属性",
            prop: "prop"
          },
          {
            label: "字段类型",
            prop: "type",
            type: "radio",
            default: "input",
            options: [
              { value: "input", label: "文本框" },
              {
                value: "input_find_vague",
                label: "文本框(用于列表的模糊查询)"
              },
              { value: "textarea", label: "文本域" },
              { value: "select", label: "下拉框" },
              { value: "radio", label: "单选框" },
              { value: "checkbox", label: "复选框" },
              { value: "date", label: "日期选择器" },
              { value: "dateTime", label: "日期时间选择器" },
              { value: "upload", label: "图片/文件上传" },
              { value: "jsonEditor", label: "json编辑器" },
              { value: "vueJsonEditor", label: "json编辑器（加强版）" },
              { value: "editor", label: "富文本编辑器" },
              { value: "time_period", label: "时间段查询框" },
              { value: "password", label: "密码框" },
              { value: "form", label: "子表单" }
            ]
          },
          {
            term: { type: "upload" },
            label: "上传图片配置",
            prop: "uploadConfig",
            type: "jsonEditor",
            cfForm: {
              col_span: 12,
              formItems: [
                {
                  label: "限制数量",
                  prop: "limit",
                  type: "input",
                },
                {
                  label: "列表类型",
                  prop: "listType",
                  type: "radio",
                  // default: 2,
                  options: [
                    { value: "text", label: "text" },
                    { value: "picture-card", label: "picture-card" },
                  ],
                },
                {
                  label: "是否预览",
                  prop: "preview",
                  type: "radio",
                  // default: false,
                  options: [
                    { value: true, label: "是" },
                    { value: false, label: "否" },
                  ],
                },
              ]
            }
          },
          {
            term: { type: "form" },
            label: "子表单",
            prop: "cfForm",
            type: "jsonEditor"
          }
        ]
        // btns: [
        //   { text: "保存", event: "submit", type: "primary", validate: true },
        //   { text: "取消", event: "cancel" }
        // ]
      },
      editItem: "999", //处于编辑状态的项目Index
      focusItem: "999",
      dataIn: null
    };
  },

  methods: {
    /**
     * @name 显示修改对象弹窗的函数
     */

    showEditDataDialog(i) {
      this.showDialog = true;
      this.editIndex = i;

      // this.editItem = "999";
    },
    afterBlur() {
      this.editItem = "999";
    },
    move: function(index, type) {
      this.focusItem = "999";
      util.moveData(index, type, this.valueNeed);
    },
    copyData: function(index) {
      let copy = util.deepCopy(this.valueNeed[index]);
      this.valueNeed.splice(index, 0, copy); //从下标为1的元素开始删除0个元素.
      this.$message.success("复制成功");
    },
    deleteData: async function(index) {
      this.valueNeed.splice(index, 1); //从下标为1的元素开始删除1个元素.
      // let clickStatus = await this.$confirm("确定删除该数据？").catch(() => {});
      // if (clickStatus == "confirm") {
      //   //如果点击了确定

      // }
    }
  },
  created() {}
};
</script>

<style scoped>
.data-group {
  position: relative;
  font-size: 12px;
  height: 26px;
  line-height: 26px;
  background-color: #f0f0f0;
  margin: 0 0 6px 0;
  padding: 0 6px;
  overflow: hidden;
}

.data-group.edit {
  height: auto;
  padding: 0 0;
}
.tool-bar {
  position: absolute;
  right: 0px;
  top: 0;
  height: 100%;
  background: #999;
  color: #fff;
  padding: 0 10px;
}

.btn-op {
  padding: 3px 3px;

  cursor: pointer;
}
</style>
