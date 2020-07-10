<template>
  <div class>
    <dm_debug_list>
      <dm_debug_item v-model="cf" />
    </dm_debug_list>

    <div class="boxMain layout" v-bind="cf.boxMain">
      <div class="boxLeft layout" v-bind="cf.boxLeft">
        {{cf.boxLeft.text}}
        <slot name="boxLeft" :cf="cf" :vm_title_bar="vm_title_bar"></slot>
      </div>
      <div is="div" class="boxMiddle layout" v-bind="cf.boxMiddle">
        <div class @click="fnClickTitle">{{cf.boxMiddle.text}}</div>
        <slot name="boxMiddle" :cf="cf"></slot>
      </div>
      <div class="boxRight layout" v-bind="cf.boxRight">
        {{cf.boxRight.text}}
        <a
          class="linkMore n-a"
          v-bind="cf.linkMore"
          v-if="cf.linkMore"
        >{{cf.linkMore.text}}</a>
        <slot name="boxRight" :cf="cf"></slot>
        <component
          v-bind="cf.boxRight.cfCom"
          :is="cf.boxRight.component"
          v-if="cf.boxRight.component"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "title_bar",
  props: {
    skin: {},
    title: {},
    urlMore: {},
    cf: {
      default: function () {
        return {};
      }
    }
  },
  components: {},
  data() {
    return {
      vm_title_bar: null,

    };
  },
  watch: {
    title: {
      handler(newVal, oldVal) {
        if(!this.cf.boxMiddle)return
        this.cf.boxMiddle.text = this.title//更新标题
      },
      immediate: true,
    }
  },
  methods: {
    //函数：{标题点击函数}
    fnClickTitle: async function () {
      this.$emit("click_title");

    },
    //函数：{初始化组件配置函数}
    initCf() {
      let boxMain = this.cf.boxMain || {}
      let boxLeft = this.cf.boxLeft || {}
      let boxMiddle = this.cf.boxMiddle || {}
      let boxRight = this.cf.boxRight || {}
      let linkMore = this.cf.linkMore || {}
      let { skin = "default", title } = this.cf//皮肤类型
      skin = this.skin || skin;//优先使用skin属性

      let arrSkinCom = skin.split("__")
      let [skinCore, skinIndex] = arrSkinCom
      util.setObjDefault(boxMain, {//调用：{给一个对象设置默认属性函数}
        class: `skin_${skinCore} ${skinIndex || ""}`
      });
      {
        let classAdd = "";
        if (skinCore == "title_bar_A") {//如果{000}title_bar_A
          classAdd = "el-icon-s-grid";
          if (skinIndex == "version2") {//如果version2版本
            classAdd = "el-icon-s-grid";
            util.setObjDefault(linkMore, {
              class: "el-icon-more-outline",
              text: "更多",
              href: this.urlMore,
              target: "_blank",
              style: { "font-size": "14px", "line-height": "36px" }
            });
          }
        }
        util.setObjDefault(boxLeft, {//调用：{给一个对象设置默认属性函数}
          class: classAdd
        });
      }
      {
        util.setObjDefault(boxMiddle, {//调用：{给一个对象设置默认属性函数}
          text: title
        });

      }
      util.setObjDefault(boxRight, {//调用：{给一个对象设置默认属性函数}

      });
      Object.assign(this.cf, { boxMain, boxLeft, boxMiddle, boxRight, linkMore });//合并对象
      if (this.title) {//如果title属性存在，优先级最高
        this.cf.boxMiddle.text = this.title
      }
    }
  },
  created() {
    this.initCf()//调用：{初始化组件配置函数}
    this.vm_title_bar = this;






  }
};
</script>

<style scoped>
/* .layout {
  border: 1px #f60 dashed;
} */
.boxMain {
  display: flex;
}
.boxLeft {
}
.boxMiddle {
  flex: 1;
  font-weight: 400;
  display: flex;
}
.boxRight {
  width: 100px;
  text-align: right;
}

/****************************skin-default-START****************************/
.skin_default.boxMain {
  height: 40px;
  border-bottom: 2px solid #ccc;
}
.skin_default .boxMiddle {
  height: 40px;
  line-height: 40px;
  font-size: 18px;
}
/****************************skin-default-END****************************/

/****************************skin-default-START****************************/
.skin_title_bar_A.boxMain {
  height: 40px;
}
.skin_title_bar_A .boxMiddle {
  font-size: 26px;
  font-weight: 700;
  line-height: 36px;
}

.skin_title_bar_A .boxLeft {
  color: #0091e0;
  font-size: 18px;
  margin: 10px 8px;
  line-height: 18px;
}

/****************************skin-default-END****************************/
</style>
