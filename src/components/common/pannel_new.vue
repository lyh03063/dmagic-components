<template>
  <div class="boxMain BC_fff" v-bind="cf.boxMain">
    <dm_debug_list>
      <dm_debug_item v-model="cf" />
    </dm_debug_list>
    <dm_title_bar
      :cf="cf.cfTitleBar"
      v-if="cf.cfTitleBar"
      :title="title||cf.title"
      :urlMore="urlMore"
      @click_title="toggle"
    >
      <!--传递boxMiddle插槽-->
      <template #boxMiddle>
        <!--接收titleBar_boxMiddle插槽-->
        <slot name="titleBar_boxMiddle"></slot>
      </template>
      <!--传递boxRight插槽-->
      <template #boxRight>
        <!--接收titleBar_boxRight插槽-->
        <slot name="titleBar_boxRight"></slot>
      </template>
      <!--传递boxLeft插槽-->
      <template #boxLeft={vm_title_bar}>
        <!--接收titleBar_boxLeft插槽-->
        <slot name="titleBar_boxLeft" :vm_title_bar="vm_title_bar" :vm_pannel="vm_pannel" ></slot>
      </template>
    </dm_title_bar>
    <div class="content_box" v-if="cf.boxContent&&showContent" v-bind="cf.boxContent">
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
    return {
      vm_pannel:null,
      showContent:true,
    };
  },
  methods: {
    //函数：{切换内容显示函数}
    toggle: async function () {
      if(!this.cf.toggleByClickTitle)return;//如果未开启“点击标题栏折叠效果”
      this.showContent=!this.showContent

    },
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
    this.vm_pannel=this;//***** */
  }
};
</script>

<style scoped>
</style>
