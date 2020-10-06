<template>
  <div>
    <dm_pannel_new class="MB20" title="collection_demo">
      <div class="PT10">
        <dm_collection
          v-model="list"
          :show-toolbar="true"
          :cf-form="cfForm"
          data-slot="dataSlot1"
          :cfElBtnAdd="cfElBtnAdd"
        >
          <!--插槽内容-->
          <template v-slot:dataSlot1="{ doc }">
            <div class="PL8">{{ doc.label }} : {{ doc.value }}</div>
          </template>
        </dm_collection>
      </div>
    </dm_pannel_new>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      cfForm: {
        col_span: 12,
        formItems: [
          {
            label: "属性名",
            prop: "label",
            type: "input",
            frequency: {
              sytle: { width: '48px' },
              options: [{ value: "id" },{ value: "class" }, { value: "style" },{ value: "title" },]
            }

          },
          {
            label: "属性值",
            prop: "value",
            type: "input"
          },

        ]
      },
      cfElBtnAdd: {
        text: "+添加属性",
        size: "mini",
        plain: false
      },
      list: [
        { label: "属性值", value: "123" }, { label: "属性值", value: "123" },
      ]
    };
  },
  methods: {},
  created() { },
  async mounted() { }
};
</script>

<style scoped>
</style>
