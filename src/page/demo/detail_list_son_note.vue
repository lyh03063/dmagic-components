<template>
  <div>
    <dm_pannel_new class="MB20" title="笔记的子笔记展示">
      <div class="PT10">
        <dm_detail_son_data class :doc="docNote"></dm_detail_son_data>
      </div>
    </dm_pannel_new>
  </div>
</template>

<script>
export default {
  data() {
    return {
      docNote: {
        "title": "远程教学总结xxxxx", "sonNoteGId": "5ec2094c513cbb46d81e6914", "countSonNote": 6,
      },
    };
  },
  methods: {



  },
  created() {


  },
  async mounted() { }
};
</script>


