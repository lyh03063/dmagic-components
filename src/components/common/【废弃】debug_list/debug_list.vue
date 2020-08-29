<template>
  <table  class="n-table n-table-debug MT5 MB5" v-if="debug&&isShowTable">
    <tr>
      <td class="WP15 TAR FWB tb_th">{{$parent.$options.name||"数据"}} </td>
      <td class="FWB  tb_th" > <span class="Cur1" @click="isShowItem=!isShowItem">字段值 <i  :class="classArrow" ></i></span>
      <i  class="el-icon-close F2 Cur1 " @click="isShowTable=false" style="padding:3px"></i>
      </td>
    </tr>
    <tbody v-show="isShowItem">
<!--插槽-->
    <slot class v-if="isReady" ></slot>
    </tbody>

    
  </table>
</template>

<script>
export default {

  data: function() {
    return {
      isReady: false,
      isShowItem:true,
      isShowTable:true,
    };
  },

  computed: {
    debug() {
      return this.$store.state.debug;
    },
    classArrow(){
      return this.isShowItem?"el-icon-arrow-right":"el-icon-arrow-down"
    }
  },

  methods: {},
  created() {
    this.isReady = true; //准备好了

    document.onkeydown = e => {
    
      //绑定ctrl+alt+D事件
      var keyCode = e.keyCode || e.which || e.charCode;
      var ctrlKey = e.ctrlKey || e.metaKey;
      var altKey = e.altKey;
      if (altKey && ctrlKey && keyCode == 68) {
 
        let debug = this.$store.state.debug;
   
        this.$store.commit("setDebug", !debug);
        e.preventDefault(); //阻止默认事件
        return false;
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.valueShow {
  overflow-y: auto;
  max-height: 50px;
}

table.n-table.n-table-debug td,
table.n-table.n-table-debug th {
  padding: 2px;
  font-size: 13px;
}
.tb_th{
  background-color: #f0f0f0;
}
</style>
