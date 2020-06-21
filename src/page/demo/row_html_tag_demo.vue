<template>
  <div class>
    <div class>arrHtml:{{arrHtml}}</div>



    <dm_row_html_tag class v-model="arrHtml" ></dm_row_html_tag>
  </div>
</template>

<script>


export default {
  name: "aplayer_demo2",
  components: {},
  data() {
    return {

    
      arrHtml: [
        {
          tag: "div",
          text: "演示盒子",
          cf: {
            id: "id_box1",
            style: {},
            class: "ele_1 MB8",
          },
          children: [
            {
              tag: "div",
              text: "盒子1-1",
              cf: {
                style: { "padding": "10px" },
                class: "ele_2",
              }
            },
          ]
        },
        {
          tag: "div",
          text: "盒子3",
          cf: {
            style: { "padding": "10px" },
            class: "ele_3",
          }
        },
      ]


    };
  },

  methods: {


  },

  async created() {


  },
  async mounted() {
  }
};
</script>

<style scoped>
</style>
