<template>
  <div>
    <dm_pannel_new class="MB20" :cf="cfPannel1">面板内容</dm_pannel_new>

    <dm_pannel_new class="MB20"  title="极简-直接使用title属性">直接使用title属性</dm_pannel_new>

     <dm_pannel_new class="MB20"  title="极简-直接使用title/skin属性-pannel_A" skin="pannel_A">直接使用title/skin属性</dm_pannel_new>

 <dm_pannel_new class="MB20"  title="极简-直接使用title/skin属性-pannel_A__version2" skin="pannel_A__version2" urlMore="#bbbb">直接使用title/skin属性</dm_pannel_new>

    <dm_pannel_new class="MB20" :cf="cfPannel2">面板内容</dm_pannel_new>

    <dm_pannel_new class="MB20" :cf="cfPannel3" title="pannel_A风格">pannel_A风格面板内容</dm_pannel_new>

    

    <dm_pannel_new class="MB20" :cf="cfPannel4" title="pannel_A风格微调-改变标题栏风格">pannel_A风格面板内容</dm_pannel_new>

    <dm_pannel_new class="MB20" :cf="cfPannel5" title="pannel_A风格微调-改变标题图标和颜色">pannel_A风格面板内容</dm_pannel_new>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      cfPannel1: {
        title:"xxxx",
        cfTitleBar: {
          skin: "default",
          boxMiddle: {
            text: "新闻中心",
            class: "C_f30 ",
          },

        },
        boxContent: {
          class: "C_f30 ",
        }
      },

      cfPannel2: {
        boxMain: {
          class: "BC_fff",
          style: {
            "border": "2px #ddd solid",
            "border-radius": "5px",
            "padding": "20px 28px",
            "aaaa": "1111",
          }
        },
        cfTitleBar: {
          skin: "title_bar_A",
          title: "通过cf.title设置的标题",
        },
        boxContent: {
          class: " MT10 FS16",
        }
      },

      cfPannel3: {
        skin: "pannel_A",
      },

      cfPannel4: {
        skin: "pannel_A",
        cfTitleBar: {
          skin: "default",
        },

      },
      cfPannel5: {
        skin: "pannel_A",
        cfTitleBar: {
          boxLeft: {
            text: "",
            class: "C_999 el-icon-star-on",
            style: {
              color: "#f00"
            }

          },
          skin: "title_bar_A",
        },

      },
      cfPannel6: {


      },
    };

  },
  methods: {},
  created() { },
  async mounted() { }
};
</script>

<style>
</style>
