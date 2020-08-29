<template>
  <div class="boxMain BC_fff" v-bind="cfIn.boxMain">
    <dm_debug_list>
      <dm_debug_item v-model="cfIn" />
    </dm_debug_list>
    <dm_title_bar
      :cf="cfIn.cfTitleBar"
      v-if="cfIn.cfTitleBar"
      :title="title||cfIn.title"
      :urlMore="urlMore"
      @click_title="clickTitle"
    >
      <!--传递boxMiddle插槽-->
      <template #boxMiddle="{vm_title_bar}">
      
        <!--接收title_bar_box_middle插槽-->
        <slot name="title_bar_box_middle" :vm_title_bar="vm_title_bar" :vm_pannel="vm_pannel"></slot>
      </template>
      <!--传递boxRight插槽-->
      <template #boxRight>
        <!--接收titleBar_boxRight插槽-->
        <slot name="titleBar_boxRight"></slot>
      </template>
      <!--传递boxLeft插槽-->
      <template #boxLeft="{vm_title_bar}">
        <!--接收titleBar_boxLeft插槽-->
        <slot name="titleBar_boxLeft" :vm_title_bar="vm_title_bar" :vm_pannel="vm_pannel"></slot>
      </template>
    </dm_title_bar>
    <div class="content_box PB1 PR8" v-show="cfIn.boxContent&&cfIn.showContent" v-bind="cfIn.boxContent">
      <!-- cfIn.showContent: {{cfIn.showContent}}
      <div class>cfIn:{{cfIn}}</div>-->

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
      vm_pannel: null,
      cfIn: null,
    };
  },
  methods: {
    //函数：{切换内容显示函数}
    clickTitle: async function () {
      if (!this.cfIn.toggleByClickTitle) return;//如果未开启“点击标题栏折叠效果”
      this.toggle()//调用：{000函数}

    },
    //函数：{切换内容显示函数}
    toggle: async function () {
      this.cfIn.showContent = !this.cfIn.showContent

    },
    //函数：{隐藏内容函数}
    hideContent: async function () {
      this.cfIn.showContent = false;

    },
    //函数：{显示内容函数}
    showContent: async function () {
      this.cfIn.showContent = true;

    },
    //函数：{初始化组件配置函数}
    initCf() {
     this.cfIn = lodash.cloneDeep(this.cf); //深拷贝
      // this.cfIn = this.cf
      let boxMain = this.cfIn.boxMain || {}
      let cfTitleBar = this.cfIn.cfTitleBar || {}
      let boxContent = this.cfIn.boxContent || {}
      let { skin = "default", title } = this.cfIn//皮肤类型
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

      //showContent:true,
      Object.assign(this.cfIn, { boxMain, cfTitleBar, boxContent });//合并对象
      if (this.cfIn.showContent !== false) {//如果{是否显示内容}不等于false
        this.$set(this.cfIn, "showContent", true);
      }




    }
  },
  created() {
    this.initCf()//调用：{初始化组件配置函数}
    this.vm_pannel = this;//***** */
  }
};
</script>

<style scoped>
</style>
