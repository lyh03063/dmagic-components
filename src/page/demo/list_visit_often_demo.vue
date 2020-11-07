<template>
  <div>
    <dm_pannel_new class="MB20" title="13691916429最近访问的js代码块">
      <dm_list_visit_often :cf="cf1" class="PT10"></dm_list_visit_often>
    </dm_pannel_new>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
     cf1: {
            dataTypeDict: "front_demo",
            findJsonAddon: {
                tagPage: "auto_layout",
                _userId: "13691916429"
            },
            cfListAddon: {
                comCard: "dm_card_front_demo_often", //卡片组件
                pageSize: 200,
            }
        },
      cf1111: {
        dataTypeDict: "js_code",
        findJsonAddon: { tagPage: "js_code_edit",_userId:"13691916429" },
        cfListAddon: {
          comCard: "dm_card_js_code_often",//卡片组件
          pageSize: 20,
        }

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
