<template>
  <table class="n-table n-table-debug MT5 MB5" v-if="debug">
    <tr>
      <td class="WP15 FWB">{{$parent.$options.name||"数据"}}</td>
      <td class="WP15 FWB">说明</td>
      <td class="FWB">字段值</td>
    </tr>
    <!--插槽-->
    <slot class v-if="isReady"></slot>
  </table>
</template>

<script>
export default {
  data: function() {
    return {
      isReady: false
    };
  },

  computed: {
    debug() {
      return this.$store.state.debug;
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
          console.log("切换调试组件显示！！！！！！！！！！！！");
 
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
  padding: 5px;
}
</style>
