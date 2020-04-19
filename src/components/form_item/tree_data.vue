<template>
  <div class="item-box">
    <dm_debug_list>
      <dm_debug_item v-model="cf" />
      <dm_debug_item v-model="cf.cfTree" />
      <dm_debug_item v-model="valueNeed" />
    </dm_debug_list>
    <el-button type="text" size="mini" @click="showDialogAdd({actionType:'appendLevel1'})">添加一级项</el-button>
    <el-button type="text" size="mini" @click="foldAll">全部收起</el-button>
    <el-button type="text" size="mini" @click="expandAll">全部展开</el-button>

    <!-- default-expand-all 、 :default-expanded-keys="expandedKeys"-->
    <el-tree
      ref="tree"
      :data="valueNeed"
      :node-key="cf.idKey"
      :expand-on-click-node="false"
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
      v-bind="cf.cfTree"
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      v-if="ready"
      style=""
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => showDialogAdd({data,node,actionType:'modify'})"
          >修改</el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => showDialogAdd({data,actionType:'append'})"
          >+子级</el-button>
          <el-button
            class="MR6"
            type="text"
            size="mini"
            @click="() => showDialogAdd({data,node,actionType:'after'})"
          >+同级</el-button>
          <i class="el-icon-close Cur1" @click="() => remove(node, data)"></i>
        </span>
      </span>
    </el-tree>

    <!--新增项弹窗-->
    <el-dialog
      custom-class="n-el-dialog"
      width="55%"
      :title="mapDialogTitle[actionType]"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :append-to-body="true"
      v-bind:visible.sync="isShowDialog"
      v-if="isShowDialog"
    >
      <dm_dynamic_form
        :cf="cf.cfForm"
        v-model="formData"
        @submit="submitForm"
        @cancel="closeDialogAdd"
      ></dm_dynamic_form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  mixins: [MIX.form_item_new],
  //用于列表模糊查询的组件
  props: {
    cf: {
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      isShowDialog: false,
      ready: true,
      formData: {},
      actionType: "",//当前操作类型
      mapDialogTitle: {//弹窗标题映射
        "appendLevel1": "添加一级数据",
        "append": "添加子级数据",
        "after": "添加同级数据",
        "modify": "修改数据",
      }

    };
  },

  computed: {
    //项label键名
    labelKey() {
      return this.cf.cfTree.props.label
    },
    //项子级数组键名
    childrenKey() {
      return this.cf.cfTree.props.children
    }


  },
  methods: {
    //函数：{收起所有节点函数}
    foldAll() {
      this.cf.cfTree["default-expand-all"] = false
      this.$nextTickStatus("ready")


    },
    //函数：{展开所有节点函数}
    expandAll() {
      this.cf.cfTree["default-expand-all"] = true
      this.$nextTickStatus("ready")

    },
    //函数：{显示新增弹窗函数}
    showDialogAdd(param) {
      let { data: dataParent, node, actionType } = param
      this.actionType = actionType;
      this.nodeCurr = node;
      if (actionType == "modify") {//Q1：如果是修改
        this.formData = lodash.cloneDeep(node.data)


      } else {//Q2：否则
        if (dataParent) {//QK1：如果父级数据存在
          this.dataParent = dataParent;
        } else {//QK2：父级数据不存在
          this.dataParent = null
        }
      }




      this.isShowDialog = true;//打开弹窗


    },
    //函数：{关闭新增弹窗函数}
    closeDialogAdd() {
      this.isShowDialog = false;//关闭弹窗
      this.formData = {}//清空表单数据

    },
    //函数：{展开指定节点的函数}
    expandNode(id) {
      console.log(`id:`, id);
      this.$refs.tree.store.nodesMap[id].expanded = true;
    },
    //函数：{添{加一级项目函数}
    submitForm() {
      if (this.actionType == "modify") {//Q1:修改
        Object.assign(this.nodeCurr.data, this.formData);//合并对象

      } else { //Q2:新增
        const newChild = { ...this.formData };
        if (!newChild[this.cf.idKey]) {//如果id不存，补充一个随机id

          newChild[this.cf.idKey] = util.getTimeRandom()//调用：{返回带时间戳的随机数函数}
        }

        if (this.dataParent) {//QK1:{父级数据}存在

          if (this.actionType == "append") {//QKK1:加子级

            if (!this.dataParent[this.childrenKey]) {
              this.$set(this.dataParent, this.childrenKey, []);
            }
            this.dataParent[this.childrenKey].push(newChild);
            this.expandNode(this.dataParent[this.cf.idKey])//调用：{展开指定节点的函数}
          } else if (this.actionType == "after") {//QKK2:加同级
            console.log(`this.nodeCurr:`, this.nodeCurr);
            let arrSilin = this.nodeCurr.parent.data
            if (this.nodeCurr.level != 1) {//如果不是一级数据（因为一级数据是跟数组）
              arrSilin = this.nodeCurr.parent.data[this.childrenKey]
            }
            console.log(`arrSilin:`, arrSilin);
            let index = arrSilin.findIndex(doc => doc[this.cf.idKey] == this.nodeCurr.data[this.cf.idKey])
            console.log(`index:`, index);
            console.log(`newChild:`, newChild);
            arrSilin.splice(index + 1, 0, newChild)//在指定位置插入数据

          }

        } else { //QK2:{父级数据}不存在-添加一级
          this.valueNeed.push(newChild);
        }
      }





      this.formData = {}//清空表单数据
      this.isShowDialog = false;//关闭弹窗

    },


    remove(node, data) {
      const parent = node.parent;
      const children = parent.data[this.childrenKey] || parent.data;
      const index = children.findIndex(d => d[this.cf.idKey] === data[this.cf.idKey]);
      children.splice(index, 1);
    },
    handleDragStart(node, ev) {
      console.log('drag start', node);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode[this.labelKey]);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode[this.labelKey]);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode[this.labelKey]);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode[this.labelKey], dropType);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode[this.labelKey], dropType);
    },
    allowDrop(draggingNode, dropNode, type) {
      return true;
    },
    allowDrag(draggingNode) {
      return true;
    }
  },
  created() {
    if (!this.value) {
      this.valueNeed = []

    }



    let cfTree = this.cf.cfTree || {}

    //树默认配置
    let cfTreeDefault = {
      draggable: true,
      props: {
        children: 'children',
        label: 'label'
      }
    }

    util.setObjDefault(cfTree, cfTreeDefault);

    let cfForm = this.cf.cfForm || {}
    //表单默认配置
    let cfFormDefault = {
      labelWidth: "150px",
      formItems: [
        {
          label: "名称",
          prop: "label",
          type: "input"
        }

      ],
      btns: [
        { text: "新增", event: "submit", type: "primary", validate: true },
        { text: "关闭", event: "cancel" }
      ]
    }

    util.setObjDefault(cfForm, cfFormDefault);



    //两层配置结构，为了更好拓展


    util.setObjDefault(this.cf, {
      idKey: "id",
      cfTree: cfTree,
      cfForm: cfForm,

    });

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.item-box {
  max-width:600px;
  border: 1px #ddd dashed;
  border-radius: 5px;
  padding: 5px 10px;
}
</style>
