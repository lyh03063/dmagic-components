<template>
  <div>
    <dm_debug_list>
      <dm_debug_item v-model="dataTree" />
    </dm_debug_list>

    <dm_tree_data class="W500" v-model="dataTree" :cf="cfItem"></dm_tree_data>
  </div>
</template>

<script>


let T;
export default {
  components: {},
  data() {

    return {
      cfItem: {
        idKey: "index",
        //两层配置
        cfTree: {
          props: {
            children: 'menuItem',
            label: 'title'
          }
        },
        cfForm: {
          formItems: [
            F_ITEMS["title"],//
            F_ITEMS["menuIndex"],
            F_ITEMS["menuIcon"],//
            F_ITEMS["menuRoute"],//
          ],
         
        }
      },
      dataTree: [
        {
          //菜单
          index: "listHome",
          route: "listHome",
          icon: "el-icon-house",
          title: "首页"
        },

        {
          index: "MallSystem",
          icon: "el-icon-document",
          title: "商城管理",
          menuItem: [
            {
              index: "list_goods",
              route: "list_common?type=goods",
              title: "商品/服务"
            },
            {
              index: "list_order",
              route: "list_common?type=order",
              title: "订单"
            },
            {
              index: "list_user",
              route: "list_common?type=user",
              title: "用户"
            }

          ]
        },
        {
          index: "otherData",
          icon: "el-icon-document",
          title: "其他数据",
          menuItem: [
            {
              index: "list_project_case",
              route: "list_common?type=project_case",
              title: "家用工程案例"
            },
            {
              index: "list_group",
              route: "list_common?type=group",
              title: "分组"
            },
            {
              index: "list_url",
              route: "list_common?type=url",
              title: "网址"
            },
            {
              index: "list_file",
              route: "list_common?type=file",
              title: "文件"
            },
            {
              index: "list_image",
              route: "list_common?type=image",
              title: "图片库"
            },

          ]
        },
        {
          index: "crm",
          icon: "el-icon-document",
          title: "客户管理",
          menuItem: [
            {
              index: "list_person",
              route: "list_common?type=person",
              title: "人员"
            },
            {
              index: "list_company",
              route: "list_common?type=company",
              title: "企业"
            },
          ]
        },

        {
          index: "systemManage",
          icon: "el-icon-setting",
          title: "系统管理",
          menuItem: [


            {
              index: "list_admin",
              route: "list_common?type=admin",
              title: "管理员"
            },
            {              index: "list_role",
              route: "list_common?type=role",
              title: "角色"            }
          ]
        }
      ]
    };
  },
  methods: {

  },
  beforeCreate() {
    T = this;
  },
  created() { },
  async mounted() { }
};
</script>

<style>
</style>
