<template>
  <div class>
    <dm_debug_list>
      <dm_debug_item v-model="showToolbar" text="showToolbar" />
      <dm_debug_item v-model="valueNeed" text="valueNeed" />
    </dm_debug_list>
    <!-- 这里不能使用MB8样式，会被element自带覆盖 -->
    <el-button plain @click="addGroup" size="mini" v-if="showToolbar" style="margin-bottom:8px">添加一组</el-button>

    <div class v-if="valueNeed && valueNeed.length">
      <ul>
        <li
          v-for="(doc,i) in valueNeed"
          :key="doc.__id"
          :class="{'data-group':true,'edit':editItem==i,'data-form-group':listType=='form'}"
          @mouseenter="focusItem=i"
          @mouseleave="focusItem=999"
          @dblclick="editItem=i"
        >
          <div v-if="editItem==i">
            <!--注意这里v-model要直接绑定valueNeed才行-->
            <json_editor v-model="valueNeed[i]" @blur="afterBlur"></json_editor>
          </div>
          <div class v-else>
            <dm_dynamic_form
              ref="dynamicForm"
              :cf="cfForm"
              v-model="valueNeed[i]"
              v-if="listType=='form'"
            ></dm_dynamic_form>
            <span v-else>{{doc}}</span>
            <div class="tool-bar" v-if="focusItem==i&&showToolbar">
              <i class="el-icon-top btn-op" title="上移" @click="move(i, 'up')" v-if="i>0"></i>
              <i
                class="el-icon-bottom btn-op"
                title="下移"
                @click="move(i, 'down')"
                v-if="i<valueNeed.length-1"
              ></i>
              <i
                class="el-icon-edit btn-op"
                title="编辑"
                @click="showEditDataDialog(i)"
                v-if="listType=='bar'"
              ></i>
              <i
                class="el-icon-copy-document btn-op"
                title="复制"
                @click="copyData(i)"
                v-if="listType=='bar'"
              ></i>
              <i class="el-icon-delete btn-op" title="删除" @click="deleteData(i)"></i>
            </div>
          </div>
        </li>
        <li></li>
      </ul>
    </div>

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
  name: "collection",
  components: {
    //注册组件
    json_editor
  },
  mixins: [MIX.form_item], //混入
  props: {
    listType: {
      default: "bar"
    },
    showToolbar: {
      default: true
    },

    cfForm: {
      type: Object
      // default: function() {
      //   return {

      //     // btns: [
      //     //   { text: "保存", event: "submit", type: "primary", validate: true },
      //     //   { text: "取消", event: "cancel" }
      //     // ]
      //   };
      // }
    }
  },
  watch: {
    value: {
      handler(newName, oldName) {
        if (!this.value) {
          //
          this.valueNeed = [];
        }
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      editIndex: 0, //编辑对象的索引
      showDialog: false,
      // cfForm: ,
      editItem: "999", //处于编辑状态的项目Index
      focusItem: "999",
      dataIn: null
    };
  },

  methods: {
    /**
     * @name 添加一组对象
     */

    addGroup() {
      console.log("addGroup:");

      //__id为了防止新增一组时出现残留值
      let obj = { _exit: true, __id: util.getTimeRandom() }; //_exit是为了防止出现空对象
      this.cfForm.formItems.forEach(itemEach => {
        if (itemEach.default !== null && itemEach.default !== undefined) {
          //如果默认值存在
          obj[itemEach.prop] = itemEach.default;
        }
      });

      this.valueNeed.unshift(obj);
      this.valueNeed = util.deepCopy(this.valueNeed);
    },
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
  margin: 0 0 10px 0;
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
  background: rgba(3, 3, 3, 0.5);

  color: #fff;
  padding: 0 10px;
}

.btn-op {
  padding: 3px 3px;

  cursor: pointer;
}
.btn-op:hover {
  color: yellow;
}

.data-form-group {
  height: auto;
  background-color: transparent;
  border: 1px #ddd dashed;
  border-radius: 5px;
  padding: 10px 10px 10px 8px;
}

.data-form-group .tool-bar {
  height: 24px;
  line-height: 24px;
  left: 0;
  right: auto;
  border-bottom-right-radius: 10px;
}
</style>
