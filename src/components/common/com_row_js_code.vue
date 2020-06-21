<template>
  <div class>
    <div class="DPF">
      <div class="Cur1" @click="unfold" v-if="countRelJs">
        <i class="el-icon-caret-right" :class="{Rotate90:isShowSon}"></i>
        <span class="C_999">[{{countRelJs}}]</span>
      </div>
      <div class>{{docComplete.title}}<span v-if="docComplete.desc">：{{docComplete.desc}}</span>
      </div>
    </div>
    <div class v-if="isShowSon&&docComplete.relJsCode">
      <!--递归-->
      <dm_select_list_data v-model="docComplete.relJsCode" :cf="cf" @son_change="son_change"></dm_select_list_data>
    </div>
  </div>
</template>

<script>
export default {
  name: "com_row_js_code",
  props: {

    doc: {},
    docComplete: {
      default: function () {
        return {};
      }
    },
    cf: {
      default: function () {
        return {};
      }
    }
  },
  components: {},

  data() {
    return {
      isShowSon: false,
    };
  },
  computed: {
    countRelJs: function () {
      return lodash.get(this.docComplete, `relJsCode.length`);
    },



  },
  methods: {
    //函数：{展开函数}
    unfold: async function () {
      this.isShowSon = !this.isShowSon;

    },
    //函数：{子级数据变动函数}
    son_change: async function (dataSon) {
      this.saveData(dataSon)//调用：{保存当前数据函数}

    },

    //函数：{保存当前数据函数}
    saveData: async function (dataSon) {
      await axios({//修改接口-当前父任务
        method: "post", url: `${PUB.domain}/info/commonModify`,
        data: {
          _id: this.docComplete._id, _systemId: "$all", 
          _data: { relJsCode: dataSon }
        }
      });

    },
  },
  created() {






  }
};
</script>

<style scoped>
</style>
