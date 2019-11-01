<template>
  <div class="DPIB">
    <dm_debug_list>
      <dm_debug_item v-model="valueNeed" text="valueNeed" />
    </dm_debug_list>
    <!-- :min="valueNeed[keyMin]"-->
    <!--:max="valueNeed[keyMax]"-->
    <el-input-number v-model="valueNeed[keyMin]" controls-position="right" class="hide-btn MR5" ></el-input-number>
    <span class="MR5">到</span>
    <el-input-number v-model="valueNeed[keyMax]" controls-position="right" class="hide-btn"></el-input-number>
  </div>
</template>

<script>
export default {
  name: "number_range",
  components: {},
  mixins: [MIX.form_item], //混入
  props: {
    listType: {
      default: "bar"
    },
    keyMax: {
      default: "max"
    },
    keyMin: {
      default: "min"
    }
  },
  watch: {
    value: {
      handler(newName, oldName) {
        if (!this.value) {
          //
          this.valueNeed = {};
        }
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
   
    };
  },

  methods: {},
  created() {}
};
</script>

<style scoped>

</style>
