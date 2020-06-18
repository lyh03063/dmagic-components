<template>
  <div>
    <component :is="com"></component>
  </div>
</template>
<script>





let objComponent = {} //变量：{动态加载组件的对象}


PUB.menuDemo.forEach(itemEach => {//循环：{000数组}
  if (!itemEach.menuItem) return
  itemEach.menuItem.forEach(doc => {//循环：{组件名数组}
    objComponent[doc.name] = () => import(`./demo/${doc.name}.vue`)
  })
})




import goods_specs from "./demo/goods_specs.vue";
import goods_specs_front from "./demo/goods_specs_front.vue";



import list_simple_demo from "./demo/list_simple_demo.vue";

export default {
  components: {

    ...objComponent,
    goods_specs, goods_specs_front,

  },

  data() {
    return {
      com: "pannel"
    };
  },
  watch: {
    //监听路由参数
    $route: {
      handler() {
        this.com = this.$route.query.com;
      },
      deep: true
    }
  },
  methods: {},
  created() {
    this.com = this.$route.query.com;
  },
  async mounted() { }
};
</script>

<style>
</style>
