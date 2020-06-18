<template>
  <div>
    <dm_debug_list></dm_debug_list>

    <dm_pannel_rel_list_data class="MB20" title="涉诉信息" :doc="docCase" :cf="cfRel_involvedCase"></dm_pannel_rel_list_data>
  </div>
</template>

<script>




export default {
  components: {

  },
  data() {


    return {
      cfRel_involvedCase: util.creatCfRelList({ cfList: PUB.listCF.list_involved_case, }),//涉案信息
      docCase: { "title": "案件2", "tips": "ajax修改父级数据", "g_bankruptcy_file_1": "5edc65088d6ed44d5cf18aac", "count_bankruptcy_file_1": 0, "personCharge": ["13480926436", "13691916429"], "caseId": "案号2222", "g_bankruptcy_file_2": "5edcc0888d6ed44d5cf18c0e", "count_bankruptcy_file_2": 1, "g_bankruptcy_file_3": "5edd97ffc7a1865a582de0b8", "g_bankruptcy_file_4": "5edd997dc7a1865a582de0cc", "count_bankruptcy_file_4": 0, "g_bankruptcy_file_3_1": "5edd9a21c7a1865a582de0da", "count_bankruptcy_file_3_1": 0, "g_bankruptcy_file_5": "5ede1854c7a1865a582de2ba", "count_bankruptcy_file_5": 0, "g_bankruptcy_file_33": "5ede470bc7a1865a582de329", "count_bankruptcy_file_33": 0, "caseStatus": 4, "g_bankruptcy_file_32": "5ede4dd9c7a1865a582de36f", "count_bankruptcy_file_32": 0, "g_bankruptcy_file_27": "5ede4ddbc7a1865a582de372", "count_bankruptcy_file_27": 0, "g_bankruptcy_file_29": "5ede4dddc7a1865a582de375", "count_bankruptcy_file_29": 0, "g_bankruptcy_file_30": "5ede4ddec7a1865a582de378", "count_bankruptcy_file_30": 0, "g_bankruptcy_file_31": "5ede4de0c7a1865a582de37b", "count_bankruptcy_file_31": 0, "g_bankruptcy_file_22": "5ede4de2c7a1865a582de37e", "count_bankruptcy_file_22": 0, "g_bankruptcy_file_23": "5ede4de3c7a1865a582de381", "count_bankruptcy_file_23": 0, "g_bankruptcy_file_24": "5ede4de4c7a1865a582de384", "count_bankruptcy_file_24": 0, "g_bankruptcy_file_25": "5ede4de6c7a1865a582de387", "count_bankruptcy_file_25": 0, "g_bankruptcy_file_26": "5ede4de8c7a1865a582de38a", "count_bankruptcy_file_26": 0, "g_bankruptcy_file_14": "5ede4decc7a1865a582de38d", "count_bankruptcy_file_14": 0, "g_bankruptcy_file_15": "5ede4dedc7a1865a582de390", "count_bankruptcy_file_15": 0, "g_bankruptcy_file_16": "5ede4deec7a1865a582de393", "count_bankruptcy_file_16": 0, "g_bankruptcy_file_17": "5ede4df0c7a1865a582de396", "count_bankruptcy_file_17": 0, "g_bankruptcy_file_18": "5ede4df1c7a1865a582de399", "count_bankruptcy_file_18": 0, "g_bankruptcy_file_19": "5ede4df3c7a1865a582de39c", "count_bankruptcy_file_19": 0, "g_bankruptcy_file_20": "5ede4df4c7a1865a582de39f", "count_bankruptcy_file_20": 0, "g_bankruptcy_file_21": "5ede4df6c7a1865a582de3a2", "count_bankruptcy_file_21": 0, "g_bankruptcy_file_13": "5ede4dfbc7a1865a582de3a5", "count_bankruptcy_file_13": 0, "g_bankruptcy_file_12": "5ede4dfcc7a1865a582de3a8", "count_bankruptcy_file_12": 0, "g_bankruptcy_file_11": "5ede4dfdc7a1865a582de3ab", "count_bankruptcy_file_11": 0, "g_bankruptcy_file_10": "5ede4dfec7a1865a582de3ae", "count_bankruptcy_file_10": 0, "g_bankruptcy_file_9": "5ede4e00c7a1865a582de3b1", "count_bankruptcy_file_9": 0, "g_bankruptcy_file_8": "5ede4e01c7a1865a582de3b4", "count_bankruptcy_file_8": 0, "g_bankruptcy_file_7": "5ede4e02c7a1865a582de3b7", "count_bankruptcy_file_7": 0, "g_bankruptcy_file_6": "5ede4e03c7a1865a582de3ba", "count_bankruptcy_file_6": 0, "undefined": 0, "_id": "5edc65048d6ed44d5cf18aab", "P1": 44536, "_systemId": "sys_lawyer_case", "_dataType": "bankruptcy_case", "_data": { "title": "案件2", "tips": "ajax修改父级数据", "g_bankruptcy_file_1": "5edc65088d6ed44d5cf18aac", "count_bankruptcy_file_1": 0, "personCharge": ["13480926436", "13691916429"], "caseId": "案号2222", "g_bankruptcy_file_2": "5edcc0888d6ed44d5cf18c0e", "count_bankruptcy_file_2": 1, "g_bankruptcy_file_3": "5edd97ffc7a1865a582de0b8", "g_bankruptcy_file_4": "5edd997dc7a1865a582de0cc", "count_bankruptcy_file_4": 0, "g_bankruptcy_file_3_1": "5edd9a21c7a1865a582de0da", "count_bankruptcy_file_3_1": 0, "g_bankruptcy_file_5": "5ede1854c7a1865a582de2ba", "count_bankruptcy_file_5": 0, "g_bankruptcy_file_33": "5ede470bc7a1865a582de329", "count_bankruptcy_file_33": 0, "caseStatus": 4, "g_bankruptcy_file_32": "5ede4dd9c7a1865a582de36f", "count_bankruptcy_file_32": 0, "g_bankruptcy_file_27": "5ede4ddbc7a1865a582de372", "count_bankruptcy_file_27": 0, "g_bankruptcy_file_29": "5ede4dddc7a1865a582de375", "count_bankruptcy_file_29": 0, "g_bankruptcy_file_30": "5ede4ddec7a1865a582de378", "count_bankruptcy_file_30": 0, "g_bankruptcy_file_31": "5ede4de0c7a1865a582de37b", "count_bankruptcy_file_31": 0, "g_bankruptcy_file_22": "5ede4de2c7a1865a582de37e", "count_bankruptcy_file_22": 0, "g_bankruptcy_file_23": "5ede4de3c7a1865a582de381", "count_bankruptcy_file_23": 0, "g_bankruptcy_file_24": "5ede4de4c7a1865a582de384", "count_bankruptcy_file_24": 0, "g_bankruptcy_file_25": "5ede4de6c7a1865a582de387", "count_bankruptcy_file_25": 0, "g_bankruptcy_file_26": "5ede4de8c7a1865a582de38a", "count_bankruptcy_file_26": 0, "g_bankruptcy_file_14": "5ede4decc7a1865a582de38d", "count_bankruptcy_file_14": 0, "g_bankruptcy_file_15": "5ede4dedc7a1865a582de390", "count_bankruptcy_file_15": 0, "g_bankruptcy_file_16": "5ede4deec7a1865a582de393", "count_bankruptcy_file_16": 0, "g_bankruptcy_file_17": "5ede4df0c7a1865a582de396", "count_bankruptcy_file_17": 0, "g_bankruptcy_file_18": "5ede4df1c7a1865a582de399", "count_bankruptcy_file_18": 0, "g_bankruptcy_file_19": "5ede4df3c7a1865a582de39c", "count_bankruptcy_file_19": 0, "g_bankruptcy_file_20": "5ede4df4c7a1865a582de39f", "count_bankruptcy_file_20": 0, "g_bankruptcy_file_21": "5ede4df6c7a1865a582de3a2", "count_bankruptcy_file_21": 0, "g_bankruptcy_file_13": "5ede4dfbc7a1865a582de3a5", "count_bankruptcy_file_13": 0, "g_bankruptcy_file_12": "5ede4dfcc7a1865a582de3a8", "count_bankruptcy_file_12": 0, "g_bankruptcy_file_11": "5ede4dfdc7a1865a582de3ab", "count_bankruptcy_file_11": 0, "g_bankruptcy_file_10": "5ede4dfec7a1865a582de3ae", "count_bankruptcy_file_10": 0, "g_bankruptcy_file_9": "5ede4e00c7a1865a582de3b1", "count_bankruptcy_file_9": 0, "g_bankruptcy_file_8": "5ede4e01c7a1865a582de3b4", "count_bankruptcy_file_8": 0, "g_bankruptcy_file_7": "5ede4e02c7a1865a582de3b7", "count_bankruptcy_file_7": 0, "g_bankruptcy_file_6": "5ede4e03c7a1865a582de3ba", "count_bankruptcy_file_6": 0, "undefined": 0 }, "CreateUser": "匿名", "CreateTime": "2020-06-07T03:54:44.983Z", "UpdateTime": "2020-06-09T09:10:26.741Z", "__v": 0, "_detail": null, "_userId": null, "_idRel2": null, "_idRel": null }



    };
  },


  methods: {





  },
  created(){
      //这里先设置好这个参数，避免内部的分组列表出异常！！！！
    PUB._paramAjaxAddon = {
      _systemId: "sys_lawyer_case"
    }
  },

  async mounted() {


  }
};
</script>

<style>
</style>