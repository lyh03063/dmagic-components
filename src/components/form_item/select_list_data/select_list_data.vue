
<template>
  <div class="DPIB">
    <dm_debug_list>
      <dm_debug_item v-model="value" text="value" />
      <dm_debug_item v-model="valueNeed" text="valueNeed" />
      <dm_debug_item v-model="label" text="label" />
      <dm_debug_item v-model="selectData" text="selectData" />
      <dm_debug_item v-model="cf" text="cf" />
    </dm_debug_list>
    <span :title="valueNeed" v-if="!cf.multiple">{{label||valueNeed}}</span>

    <el-input
      placeholder="隐藏辅助文本框，用于更新校验"
      ref="input_help"
      style="width:0px;height:0px;overflow:hidden"
    ></el-input>
    <el-button plain @click="isShowDialog=true" size="mini">选择{{cf.dataName||"数据"}}</el-button>
    <div class="MT8" v-if="cf.multiple&&!cf.hideCollection">
      <collection
        v-model="valueNeed"
        :show-toolbar="true"
        :cf-form="{}"
        :hidePart="{'btn-add':1,'btn-edit':1,'btn-copy':1}"
        data-slot="dataSlot1"
      >
        <!--插槽内容-->
        <template v-slot:dataSlot1="{doc}">{{doc[cf.labelKey]}}</template>
      </collection>
    </div>

    <!--选择数据弹窗-->
    <el-dialog
      custom-class="n-el-dialog"
      width="95%"
      :title="'选择'+cf.dataName||'数据'"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :append-to-body="true"
      v-bind:visible.sync="isShowDialog"
      v-if="isShowDialog"
    >
      <div class>
        <dm_list_data :cf="cfList" ref="listSelectData"></dm_list_data>
        <div class="TAC PT10 PB10">
          <el-button type="primary" @click="confirmSelect">确认选择</el-button>
          <el-button plain @click="isShowDialog=false">关闭</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import dm_list_data from "../../components/list-data/list-data.vue";
import collection from "../../../components/form_item/collection/index.vue";
export default {
  components: { collection },
  props: {
    cf: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  name: "select_list_data",
  mixins: [MIX.form_item], //混入
  data() {
    return {
      label: null, //数据标题
      selectData: [],
      isShowDialog: false, //是否显示弹窗
      cfList: this.cf.cfList
    };
  },
  methods: {
    //函数：{确认选择数据函数}
    async confirmSelect() {
      //获取选中的数据，此处可优化，使用selection-change事件
      let selection = this.$refs.listSelectData.$refs.table.selection;
      if (!selection.length) return this.$message.error("未选择任何数据");
      this.selectData = util.deepCopy(selection);

      if (this.cf.multiple) {
        //Q1：多选
        this.valueNeed = this.valueNeed || [];

        let { selectJson } = this.cf;
        if (this.cf.selectJson) {
          this.selectData = this.selectData.map(doc => {
            let obj = {};
            //遍历selectJson对象
            for (let prop in selectJson) {
              if (selectJson[prop]) {
                //如果{selectJson}中存在
                obj[prop] = doc[prop];
              }
            }
            return obj;
          });
        }

        this.valueNeed.push(...this.selectData); //追加
      } else {
        //Q2：单选
        this.valueNeed = lodash.get(
          this.selectData,
          `[0].${this.cf.valueKey || "P1"}`
        );
        this.label = lodash.get(
          this.selectData,
          `[0].${this.cf.labelKey || "name"}`
        );
      }

      this.isShowDialog = false; //关闭弹窗

      this.$emit("select",this.valueNeed);//抛出事件并传递数据

      // await this.$nextTick(); //延迟到视图更新
      //       this.$parent.$parent.$forceUpdate()//强制视图更新
      // this.$parent.$forceUpdate()//强制视图更新
      // this.$forceUpdate()//强制视图更新
      //弹窗内的表单元素聚焦会触发字段的校验，但赋值后并不消失，forceUpdate方法不管用
      //这里用到一个辅助的el-input组件的聚焦失焦来解决
      this.$refs.input_help.focus();
      await this.$nextTick(); //延迟到视图更新
      this.$refs.input_help.blur();
    },
    /**
     * @name ajax获取label函数
     */

    ajaxGetLabel: async function() {
      if (!this.value) return;
      let {
        data: { Doc: docNeed }
      } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/crossDetail?page=${this.cf.pageName}`,
        data: {
          id: this.value
        } //传递参数
      });

      if (!docNeed) return;
      this.label = docNeed[this.cf.labelKey];
    }
  },
  created() {
    if (!this.value) {
      //如果{value}不存在
      this.valueNeed = "";
    }
  },
  async mounted() {
    this.ajaxGetLabel(); //调用：{ajax获取label函数}
  }
};
</script>


<style scoped>
</style>
