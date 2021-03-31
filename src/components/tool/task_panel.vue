<template>
  <div class="out" :class="mode">
    <div class="DPFC MB10">
      <dm_dynamic_form
        class="FX1"
        :cf="cfFilterForm"
        v-model="dataFilterForm"
      ></dm_dynamic_form>
      <el-button class="MR20" @click="ajaxGetList" size="small" type="primary"
        >刷新</el-button
      >
    </div>

    <div class="grid_row head">
      <div class="">标题</div>
      <div class="">优先级</div>
      <div class="">完成度</div>
      <div class="">负责人</div>
      <div class="">预计耗时</div>
      <div class="">创建时间</div>
      <div class="">父级</div>
    </div>
    <dm_list_flex_res
      class="MB20"
      :list="list"
      #default="{ item }"
      col="1"
      :style_g="{ 'margin-bottom': '0' }"
    >
      <div
        class="data_row grid_row"
        :class="{ clickFocus: idClickFocus == item._id }"
        @mouseenter="dataCurr = item"
        @click="rowClick"
      >
        <div :class="'prior_' + item.prior">
          <a
            class="n-a MR10 FS16 title"
            :title="item.title"
            target="_blank"
            :href="`#/detail_data?dataId=${item._id}`"
            >{{ item.title }}</a
          >
        </div>

        <div class="PR30">
          <!--优先级选择组件-->
          <dm_priority_radio
            v-model="item.prior"
            @change="fnChangePriority"
          ></dm_priority_radio>
        </div>
        <div class="W200">
          <!--百分比选择组件-->
          <dm_percent_radio
            v-model="item.complete"
            @change="fnChangeProgress"
          ></dm_percent_radio>
          <!-- <com_complete :doc="item"></com_complete> -->
        </div>
        <div class="">{{ getPersonCharge(item) }}</div>
        <div class="">{{ item.predictTime }}小时</div>
        <div class="">{{ $moment(item.CreateTime).format("YYYY-MM-DD") }}</div>
        <div class="arrAncestors">
          <!-- {{item.arrAncestors}} -->
          <div class="ancestors_text" :title="getAncestors(item)">
            {{ getAncestors(item) }}
          </div>
        </div>
      </div>
    </dm_list_flex_res>
  </div>
</template>
<script>
//变量：{负责人选项数组}
let arrPersonCharge = [{
  label: "刘咏辉",
  value: "13691916429"
}, {
  label: "蔡伟",
  value: "15011101179"
},]
DYDICT.taskPersonCharge = lodash.keyBy(arrPersonCharge, 'value')//加入数据字典，方便使用$util.getDictLabel方法

export default {
  mixins: [MIX.base,],
  name: "task_panel",//
  props: {

    mode: {//complete表示已完成的
      default:"doing"
    },
    gid: {},
    cf: {
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {

      idClickFocus: null,//点击聚焦的数据id
      gidIN: this.gid,
      dataCurr: null,//当前数据
      list: [],
      dataFilterForm: {//筛选表单数据
        personCharge: null,
      },
      cfFilterForm: {//筛选表单配置项
        labelWidth: "90px",
        formItems: [{
          label: "负责人",
          "prop": "personCharge",
          "component": "dm_grid_radio",
          options: arrPersonCharge,
          cfAddon: {
            cf_empty_item: true,
            skin: "grid_split",

          }
        },]
      },

    };
  },

  watch: {
    //深度监听筛选表单数据
    dataFilterForm: {
      handler(newVal, oldVal) {
        this.ajaxGetList()//调用：{ajax获取任务列表函数}
      },
      // immediate: true,
      deep: true
    }
  },
  //FIXME:methods
  methods: {
    //函数：{获取父级链文本函数}
    getAncestors: function (item) {
      let { arrAncestors } = item;
      if (!arrAncestors) return
      //深拷贝
      let arrNew = lodash.cloneDeep(arrAncestors);
      arrNew.shift();//第一项不显示
      return arrNew.map((d) => d.title).join(" > ")

    },
    //函数：{获取负责人函数}
    getPersonCharge: function (item) {
      if (!item.personCharge) return ""

      let arrName = item.personCharge.map(d => {
        return util.getDictLabel("taskPersonCharge", d)//获取中文名
      })
      return arrName.join()

    },
    //函数：{数据行点击事件的回调函数}
    rowClick: async function (value) {
      this.idClickFocus = this.dataCurr._id
    },
    //函数：{优先级变动事件的回调函数}
    fnChangePriority: async function (value) {
      await this.ajaxModifyTask({ key: "prior", value })
      // this.ajaxGetList()//调用：{ajax获取任务列表函数}
    },
    //函数：{进度值变动事件的回调函数}
    fnChangeProgress: async function (value) {
      await this.ajaxModifyTask({ key: "complete", value })
      // if (value == 1) this.ajaxGetList()//调用：{ajax获取任务列表函数}
    },

    //函数：{ajax修改数据函数}
    ajaxModifyTask: async function ({ key, value }) {
      let _data = {}
      _data[key] = value
      await axios({//请求接口-修改数据
        method: "post", url: `${PUB.domain}/info/commonModify`, data: { _dataType: "task", _id: this.dataCurr._id, _data }
      });

    },

    //函数：{ajax获取任务列表函数}
    ajaxGetList: async function () {
      if (!this.gid) {
        if (this.$route.params.gid) {//如果带分组范围id，补充参数
          this.gidIN = this.$route.params.gid
        } else if (this.$route.query.gid) {//如果带id参数
           this.gidIN = this.$route.query.gid
        } else {
          return this.$message.error('gid不存在');
        }
      }
      let { data } = await axios({//请求接口-角色
        method: "post", url: `${PUB.domain}/info/searchTask`,
        data: { "gIdRange": this.gidIN, "mode": this.mode, findJson: this.dataFilterForm }
      });
      this.list = data.list
    },

  },
  async created() {
    this.ajaxGetList()//调用：{ajax获取任务列表函数}

  },
  mounted() {
    this.$emit("inited", { vm: this }); //将当前对象抛出
  }
};
</script>
<style scoped>
/* TODO-grid样式 */
.grid_row {
  display: grid;
  grid-template-columns: 380px 190px 200px 130px 100px 100px 200px;
  gap: 1px;
  padding: 0 5px;
}

.grid_row.head {
  height: 26px;
  background: #f8f8f8;
}
.grid_row.head > * {
  display: grid;
  place-items: center start;
}
.grid_row.data_row {
  border-bottom: 1px #ddd dashed;
  height: 46px;
}

.grid_row.data_row > * {
  display: grid;
  place-items: center start;
}

.title {
  height: 22px;
  overflow: hidden;
}

.doing .prior_1 .title {
  color: #f56c6c;
}
.clickFocus {
  background: #f0f0f0;
}

.arrAncestors {
  word-break: keep-all;
  white-space: nowrap;
  color: #999;
}

.ancestors_text {
  width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>