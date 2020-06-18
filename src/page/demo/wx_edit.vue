<template>
  <div>
    <dm_pannel_new class="MB20" title="微信公众号排版">
      <div class="PT10">
        wx_edit
        <span class="W100 H100 layout">盒子1</span>

        <section class>
          <span style="display:block;width:100px;height:100px;border: 1px #f00 solid;">盒子2</span>
        </section>
      </div>
    </dm_pannel_new>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {},
  created() { },
  async mounted() { }
};
</script>

<style scoped>
.layout {
  border: 1px #f00 solid;
  border-radius: 5px;
  display: block;
  text-align: center;
  line-height: 100px;
  font-weight: 700;
}
</style>
