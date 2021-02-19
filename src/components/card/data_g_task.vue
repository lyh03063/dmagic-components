<template>
  <div class="TAC">
      <!-- <div class="DPFC">
        <span class="col_1">标题</span>
        <div class="col_2">完成率，</div>
        <div class="col_3">耗时</div>
      </div> -->
    <div class="DPFC">
      <span class="MR10 FS15 FWB col col_1">{{ doc.title }}</span>
      <div class="col_2">完成{{ doc.complete * 100 }}%，</div>
      <div class="col_3">耗时{{ doc.actualTime }}h</div>

    </div>
  </div>
</template>

<script>
export default {
  name: "data_g_task",
  mixins: [MIX.base,],
  props: {
    dataTypeP: {},
    doc: {
      default: function () {
        return {
          title: "标题"
        }
      }
    }
  },
  data() {
    return {




    };
  },
  computed: {


  },

  methods: {






  },
  created() {

  }
};
</script>

<style scoped>

.col_1{
  width: 320px;
  text-align: left;
}
.col_2{
  width: 100px;
}

.col_3{
  width: 100px;
}
</style>