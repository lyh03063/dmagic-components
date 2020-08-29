<template>
 <div class="loading-box" :style="{'height':height+'px','line-height':height+'px','color':color,'text-align':'center'}">
    加载中
    <i class="el-icon-loading FS16"></i>
  </div>
</template>

<script>
export default {
  components: {
    //注册组件
  },

  props: {
    text:{
      type:[String],
      default:"加载中",
    },
    height:{
      type:[String,Number],
      default:"100",
    },
    color:{
      type:[String,Number],
      default:"#999",
    }


  },
  data() {
    return {
      dataValue: 11
    };
  },

  methods: {},
  created() {
 
  }
};
</script>

