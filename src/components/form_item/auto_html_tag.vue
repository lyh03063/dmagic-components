<template>
  <div class="item-box DPIB">
    <el-autocomplete
      size="mini"
      @blur="$emit('blur')"
      v-focus
      clearable
      class="MR10 W400"
      :debounce="300"
      v-model="valueNeed"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
    >
      <template slot-scope="{ item }">
        <div class :title="item.label">
          <span>{{ item.value }}</span>
          <span>({{ item.label }})</span>
        </div>
      </template>
    </el-autocomplete>
  </div>
</template>

<script>
export default {
  name: "auto_html_tag",
  mixins: [MIX.form_item_new], //混入
  props: {
    cf: {
      type: Object,
      default: function () {
        return {}
      }
    },
  },

  data() {
    return {
      arrHtmlTag: [],
      ready: false,
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var arrHtmlTag = this.arrHtmlTag;

      if (!queryString) return cb(arrHtmlTag)
      var results = arrHtmlTag.filter(this.createFilter(queryString));

      //排序优化，匹配位置越靠前的排在前面
      let arrRemp = results.map(d => {
        let obj = { ...d };
        obj.matchIndex = d.value.toLowerCase().indexOf(queryString.toLowerCase())
        return obj
      })

      //数字数组（由小到大）
      arrRemp.sort(function (a, b) {
        return a.matchIndex - b.matchIndex;
      });

      console.log(`arrRemp:####`, arrRemp);

      results = arrRemp

      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
      };
    },


  },
  async created() {

    this.arrHtmlTag = PUB.arrHtmlTag.map(d => {
      return { "value": d.tag, "label": d.label || d.desc }
    });



  },
  mounted() {



  },
};
</script>


<style scoped>
</style>
