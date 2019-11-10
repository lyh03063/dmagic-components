<template>
  <div class>
    <dm_debug_list>
      <dm_debug_item v-model="showToolbar" text="showToolbar" />
      <dm_debug_item v-model="valueNeed" text="valueNeed" />
    </dm_debug_list>
    <!-- 这里不能使用MB8样式，会被element自带覆盖 -->
    <el-button @click="addGroup" v-if="showToolbar" v-bind="cfElBtnAdd">{{cfElBtnAdd.text}}</el-button>

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
          <i class="sort-num" v-if="listType!='form'">{{i+1}}</i>
          <div v-if="editItem==i">
            <!--注意这里v-model要直接绑定valueNeed才行-->
            <json_editor v-model="valueNeed[i]" @blur="afterBlur"></json_editor>
          </div>
          <template class v-else>
            <dm_dynamic_form
              ref="dynamicForm"
              :cf="cfForm"
              v-model="valueNeed[i]"
              v-if="listType=='form'"
            ></dm_dynamic_form>
            <slot v-else-if="dataSlot" :name="dataSlot" :doc="handelShowDoc(doc)"></slot>
            <span v-else>{{handelShowDoc(doc)}}</span>
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
          </template>
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
        <div class="TAC">
          <el-button type="primary" @click="showDialog=false" size="normal">确定</el-button>
        </div>
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
    dataSlot: String,
    //新增按钮配置
    cfElBtnAdd: {
      type: Object,
      default: function() {
        return {};
      }
    },
    listType: {
      default: "bar"
    },
    showToolbar: {
      default: true
    },

    cfForm: {
      type: Object
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
    //处理线上doc的函数
    handelShowDoc(doc) {
      //深拷贝
      var docNew = lodash.cloneDeep(doc);
      delete docNew.__id;
      return docNew;
    },
    /**
     * @name 添加一组对象
     */

    addGroup() {
      console.log("addGroup:");

      //__id为了防止新增一组时出现残留值,防止出现空对象
      let obj = { __id: util.getTimeRandom() }; //
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
    }
  },
  created() {
    //按钮默认配置
    let cfElBtnAddDefault = {
      plain: true,
      size: "mini",
      text: "添加一组",
      style: "margin-bottom:8px"
    };
    //调用：{给一个对象设置默认属性函数}
    util.setObjDefault(this.cfElBtnAdd, cfElBtnAddDefault);
  }
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
  height: 26px;
  line-height: 26px;
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

.sort-num {
  text-align: center;
  height: 26px;
  line-height: 26px;
  width: 20px;
  display: inline-block;
  background: #c5c1c1;
  color: #fff;
  font-style: normal;
}
</style>
