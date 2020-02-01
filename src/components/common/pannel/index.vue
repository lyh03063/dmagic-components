<template>
  <div class="pannel-box" :class="type">
    <div class="title-bar" :style="style_title_bar">
      <div class="title-text">
        <template class v-if="title">{{title}}</template>
        <slot name="title" v-else></slot>
      </div>

      <div class="more-box" v-if="link_more">
        <a :href="link_more">更多&gt;&gt;</a>
      </div>
      <slot name="more" v-else></slot>
    </div>
    <div class="content-box clearfix">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {},
    type: {
      default: "border_card"
    },
    caseList: {},
    link_more: {},
    style_title_bar: {
      default: function() {
        return {};
      }
    }
  },
  components: {},
  data() {
    return {};
  },
  methods: {},
  created() {
   
  }
};
</script>

<style scoped>
a {
  text-decoration: none;

  color: #666;
}
.pannel-box.border_card {
  border: 1px #ebeef5 solid;
  border-radius: 5px;
}

.pannel-box.border_card .title-bar {
  padding: 0 10px;
  border-bottom: 1px solid #ebeef5;
}
.pannel-box.border_card .content-box {
  padding: 5px 10px;
}

.title-bar {
  display: flex;
  height: 40px;
  line-height: 40px;
  border-bottom: 2px solid #ccc;
  font-size: 16px;
}
.title-text {
  flex: 1;
  line-height: 40px;
}
.more-box {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}

@media screen and (max-width: 640px) {
  .title-bar {
    padding: 0 10px;
  }
  .content-box {
    padding: 0 10px;
  }
}
</style>
