
<template>
  <div class>
    <dm_debug_list>
      <dm_debug_item v-model="value" text="value" />
      <dm_debug_item v-model="valueNeed" text="valueNeed" />
      <dm_debug_item v-model="label" text="label" />
      <dm_debug_item v-model="selectData" text="selectData" />
      <dm_debug_item v-model="cf" text="cf" />
    </dm_debug_list>
    <span :title="valueNeed">{{label||valueNeed}}</span>

    <el-input placeholder="辅助文本框，用于更新校验" ref="input_help" style="width:0px;"></el-input>
    <el-button plain @click="isShowDialog=true" size="mini">选择{{cf.dataName||"数据"}}</el-button>

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

export default {
  //   components: { dm_list_data },
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
      console.log("selection:", selection);
      if (!selection.length) return this.$message.error("未选择任何数据");

      this.selectData = util.deepCopy(selection);
      this.isShowDialog = false;
      this.valueNeed = lodash.get(
        this.selectData,
        `[0].${this.cf.valueKey || "P1"}`
      );
      console.log("this.valueNeed:", this.valueNeed);
      this.label = lodash.get(
        this.selectData,
        `[0].${this.cf.labelKey || "name"}`
      );

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

      console.log("docNeed:", docNeed);
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
