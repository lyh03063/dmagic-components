<template>
  <div>
    <dm_title_bar class="MB20" title="极简"></dm_title_bar>

    <dm_title_bar class="MB20" title="极简+skin属性+urlMore属性" skin="title_bar_A__version2" urlMore="#AAAA"></dm_title_bar>
    <dm_title_bar class="MB20" :cf="cfTitleBar1"></dm_title_bar>

    <dm_title_bar class="MB20" :cf="cfTitleBar2"></dm_title_bar>

    <dm_title_bar class="MB20" :cf="cfTitleBar3"></dm_title_bar>

    <dm_title_bar class="MB20" :cf="cfTitleBar4" title="grid_bule_icon_big皮肤+来自title属性的标题"></dm_title_bar>

    <dm_title_bar class="MB20" :cf="cfTitleBar5" title="grid_bule_icon_big皮肤+重写icon"></dm_title_bar>

    <dm_title_bar class="MB20" :cf="cfTitleBar5" title="grid_bule_icon_big皮肤+重写icon"></dm_title_bar>

    <dm_title_bar class="MB20" :cf="cfTitleBar5" title="grid_bule_icon_big皮肤+重写icon+插槽配置">
      <template v-slot:boxRight="{cf}">配置插槽内容{{cf.skin}}</template>
    </dm_title_bar>

    <dm_title_bar class="MB20" :cf="cfTitleBar6" title="component配置"></dm_title_bar>

    <dm_title_bar class="MB20" :cf="cfTitleBar7" title="带更多连接-title_bar_A"></dm_title_bar>
    <dm_title_bar class="MB20" :cf="cfTitleBar9" title="带更多连接-title_bar_A__version2"></dm_title_bar>
    <dm_title_bar class="MB20" :cf="cfTitleBar8" title="仿折叠面板"></dm_title_bar>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      cfTitleBar2: {
        skin: "default",
        boxMiddle: {
          text: "新闻中心",
          class: "C_f30 ",
        },

      },
      cfTitleBar3: {
        skin: "title_bar_A",
        title: "通过cf.title设置的标题",


      },
      cfTitleBar4: {
        skin: "title_bar_A",

      },

      cfTitleBar5: {
        skin: "title_bar_A",
        boxLeft: {
          class: "el-icon-user ",
          style: {
            color: "#f00"

          }
        }

      },
      cfTitleBar6: {
        skin: "title_bar_A",
        boxRight: {
          component: "dm_title_bar",
          cfCom: {
            title: "xxx"
          }

        }

      },
      cfTitleBar7: {
        skin: "title_bar_A",
        boxRight: {

        },
        linkMore: {
          class: "el-icon-more-outline",
          text: "更多",
          href: "#a",
          target: "_blank",
          style: {
            "margin-right": "14px",
            "font-size": "14px",
            "line-height": "36px"
          }
        }


      },
      cfTitleBar9: {
        skin: "title_bar_A__version2",




      },
      cfTitleBar8: {
        skin: "title_bar_A",
        boxRight: {

        },
        linkMore: {
          class: "el-icon-arrow-right",
          href: "#a",
          target: "_blank",
          style: {
            "margin-right": "14px",
            "font-size": "14px",
            "line-height": "36px"
          }
        }


      },
      cfTitleBar1: {
        boxMain: {
          class: "C_f00",
          style: {
            "font-size": "18px",
            "line-height": "50px"
          }
        },
        boxLeft: {
          text: "",
          class: "C_999 el-icon-star-on",
          style: {
            "font-size": "28px",
            "line-height": "50px",

          }
        },
        boxMiddle: {
          text: "通过最原始的方式配置的标题栏",
          class: "C_3a0 ",
          style: {
            "font-size": "18px",
            "line-height": "50px",

          }
        },
        boxRight: {
          text: "右侧文本",
          show: false,
          class: "C_000",
          style: {
            "font-size": "12px",
            "line-height": "50px",
            "width": "212px",
          }
        }
      }

    };
  },
  methods: {},
  created() { },
  async mounted() { }
};
</script>

<style>
</style>
