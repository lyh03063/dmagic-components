<template>
  <span class>{{areaText}}</span>
</template>

<script>
export default {
  name: "com_addressObj",
  //用于列表模糊查询的组件
  props: ["doc"],
  data() {
    return {};
  },
  props: ["doc"],//接收属性
  computed: {
    areaText() {
      let arrArea = lodash.get(this.doc, `addressObj.arrArea`);
      let detail = lodash.get(this.doc, `addressObj.detail`);
      if (!arrArea) return ""
      let provinceName = lodash.get(arrArea, `[0].label`);
      let cityName = lodash.get(arrArea, `[1].label`);
      let countryName = lodash.get(arrArea, `[2].label`);
      return `${provinceName}/${cityName}/${countryName} ${detail}`

    }
  }
};
</script>
