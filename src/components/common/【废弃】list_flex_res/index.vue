<template>
  <div class>
    <ul class="clearfix n-flex-main" :class="arrClass" v-if="list&&list.length">
      <li v-for="(item, index) in list" :key="index" class="n-flex-group" :style="style_g">
        <slot name="default" :item="item" :index="index"></slot>
      </li>
      <!--循环5个空盒子-配合flex列表-->
      <li class="n-flex-group" v-for="item in 10" :key="'item'+item"></li>
    </ul>
    <slot class v-else name="noData">
      <div class="LH50 C_999 TAC">{{tipsNoData}}</div>
    </slot>
  </div>
</template>

<script>
export default {
  name: "list_flex_res",
  props: {
    spaceY: {
      default: "10px"
    },
    //每组宽度
    widthG: {
      default: null
    },
    tipsNoData: {
      default: "暂无数据"
    },
    col: {
      default: 4
    },
    style_g: {
      default: function () {
        return {}
      }
    },

    list: {}
  },
  components: {},
  data() {
    return {
      arrClass: []
    };
  },
  methods: {},
  created() {
    let classCol = `n-col-${this.col}`;
    this.arrClass.push(classCol);

    //优先使用style_g
    this.style_g["margin-bottom"] = this.style_g["margin-bottom"] || this.spaceY

    if (this.widthG) {//如果有强制宽度，这个时候col就失效
      this.style_g["width"] = this.widthG
    }





  }
};
</script>

<style scoped>
/****************************flex列表+响应式-START****************************/

.n-flex-main {
  display: flex;
  /*开启换行*/
  flex-wrap: wrap;
  justify-content: space-between;
  /* border: 1px solid #f00; */
}

/* 在3栏以上布局时，会出现中间空缺商品的情况，需要通过补充这种空元素来解决 */
.n-flex-main .n-flex-group:empty {
  height: 0;
  margin: 0;
}

.n-col-1 .n-flex-group {
  width: 100%;
}

.n-col-2 .n-flex-group {
  width: 48%;
}
.n-col-3 .n-flex-group {
  width: 32%;
}
.n-col-4 .n-flex-group {
  width: 23%;
}
.n-col-5 .n-flex-group {
  width: 19%;
}

.n-col-6 .n-flex-group {
  width: 15%;
}
.n-col-7 .n-flex-group {
  width: 13%;
}
.n-col-8 .n-flex-group {
  width: 11.6%;
}

.n-col-9 .n-flex-group {
  width: 10.8%;
}
.n-col-10 .n-flex-group {
  width: 9.6%;
}

/*屏幕宽度小于640px*/
@media screen and (max-width: 640px) {
  /* .n-flex-main {
    padding: 10px;
  } */
  /* */
  .n-col-5 .n-flex-group {
    width: 32%;
  }
  .n-col-6 .n-flex-group,
  .n-col-7 .n-flex-group {
    width: 24%;
  }
  .n-col-8 .n-flex-group,
  .n-col-9 .n-flex-group,
  .n-col-10 .n-flex-group {
    width: 19%;
  }
}

/*屏幕宽度小于360px*/
@media screen and (max-width: 360px) {
  .n-col-2 .n-flex-group {
    width: 100%;
  }
  .n-col-3 .n-flex-group {
    width: 48%;
  }
  .n-col-4 .n-flex-group {
    width: 48%;
  }
  .n-col-4 .n-flex-group {
    width: 100%;
  }
  .n-col-5 .n-flex-group {
    width: 48%;
  }
  .n-col-6 .n-flex-group,
  .n-col-7 .n-flex-group {
    width: 32%;
  }
  .n-col-8 .n-flex-group,
  .n-col-9 .n-flex-group,
  .n-col-10 .n-flex-group {
    width: 24%;
  }
}
/****************************flex列表+响应式-END****************************/
</style>
