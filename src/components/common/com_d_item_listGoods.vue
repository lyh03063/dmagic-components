<template>
  <div class>
    <ul class="n-flex-ul MB10 BC_fff PL10 PR10">
      
      <li v-for="(item) in doc.listGoods" :key="item._id+item.idSpecChain">
        <b class="W110">
          <el-link type="primary" href="javascript:;">
            <img class="W100" :src="item.imgSrc" alt />
          </el-link>
        </b>
        <i>
          <p class="MB6">{{ item.title }}</p>
          <p class="MB6" v-if="item.nameSpecChain">规格：{{ item.nameSpecChain }}</p>
           <p class="MB6">购买数量：{{item.count}}</p>
        </i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "com_listGoods",
  //用于列表模糊查询的组件
  props: ["doc"],
  data() {
    return {};
  },
  computed: {
    goodsText() {
      let arrArea = lodash.get(this.doc, `addressObj.arrArea`);
      let detail = lodash.get(this.doc, `addressObj.detail`);
      if (!arrArea) return ""
      let provinceName = lodash.get(arrArea, `[0].label`);
      let cityName = lodash.get(arrArea, `[1].label`);
      let countryName = lodash.get(arrArea, `[2].label`);
      return `${provinceName}/${cityName}/${countryName} ${detail}`

    }
  },

  methods: {

    fnClick() {
    }
  },
  created() { }
};
</script>
