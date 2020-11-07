<template>
  <div>
    <dm_pannel_new class="MB20" title="候选值组件-最简">
      <div class="PT20">
        {{ value }}
        <dm_option_input
          class="ML5"
          v-model="value"
          :options="[
            { label: '张三', value: 17 },
            { label: '李四', value: 27 },
          ]"
        ></dm_option_input>
      </div>
    </dm_pannel_new>
    <dm_pannel_new class="MB20" title="候选值组件-配置按钮文字">
      <div class="PT20">
        {{ value }}
        <dm_option_input
          class="ML5"
          v-model="value"
          :options="[
            { label: '张三', value: 17 },
            { label: '李四', value: 27 },
          ]"
          btnText="btnText"
          :cf="{ btnText: '按钮文字' }"
        ></dm_option_input>
      </div>
    </dm_pannel_new>
    <dm_pannel_new class="MB20" title="候选值组件-配置弹窗宽度和选项宽度,和弹窗方向">
      <div class="PT20">
        {{ value }}
        <dm_option_input
          class="ML5"
          v-model="value"
          :options="[
            { label: '张三', value: 17 },
            { label: '李四', value: 27 },
          ]"
          :cf="cfOptionInput"
        ></dm_option_input>
      </div>
    </dm_pannel_new>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      value: 111,
      options: [{ label: "张三", value: 17, }, { label: "李四", value: 27, }, { label: "王五", value: 13, }],
      cfOptionInput: {
        cfPopover: { width: 500,placement:"bottom" },
        cfListFlex: { widthG: "49%", spaceY: "5px", }
      },

    };
  },
  methods: {},
  created() { },
  async mounted() { }
};
</script>

<style scoped>
</style>
