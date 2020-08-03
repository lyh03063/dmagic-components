<template>
  <div>
    <!--修改实体，取消关联，复制-->
    <el-popover class placement="right" width="auto" trigger="hover">
      <pre>{{doc.partyCase}}</pre>

      <span class slot="reference">
        <div class="DPFC">
            <!-- .slice(0,9) -->
          <span class="DPIB W100 OFH H22 LH22 MR4" v-if="doc.partyCase">{{doc.partyCase}}</span>
          <i class="el-icon-more"></i>
        </div>
      </span>
    </el-popover>
  </div>
</template>

<script>
export default {
  mixins: [MIX.base],
  name: "dm_c_party_case",//案件当事人列
  props: ["doc"],
  data() {
    return {};
  },
  methods: {



  },
  created() {



  }
};
</script>
