<template>
  <div>
    <div class="FS18 LH40">测试debug_list的实用性</div>

    <dm_debug_list>
      <dm_debug_item v-model="listIn" />
    </dm_debug_list>
    <div class="MB10 MT10">
      <el-button plain @click="listIn.length=0" size="mini">数组清空(不能响应)</el-button>
    </div>

    <ul>
      <li class="MB6" v-for="doc in listIn" v-bind:key="doc.id">
        {{ doc.id }} : {{ doc.name }}
        <el-button plain @click="deleteData(doc)" size="mini">删除</el-button>
        <el-button plain @click="modifyData(doc)" size="mini">修改</el-button>
      </li>
    </ul>
  </div>
</template>

<script>


export default {
  name: "test_debug_list",
  components: {},
  data() {
    return {
      listIn: [
        { id: 1, name: "张三", age: 17, sex: "男" },
        { id: 2, name: "李四", age: 27, sex: "男" },
        { id: 3, name: "王五", age: 13, sex: "男" },
     
        ]
    };
  },
  methods: {
    //函数：{删除数据函数}
    deleteData: async function (docDel) {
      this.listIn = this.listIn.filter(
        doc => doc.id != docDel.id
      );

    },
    //函数：{修改数据函数}
    modifyData: async function (doc) {
      doc.name += "1"

    },
    //函数：{新增数据函数}
    addData: async function (docDel) {
      this.listIn = this.listIn.filter(
        doc => doc.id != docDel.id
      );

    },
  },
  beforeCreate() {


  },
  created() { },
  async mounted() { }
};
</script>

<style>
</style>
