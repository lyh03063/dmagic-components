<template>
  <div>
    <dm_pannel class="MB20" title="标题">最简单的面板</dm_pannel>

    <dm_pannel class="MB20" title="type：风格类型" type="plain">
      type="border_card"【默认】: 带圆角边框的面板
      <br />type="plain":朴素面板
    </dm_pannel>

    <dm_pannel class="MB20" title="面板2【带更多链接】" link_more="/productList">设置link_more属性来设置更多链接</dm_pannel>

    <dm_pannel>
      <template v-slot:title>
        <b class="C_f30">具名插槽</b>
      </template>
      <template v-slot:default>设置具名插槽default，title，more</template>
      <template v-slot:more>自定义更多链接</template>
    </dm_pannel>

    <dm_pannel
      title="style_title_bar属性"
      :style_title_bar="{color:'red','border-bottom':'1px dashed red'}"
      type="plain"
    >设置style_title_bar属性来修改标题栏样式</dm_pannel>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {},
  created() {},
  async mounted() {}
};
</script>

<style>
</style>
