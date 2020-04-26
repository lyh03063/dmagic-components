<template>
  <div class="boxMain BC_fff" v-bind="cf.boxMain">
    <dm_debug_list>
      <dm_debug_item v-model="cf" />
    </dm_debug_list>
    <dm_title_bar :cf="cf.cfTitleBar" v-if="cf.cfTitleBar" :title="title||cf.title" :urlMore="urlMore"></dm_title_bar>
    <div class="content_box" v-if="cf.boxContent" v-bind="cf.boxContent">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "pannel_new",
  props: {
    skin: {},
    title: {},
    urlMore: {},
    cf: {
      default: function () {
        return {
          topBox: {
          }
        };
      }
    }
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    //函数：{初始化组件配置函数}
    initCf() {
      let boxMain = this.cf.boxMain || {}
      let cfTitleBar = this.cf.cfTitleBar || {}
      let boxContent = this.cf.boxContent || {}
      let { skin = "default", title } = this.cf//皮肤类型
      skin = this.skin || skin;//优先使用skin属性
      let arrSkinCom = skin.split("__")
      let [skinCore, skinIndex] = arrSkinCom
      util.setObjDefault(boxMain, {//调用：{给一个对象设置默认属性函数}
        class: `skin_${skinCore} ${skinIndex || ""}`
      });
      console.log(`skinCore:`, skinCore);
      console.log(`skinIndex:`, skinIndex);

      if (skinCore == "pannel_A") {//如果是A皮肤
        util.setObjDefault(boxMain, {
          class: "BC_fff",
          style: {
            "border": "1px #ddd solid",
            "border-radius": "5px",
            "padding": "20px 28px",
          }
        });

        let cfTitleBarDefault = {
          skin: "title_bar_A", title: "通过cf.title设置的标题111111",
        }
        if (skinIndex == "version2") {//如果是第2版皮肤
          cfTitleBarDefault.skin = "title_bar_A__version2";
        }
        util.setObjDefault(cfTitleBar, cfTitleBarDefault);



        util.setObjDefault(boxContent, {
          class: " MT10 FS16",
        });

      }


      Object.assign(this.cf, { boxMain, cfTitleBar, boxContent });//合并对象

     
    }
  },
  created() {
    this.initCf()//调用：{初始化组件配置函数}
  }
};
</script>

<style scoped>
</style>
