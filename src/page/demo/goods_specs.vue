<template>
  <div>
    <!--本组件需要同步DM组件库！！！！-->
    <dm_debug_list>
      <dm_debug_item v-model="formDataNeed" text="formDataNeed" />
      <dm_debug_item v-model="formData" text="formData" />
    </dm_debug_list>

    <dm_collection
      v-model="formDataNeed.listSpecs"
      :show-toolbar="true"
      :cf-form="cfForm"
      data-slot="dataSlot1"
      :cfElBtnAdd="cfElBtnAdd"
    >
      <!--插槽内容-->
      <template v-slot:dataSlot1="{doc}">{{doc.name||"未命名"}} &nbsp;&nbsp; {{getSpecItem(doc)}}</template>
    </dm_collection>

    <el-button class="MB10" type="primary" @click="updateSpecPeice" size="mini">更新规格/价格表</el-button>
    <dm_list_data :cf="cfListSpecPrice" v-model="formData.listSpecPrice">
      <template v-slot:slot_column_price="{row}">
        <el-input-number
          @change="changeSpecPrice(row)"
          v-model="row.price"
          controls-position="right"
          size="mini"
        ></el-input-number>
      </template>
      <template v-slot:slot_column_stock="{row}">
        <el-input-number
          @change="changeSpecPrice(row)"
          v-model="row.stock"
          controls-position="right"
          size="mini"
        ></el-input-number>
      </template>
    </dm_list_data>
  </div>
</template>

<script>


let T;

export default {
  name: "goods_specs",
  // components: { collection },
  props: {
    formData: {}
  },
  data() {
    return {
      cfElBtnAdd: {
        text: "+添加一组规格",
        type: "primary",
        size: "mini",
        plain: false
      },
      //规格价格表的固定列
      columnsFixed: [
        {
          label: "价格",
          prop: "price",
          slot: "slot_column_price",
          width: 180
        },
        {
          label: "库存",
          prop: "stock",
          slot: "slot_column_stock"
        }
      ],
      cfListSpecPrice: {
        isShowBreadcrumb: false, //面包屑
        isShowSearchForm: false, //查询表单
        isShowToolBar: false, //批量操作栏
        isShowOperateColumn: false, //单项操作列
        isShowPageLink: false, //分页链接
        isShowCheckedBox: false, //选择框
        listIndex: "list_static_demo", //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        //操作列配置
        //-------列配置数组-------
        columns: []
      },
      formDataNeed: {},

      cfForm: {
        formItems: [
          {
            label: "规格名",
            prop: "name",
            type: "input"
          },

          F_ITEMS.objSpecTerm,
          F_ITEMS.specs_options
        ]
      }
    };
  },
  watch: {
    formDataNeed: {
      handler(newVal, oldVal) {
        if (!T.formData) return;
        console.log("规格组件值变动！！！");
        let { listSpecs, listSpecPrice } = T.formDataNeed;
        T.$set(T.formData, "listSpecs", listSpecs);
        T.$set(T.formData, "listSpecPrice", listSpecPrice);

        let priceSellSection = util.getGoodsPrice(T.formData); //调用：{获取商品价格(区间)的函数}

        T.$set(T.formData, "priceSellSection", priceSellSection);
        // Object.assign(T.formData, { listSpecs, listSpecPrice });//合并对象
      },
      deep: true
    }
  },

  methods: {
    //函数：{规格价格局部更新函数}
    changeSpecPrice(row) {
      let index = T.formDataNeed.listSpecPrice.findIndex(
        doc => doc.id == row.id
      );
      this.$set(T.formDataNeed.listSpecPrice, index, row);
    },
    //函数：{设置缓存规格/价格表数据字典的函数}
    setCacheSpecPrice() {
      if (!T.formDataNeed.listSpecPrice) return;
      T.formDataNeed.listSpecPrice.forEach(itemEach => {
        let { id, price, stock } = itemEach;
        if (!id) return;
        T.formDataNeed.dictSpecPrice[id] = { price, stock };
      });
    },
    //函数：{获取缓存规格/价格表数据字典的函数}
    getCacheSpecPrice() {
      T.formDataNeed.listSpecPrice.forEach(itemEach => {
        let { id } = itemEach;
        if (!id) return;
        let doc = lodash.get(T.formDataNeed.dictSpecPrice, `${id}`);
        if (!doc) return;
        Object.assign(itemEach, doc); //合并对象
      });
    },
    //函数：{更新规格/价格表的函数}
    updateSpecPeice() {
      let { listSpecs } = T.formDataNeed;
      if (!listSpecs) return;
      T.setCacheSpecPrice(); //调用：{设置缓存规格/价格表数据字典的函数}
      let arrParam = listSpecs.map(doc => doc.options);
      //【重要-难】调用：{返回多个数组的排列组合结果数组函数}
      let arrResult = util.combination(arrParam);

      //【重要】调用：{标记不符合条件的组合结果项的函数}
      arrResult = FN.handelCombResult({ listSpecs, arrResult });

      let listSpecPrice = arrResult.map(arr => {
        let obj = {};
        let arrId = [];
        //循环：{内部组合项数组}
        arr.forEach((item, i) => {
          arrId.push(item.__id);
          obj[`spec${i}`] = item.name;
        });
        obj.id = arrId.sort().join("__"); //先排序，确保拼接好的id的稳定性！！！
        return obj;
      });

      //【较重要】调用：{规格价格列表去重函数}
      T.formDataNeed.listSpecPrice = FN.uniqListSpecPrice(listSpecPrice);

      T.getCacheSpecPrice(); //调用：{获取缓存规格/价格表数据字典的函数}
      let arrColumns = listSpecs.map((doc, i) => {
        return {
          label: doc.name,
          prop: `spec${i}`,
          width: 120
        };
      });
      arrColumns.push(...T.columnsFixed);
      T.cfListSpecPrice.columns = arrColumns;
    },
    //函数：{获取选项名称数组的函数}
    getSpecItem(doc) {
      let { options = [] } = doc;
      return options.map(item => item.name);
    }
  },
  beforeCreate() {
    T = this;
  },
  created() {
    if (T.formData) {
      //如果{000}000
      let formData = lodash.cloneDeep(T.formData); //深拷贝
      let { listSpecs, listSpecPrice } = formData;
      T.formDataNeed = { listSpecs, listSpecPrice };
    }

    if (!T.formDataNeed.dictSpecPrice) {
      //如果数据字典不存在，补上一个
      this.$set(T.formDataNeed, "dictSpecPrice", {});
    }
  },
  async mounted() {
    if (T.formDataNeed) {
      T.updateSpecPeice(); //调用：{更新规格/价格表的函数}
    }
  }
};
</script>

<style>
</style>
