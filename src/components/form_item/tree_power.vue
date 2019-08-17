
<template>
  <div class>
    <dm_debug_list level-up="0">
      <dm_debug_item v-model="arrNeedCheck" text="初始选中的节点"/>
      <dm_debug_item v-model="data" text="选项数据"/>
      <dm_debug_item v-model="valueNeed" text="已有权限valueNeed"/>
    </dm_debug_list>
    <div class="buttons">
      <el-button @click="getCheckedNodes">保存权限</el-button>

      <el-button @click="resetChecked">清空</el-button>
    </div>
    <el-tree
      @check-change="change(true)"
      :data="data"
      show-checkbox
      node-key="pageId"
      ref="tree"
      highlight-current
      :props="defaultProps"
    ></el-tree>
  </div>
</template>

<script>



let arrData = [{
  "pageId": "group_1",
  "text": "后台首页",
  "arrSon": [{
    "pageId": "home",
    "text": "后台首页",
    "type": "normalPage",
  }],
}, {
  "pageId": "group_2",
  "text": "基础数据",
  "type": "listPage",
  "arrSon": [{
    "pageId": "P1769",
    "type": "listPage",
    "text": "项目合同",

  }, {
    "pageId": "P1768",
    "type": "listPage",
    "text": "业务员",
  }, {
    "pageId": "P1767",
    "type": "listPage",
    "text": "甲方",
  }],
}, {
  "pageId": "group_3",
  "text": "财务管理",
  "arrSon": [{
    "pageId": "P1771",
    "type": "listPage",
    "text": "开票",
  }, {
    "pageId": "P1772",
    "type": "listPage",
    "text": "回款记录",
  }, {
    "pageId": "P1773",
    "type": "listPage",
    "text": "付款通知",
  }]
}, {
  "pageId": "group_4",
  "text": "运营台账",
  "arrSon": [{
    "pageId": "performanceStatistics",
    "text": "年度回款/管理费",
    "type": "normalPage",
  }, {
    "pageId": "bussinessOperationMonthly",
    "text": "业务经营情况",
    "type": "normalPage",
  }]
}, {
  "pageId": "group_5",
  "text": "系统管理",
  "arrSon": [{
    "pageId": "P1810",
    "type": "listPage",
    "text": "管理员",
  }, {
    "pageId": "P1787",
    "type": "listPage",
    "text": "角色",
  }]
}]
arrData.forEach(groupEach => {//循环：{栏目分组数组}
let pageIdGroup=groupEach.pageId;
  groupEach.arrSon.forEach(menuEach => {//循环：{栏目菜单数组}
    if (menuEach.type == "listPage") {//如果{000}000
       menuEach.arrSon = [{
        "pageId": `${menuEach.pageId}_add`,
        "text": "新增",
        "type": "operation",
        "operation": "add",
        "group": pageIdGroup,
      }, {
        "pageId": `${menuEach.pageId}_search`,
        "text": "查询",
        "type": "operation",
        "operation": "search",
        "group": pageIdGroup,
      }, {
        "pageId": `${menuEach.pageId}_modify`,
        "text": "修改",
        "type": "operation",
        "operation": "modify",
        "group": pageIdGroup,
      }, {
        "pageId": `${menuEach.pageId}_delete`,
        "text": "删除",
        "type": "operation",
        "operation": "delete",
        "group": pageIdGroup,
      }]

    }


  })


})





export default {
  mixins: [MIX.form_item],//混入
  methods: {
    change(byUserClick) {
      if (!byUserClick) return;//如果非用户点击
      this.getCheckedNodes();//调用：{获取选中的节点并同步数据函数}
    },
   getCheckedNodes() {//函数：{获取选中的节点并同步数据函数}
      let power = {};
      let arrCheckedItem = this.$refs.tree.getCheckedNodes();
      arrCheckedItem.forEach(itemEach => {//循环：{000数组}
        if (itemEach.type == "operation") {//Q1：类型为操作项
          let { operation, pageId ,group} = itemEach
          pageId = pageId.split("_")[0];//变量：{父级页面id}
          let path = `listPower.${pageId}.${operation}`//赋值路径
          lodash.set(power, path, true)
          lodash.set(power, `groupPower.${group}`, true)

        } else if (itemEach.type == "normalPage") {//Q2：类型为普通页面（非列表）
          let { pageId,group } = itemEach
          let path = `normalPagePower.${pageId}`//赋值路径
          lodash.set(power, path, true)
          lodash.set(power, `groupPower.${group}`, true)
        } 

      })
      this.valueNeed = power//深拷贝赋值
      this.arrCheckedItem=arrCheckedItem;
    },
    setCheckedNodes() {//函数：{自动选中选项函数}
      let arrNeedCheck = []
      if (this.valueNeed.listPower) {//如果{列表页面权限}存在
        for (let pageId in this.valueNeed.listPower) {//循环listPower
          let pagePower = this.valueNeed.listPower[pageId];
          for (let key in pagePower) {//循环页面权限属性
            arrNeedCheck.push({ pageId: `${pageId}_${key}` })
          }
        }
      }
      if (this.valueNeed.normalPagePower) {//如果{普通页面权限}存在
        for (let page in this.valueNeed.normalPagePower) {//循环normalPagePower
          arrNeedCheck.push({ pageId: `${page}` })
        }
      }
      this.arrNeedCheck = arrNeedCheck;
      this.$refs.tree.setCheckedNodes(this.arrNeedCheck);//设置选择项

    },

    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    }
  },

  data() {
    return {
      arrNeedCheck: [],//初始选中的节点数组
      data: arrData,
      defaultProps: {
        children: 'arrSon',
        label: 'text'
      }
    };
  },
  created() {


  }, mounted() {
    if (!this.value) {//如果{value}不存在
      this.valueNeed = {}
    } else {
      this.setCheckedNodes();//调用：{自动选中选项函数}
    }
  }
};
</script>


<style scoped>
</style>
