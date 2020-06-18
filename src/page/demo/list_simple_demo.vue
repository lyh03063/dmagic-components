<template>
  <div>
    <dm_pannel_new class="MB20" title="默认配置">

      <dm_list_simple class="MT10" :cf="cfListSimple" v-model="arrId"></dm_list_simple>
      <el-button plain @click="arrId.pop()" size="mini">尾部删除一个元素</el-button>

    </dm_pannel_new>

    <dm_pannel_new class="MB20" title="自定义分隔符">
      <dm_list_simple class="MT10" :cf="cfListSimple2" v-model="arrId"></dm_list_simple>
    </dm_pannel_new>

    <dm_pannel_new class="MB20" title="取消分隔符，并自定义分组样式">
      <dm_list_simple class="MT10" :cf="cfListSimple3" v-model="arrId"></dm_list_simple>
    </dm_pannel_new>

    <dm_pannel_new class="MB20" title="静态数据">
      <dm_list_simple class="MT10" :cf="cfListSimple4" v-model="arrData2"></dm_list_simple>
        <el-button plain @click="arrData2.pop()" size="mini">尾部删除一个元素</el-button>
    </dm_pannel_new>
  </div>
</template>

<script>

export default {
  components: {},
  props: ["aaa"],

  data() {
    return {
      arrId: ["13480926436", "13691916429","13719641747",],

      cfListSimple: {
        idKey: "userName",
        labelKey: "nickName",
        ajax: {
          url: `${PUB.domain}/info/getCommonList`,
          data: { _systemId: "$all", _dataType: "admin" }
        }
      },
      cfListSimple2: {
        idKey: "userName",
        labelKey: "nickName",
        splitSign: "|",
        ajax: {
          url: `${PUB.domain}/info/getCommonList`,
          data: { _systemId: "$all", _dataType: "admin" }
        }
      },
      cfListSimple3: {
        idKey: "userName",
        labelKey: "nickName",
        splitSign: "",
        styleG: {
          "border": "1px #ddd solid",
          "border-radius": "5px",
          "padding": "5px",
        },
        ajax: {
          url: `${PUB.domain}/info/getCommonList`,
          data: { _systemId: "$all", _dataType: "admin" }
        }
      },

      arrData2: [{ name: "张三", age: 17, sex: "男" }, { name: "李四", age: 27, sex: "男" }, { name: "王五", age: 13, sex: "男" }],
      cfListSimple4: {
        labelKey: "name",
      },
    };
  },
  methods: {

  },
  created() {





  },
  async mounted() { }
};
</script>

<style>
</style>
