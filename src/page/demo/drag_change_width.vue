<template>
  <div class>
    <dm_pannel_new class="MB20" title="默认，不做任何配置">
      <dm_space height="10"></dm_space>
      <dm_drag_box_width class>
        <template #left>left</template>
        <template #right>right</template>
      </dm_drag_box_width>
    </dm_pannel_new>

    <dm_space height="10"></dm_space>
    <dm_pannel_new class="MB20" title="自定义初始宽度，取消背景色class">
      <dm_space height="10"></dm_space>
      <dm_drag_box_width class :cf="cf1">
        <template #left>left</template>
        <template #right>right</template>
      </dm_drag_box_width>
    </dm_pannel_new>

    <dm_pannel_new class="MB20" title="配置自定义style背景图">
      <dm_space height="10"></dm_space>
      <dm_drag_box_width class :cf="cfDragBox">
        <template #left>left</template>
        <template #right>right</template>
      </dm_drag_box_width>
    </dm_pannel_new>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      cf1: {
        nWidthLeft: 300,
        cfBoxLeft: { class: " ", },

      },
      cfDragBox: {
        nWidthLeft: 300,
        cfBoxLeft: { class: " ", style: { 'background-image': "url('http://tool.alixixi.com/csseditor/images/grid.gif')" } },

      },

    };
  },

  mounted() {

  },

}
</script>
 
<style lang="scss" scoped>
</style>