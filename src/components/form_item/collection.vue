<template>
  <div class>
    <dm_debug_list>
      <dm_debug_item v-model="showToolbar" text="showToolbar" />
      <dm_debug_item v-model="valueNeed" text="valueNeed" />
      <dm_debug_item v-model="cfForm" />
      <dm_debug_item v-model="dragging" />
    </dm_debug_list>
    <!-- 这里不能使用MB8样式，会被element自带覆盖 -->
    <el-button @click="addGroup" v-if="ifShow('btn-add')" v-bind="cfElBtnAdd">{{cfElBtnAdd.text}}</el-button>

    <!-- <div class>valueNeed:{{valueNeed}}</div> -->
    <div class v-if="valueNeed && valueNeed.length &&readyJs">
      <!--很奇怪，现在要加上这一行，新增数据时才能显示,跟下一个div的条件是一样的-->
    </div>
    <div class v-if="valueNeed && valueNeed.length &&readyJs">
      <div>
        <!-- <div class="" > valueNeed：{{valueNeed}}</div> -->
        <!--这里加一个像素的padding，是为了鼠标悬停时轮廓不被遮挡-->
        <!--group实现互拖！！！！-->
        <draggable
          class="PT1 PL1"
          :options="{handle:'.sort-num',group:'group1'}"
          v-model="valueNeed"
          v-if="readyJs"
        >
          <div
            v-for="(doc,i) in valueNeed"
            :key="doc.__id"
            :class="{'data-group':true,'edit':editItem==i,'active':focusItem==i,'data-form-group':listType=='form'}"
            @mouseenter="mouseenterG(i)"
            @mouseleave="mouseleaveG"
            @dblclick.ctrl.shift="editItem=i"
          >
            <!--序号-->
            <i class="sort-num" v-if="listType!='form'&&showSortNum">{{i+1}}</i>
            <div class="FX1">
              <div v-if="editItem==i">
                <!--注意这里v-model要直接绑定valueNeed才行-->
                <dm_json_editor v-model="valueNeed[i]" @blur="afterBlur"></dm_json_editor>
              </div>
              <template class v-else>
                <!--如果是表单形式-->
                <dm_dynamic_form
                  ref="dynamicForm"
                  :cf="cfForm"
                  v-model="valueNeed[i]"
                  v-if="listType=='form'"
                ></dm_dynamic_form>
                <!--有插槽，传递副本和实体数据！！！！！-->
                <slot
                  v-else-if="dataSlot"
                  :name="dataSlot"
                  :doc="handelShowDoc(doc)"
                  :docEntity="doc"
                ></slot>
                <span v-else class="ML5">{{handelShowDoc(doc)}}</span>
                <div class="tool-bar" v-if="focusItem==i&&showToolbar">
                  <i
                    class="el-icon-download btn-op Rotate180"
                    title="置顶"
                    @click="move(i, 'top')"
                    v-if="i>0"
                  ></i>
                  <i class="el-icon-top btn-op" title="上移" @click="move(i, 'up')" v-if="i>0"></i>
                  <i
                    class="el-icon-bottom btn-op"
                    title="下移"
                    @click="move(i, 'down')"
                    v-if="i<valueNeed.length-1"
                  ></i>
                  <i
                    class="el-icon-download btn-op"
                    title="置底"
                    @click="move(i, 'bottom')"
                    v-if="i<valueNeed.length-1"
                  ></i>
                  <i
                    class="el-icon-edit btn-op"
                    title="编辑"
                    @click="showEditDialog(i)"
                    v-if="ifShow('btn-edit')"
                  ></i>

                  <i
                    class="el-icon-copy-document btn-op"
                    title="复制"
                    @click="copyData(i)"
                    v-if="ifShow('btn-copy')"
                  ></i>
                  <!--插槽-自定义工具栏按钮-->
                  <slot name="btn_toolbar" :doc="handelShowDoc(doc)"></slot>

                  <i
                    class="el-icon-delete btn-op"
                    title="删除"
                    @click="deleteData(i)"
                    v-if="ifShow('btn-delete')"
                  ></i>
                </div>
              </template>
            </div>
          </div>
        </draggable>
      </div>
    </div>

    <!--修改对象弹窗-->
    <!--用v-show="showDialog"，可避免日期控出错,但有副作用！！！-->
    <!--用v-show="showDialog"，可避免日期控出错-->
    <el-dialog
      custom-class="n-el-dialog"
      width="95%"
      :title="titleDialog"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :append-to-body="true"
      v-bind:visible.sync="showDialog"
      v-if="showDialog"
    >
      <div class>
        <!--注意这里v-model要直接绑定valueNeed才行-->
        <!-- <dm_dynamic_form :cf="cfForm" v-model="valueNeed[editIndex]"></dm_dynamic_form> -->
        <dm_dynamic_form :cf="cfForm" v-model="formDataEdit"></dm_dynamic_form>
        <div class="TAC MT20">
          <el-button type="primary" @click="submit" size="normal">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>



export default {
  name: "collection",
  components: {

  },
  mixins: [MIX.form_item_new], //混入
  props: {
    titleDialogAdd: {
      default: "添加数据"
    },
    titleDialogEdit: {
      default: "修改数据"
    },
    dataSlot: String,
    //新增按钮配置
    cfElBtnAdd: {
      type: Object,
      default: function () {
        return {};
      }
    },
    listType: {
      default: "bar"
    },
    showToolbar: {
      default: true
    },
    showSortNum: {//显示序号
      default: true
    },
    cfForm: {
      type: Object
    },
    //隐藏部分
    hidePart: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },

  data() {
    return {
      formDataEdit: {},//弹窗编辑表单对应的数据
      readyJs: false,
      dragging: false,
      editIndex: 0, //编辑对象的索引
      showDialog: false,
      // cfForm: ,
      editItem: "999", //处于编辑状态的项目Index
      focusItem: "999",
      dataIn: null,
      optionsDrag: {
        handle: ".sort-num",  // 在列表项中拖动句柄选择器，设置某些地方拖动才有效。
        animation: 150,  // ms, 动画速度运动项目排序时，' 0 ' -没有动画。
        // dragClass: "sortable-drag",  //拖动元素的class。
        chosenClass: "sortable-drag",  // 设置被选中的元素的class
      }
    };
  },
  computed: {
    titleDialog: function () {
      if (this.action == "add") {
        return this.titleDialogAdd
      } else if (this.action == "modify") {
        return this.titleDialogEdit
      }

    }

  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        if (!this.value) {
          //
          this.valueNeed = [];
          this.$emit("input", this.valueNeed);//触发外部数据变更
        } else {
          this.valueNeed = this.value;
          this.valueNeed.forEach(itemEach => {//循环：{valueNeed数组}
            if (!itemEach.__id) {//如果没有__id，补上，因为很多地方要用到
              itemEach.__id = util.getTimeRandom()
            }
          })
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    //函数：{提交函数}
    submit: async function () {
      if (this.action == "add") {
        this.valueNeed.unshift(this.formDataEdit) //修改原来的数据值，替换成表单数据

        this.$emit("after_add", this.formDataEdit);//触发外部数据变更
      } else if (this.action == "modify") {
        //对于this.valueNeed[this.editIndex]这个数组元素对象，是整个替换！！！！
        this.$set(this.valueNeed, this.editIndex, this.formDataEdit);
        this.$emit("after_modify", this.formDataEdit);//触发外部数据变更
        // this.value[this.editIndex] = this.formDataEdit//修改原来的数据值，替换成表单数据
      }
      await this.$nextTick();//延迟到视图更新,这句很重要，不加的话，会遇到【神坑1号】问题
      this.showDialog = false//关闭弹窗
    },
    //函数：{鼠标移入的回调函数}
    mouseenterG: async function (i) {
      if (this.dragging) return
      this.focusItem = i

      this.$emit("after_mouseenter", { focusIndex: i, list: this.valueNeed });//触发外部数据变更
    },
    //函数：{鼠标移出的回调函数}
    mouseleaveG: async function (i) {
      this.focusItem = 99999
      this.$emit("after_mouseleave", { list: this.valueNeed });//触发外部数据变更
    },
    //函数：{开始拖拽排序函数}
    dragStart: async function () {
      this.focusItem = "999";
      this.dragging = true;
    },
    //函数：{开始拖拽排序函数}
    dragEnd: async function () {
      this.dragging = false;
    },
    //函数：{返回是否显示置底区块函数}
    ifShow(part) {
      let flag = false;
      flag = !this.hidePart[part];
      //如果flag为真
      if (flag) {
        if (part == "btn-add") {
        } else if (part == "btn-edit") {
          flag = flag && this.listType == "bar";
        } else if (part == "btn-copy") {
          flag = flag && this.listType == "bar";
        }
      }
      //如果flag为真
      if (flag) {
        flag = this.showToolbar;
      }
      return flag;
    },
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

    addGroup(formDataAddon = {}) {
      this.action = "add";

      //__id为了防止新增一组时出现残留值,防止出现空对象
      let obj = { __id: util.getTimeRandom(), ...formDataAddon }; //

      let { formItems } = this.cfForm;//表单字段
      formItems = lodash.cloneDeep(formItems); //深拷贝，避免子对象产生耦合
      formItems.forEach(itemEach => {//默认值处理***
        if (itemEach.default !== null && itemEach.default !== undefined) {
          //如果默认值存在
          obj[itemEach.prop] = itemEach.default;
        }
      });

      if (this.listType == "form") {
        //如果不是表单类型

        this.valueNeed.unshift(obj);//前方追加一组新数据

      } else {
        this.formDataEdit = obj//表单数据切换
        this.showDialog = true;
      }




    },
    /**
     * @name 显示修改对象弹窗的函数
     */

    async showEditDialog(i) {
      this.action = "modify";
      this.editIndex = i;
      this.showDialog = true;//先显示弹窗
      await util.timeout(100); //延迟-这里是为了等待外部的mouseleave动作完成,数据稳定后再进行深拷贝
      //深拷贝
      this.formDataEdit = lodash.cloneDeep(this.valueNeed[this.editIndex])//表单数据切换

      // this.editItem = "999";
    },
    afterBlur() {
      this.editItem = "999";
    },
    move: function (index, type) {
      this.focusItem = "999";
      util.moveData(index, type, this.valueNeed);
    },
    copyData: function (index) {
      let copy = util.deepCopy(this.valueNeed[index]);
      copy.__id = util.getTimeRandom(); //修改__id,避免key重复
      this.valueNeed.splice(index, 0, copy); //从下标为1的元素开始删除0个元素.
      this.$message.success("复制成功");
    },
    deleteData: async function (index) {
      this.valueNeed.splice(index, 1); //从下标为1的元素开始删除1个元素.
    }
  },
  async created() {



    //按钮默认配置
    let cfElBtnAddDefault = {
      plain: true,
      size: "mini",
      text: "添加一组",
      style: "margin-bottom:8px"
    };
    //调用：{给一个对象设置默认属性函数}
    util.setObjDefault(this.cfElBtnAdd, cfElBtnAddDefault);

    await util.loadJs({ url: PUB.urlJS.sortable })//加载
    await util.loadJs({ url: PUB.urlJS.vuedraggable })//加载



    this.readyJs = true;
  }
};
</script>

<style scoped>
.data-group {
  position: relative;
  font-size: 12px;
  /* height: 26px; */
  line-height: 26px;
  background-color: #f0f0f0;
  margin: 0 0 10px 0;
  overflow: hidden;
  display: flex;
}

.data-group.edit {
  height: auto;
  padding: 0 0;
}

.data-group.active {
  /* background: #e4f5e2; */
  outline: 1px #67C23A solid;
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
  line-height: 26px;
  width: 20px;
  display: inline-block;
  background: #c5c1c1;
  color: #fff;
  font-style: normal;
  cursor: move;
}

.sortable-drag {
  background: salmon;
  border: 1px #f00 solid;
  border-radius: 5px;
}
</style>
