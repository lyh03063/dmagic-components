<template>
  <div class="out">
    <dm_collection
      ref="collection"
      v-model="valueNeed"
      :show-toolbar="true"
      :cf-form="cf.cfForm"
      :cfElBtnAdd="cfElBtnAdd"
      :hidePart="{'btn-add111':true}"
      data-slot="dataSlot1"
      @after_add="afterAdd"
      @after_modify="afterModify"
      titleDialogEdit="修改Css属性/属性值"
      titleDialogAdd="添加Css属性/属性值"
    >
      <!--插槽内容-->
      <template v-slot:dataSlot1="{doc,docEntity}">
        <!-- {{docEntity.__id}} -->
        <span class="DPF PL5 PT5 PB5" v-if="doc">
          <!-- <textarea class="" v-focus v-if="docEntity.isEditProp"></textarea> -->
          <!-- <el-input
            style="width:150px;"
            v-focus
            autosize
            type="textarea"
            :rows="1"
            v-model="docEntity.prop"
            v-if="docEntity.isEditProp"
            @blur="docEntity.isEditProp=false"
          ></el-input>-->
          <!-- @select="docEntity.isEditProp=false" -->
          <dm_auto_css_prop v-model="docEntity.prop" v-if="idEditProp==docEntity.__id"></dm_auto_css_prop>

          <span
            class="code_css_prop FS14"
            slot="reference"
            @click.stop="goEditProp(docEntity)"
            v-else
          >{{docEntity.prop}}</span>
          <span class="PL3 PR3">:</span>

          <!-- @blur="docEntity.isEditPVal=false" -->
          <div class="DPF" @click.stop>
            <template class v-if="idEditVal==docEntity.__id">
              <el-input
                style="width:150px;"
                v-focus
                autosize
                type1="textarea"
                size="mini"
                :rows="1"
                v-model="docEntity.value"
              ></el-input>
            </template>

            <span
              class="code_css_val FS14"
              slot="reference"
              @click.stop="goEditPropVal(docEntity)"
              v-else
            >{{docEntity.value}}</span>

            <!--颜色选择器-->
            <el-color-picker
              class="ML5"
              size="mini"
              v-model="docEntity.value"
              v-bind="optionsPropVal(docEntity).cfColorPicker"
              v-if="optionsPropVal(docEntity).type=='color'"
            ></el-color-picker>
            <!-- {{cfOptionInput(docEntity)}} -->
            <!--普通候选项组件-->
            <dm_option_input
              class="ML5"
              v-model="docEntity.value"
              :options="optionsPropVal(docEntity).options"
              :cf="cfOptionInput(docEntity)"
              v-if="optionsPropVal(docEntity).options&&cfOptionInput(docEntity)"
            ></dm_option_input>
          </div>

          <!-- <el-popover placement="bottom-start" width="220" trigger="hover">
            <div class>
              <el-input style="width:200px;" type="textarea" :rows="1" v-model="docEntity.value"></el-input>
            </div>
            <span class="code_css_val" slot="reference">{{docEntity.value}}</span>
          </el-popover>-->
        </span>
      </template>
    </dm_collection>
  </div>
</template>
<script>
export default {
  mixins: [MIX.base, MIX.form_item_new],
  name: "row_css_code",//
  props: {
    cf: {
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {
      idEditVal: null,//处于编辑状态的属性值id
      idEditProp: null,//处于编辑状态的属性id
      cfElBtnAdd: { text: "+Css属性", type: "info", size: "mini", },
      children: null,
      // cfOptionInput: { cfListFlex: {} },
    };
  },
  computed: {
    //候选项组件配置*
    cfOptionInput: function () {
      let fn = function (docEntity) {
        let { prop } = docEntity
        let docCss = PUB.arrCssProp.find(d => d.prop == prop)
        if (!docCss) return {};
        let { objFrequency } = docCss
        if (!objFrequency) return {};
        let { style, } = objFrequency
        let cfNeed = { cfListFlex: {} }
        if (style && style.width) {//如果style存在
          cfNeed.cfListFlex.widthG = style.width
        }
        return cfNeed
      }
      return fn
    },

    //属性值候选项*
    optionsPropVal: function () {
      let fn = function (docEntity) {
        let { prop } = docEntity
        let docCss = PUB.arrCssProp.find(d => d.prop == prop)
        if (!docCss) return {};
        let { objFrequency } = docCss
        console.log(`objFrequency:###`, objFrequency);
        if (!objFrequency) return {};
        let { options, style, type, cfColorPicker } = objFrequency
        return { options, type, cfColorPicker }
      }
      return fn

    }
  },
  methods: {

    //函数：{切换到编辑属性名称状态}
    goEditPropVal: async function (docEntity) {
      console.log(`docEntity:####`, docEntity);
      this.idEditProp = null;
      let { __id } = docEntity;
      this.idEditVal = __id
      let evTag = "click.click_cancel_edit_css_prop_val"//变量：{事件名称-带命名空间}
      $("html").off(evTag).on(evTag, () => {//给html绑定取消编辑状态的事件
        this.idEditVal = null
        $("html").off(evTag)
      })

    },



    //函数：{切换到编辑属性名称状态}
    goEditProp: async function (docEntity) {
      console.log(`docEntity:####`, docEntity);
      let { __id } = docEntity;
      this.idEditVal = null;
      this.idEditProp = __id
      let evTag = "click.click_cancel_edit_css_prop"//变量：{事件名称-带命名空间}
      $("html").off(evTag).on(evTag, () => {//给html绑定取消编辑状态的事件
        this.idEditProp = null
        $("html").off(evTag)
      })



      // this.$set(docEntity, 'isEditProp', true)
      // let evTag = "click.click_cancel_edit_css_prop"//变量：{事件名称-带命名空间}
      // $("html").off(evTag).on(evTag, function () {//给html绑定取消编辑状态的事件
      //   docEntity.isEditProp = false;
      //   delete docEntity.isEditProp;
      //   $("html").off(evTag)
      // })

    },
    //函数：{添加数据后的回调函数}
    afterAdd: async function (data) {

      let { prop } = data
      util.addCssUseHistory({ prop })//调用：{添加Css使用的LocalStorage历史记录}


    },
    //函数：{修改数据后的回调函数}
    afterModify: async function (data) {
      let { prop } = data
      util.addCssUseHistory({ prop })//调用：{添加Css使用的LocalStorage历史记录}


    },





    //函数：{初始化组件配置函数}
    initCF: async function () {

      let valItem = { prop: "value", label: "value(属性值)", type: "input", col_span: 12 }
      let T = this;
      let formItems = [
        {
          prop: "prop", label: "prop(属性名)", type: "input", component: "dm_input_css_prop",
        },
        { prop: "value", label: "value(属性值)", type: "input", col_span: 12, }
      ]


      util.setObjDefault(this.cf, {
        labelKey: "prop",
        cfForm: {
          size: "mini",
          labelWidth: "150px",
          watch: { //传入监听器
            async prop(newVal, oldVal) {
              //要改造value字段，如果有值项，变成下拉框，否则是文本框
              let valItemCurr = util.getValItemByCssProp(newVal)//调用：{根据Css属性获取到的value字段配置}
              if (!valItemCurr) return
              let index = formItems.findIndex(d => d.prop == newVal);//value字段的索引
              formItems.splice(index, 1);//删除一个字段
              await this.$forceUpdate()//强制视图更新*****
              // await this.$nextTick();//延迟到视图更新
              formItems.push(valItemCurr);//加入一个字段
              this.$forceUpdate()//强制视图更新*****第二次
            },
          },
          formItems,

        },
      });

    },
  },
  async created() {
    this.initCF()//调用：{初始化组件配置函数}



  },
  mounted() {
    this.$emit("inited", { vm: this }); //将当前对象抛出
  }
};
</script>
<style scoped>
</style>