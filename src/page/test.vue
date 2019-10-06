<template>
  <div>
    <dm_debug_list>
      <dm_debug_item v-model="collectionData" text="collectionData" />
      <dm_debug_item v-model="obj" text="obj" />
    </dm_debug_list>
    <el-button plain @click="testObj" size="mini">testObj</el-button>
    <el-button plain @click="testObj2" size="mini">testObj2</el-button>
    <el-button plain @click="testObj3" size="mini">testObj3</el-button>
    <dm_space height="10"></dm_space>
    <collection v-model="collectionData" list-type="form" :cf-form="cfForm"></collection>
    <!-- <dm_list_data :cf="cfList"></dm_list_data> -->
  </div>
</template>

<script>
import dm_list_data from "../components/list-data/list-data.vue";
import dm_dynamic_form from "../components/list-data/dynamic-form.vue";
import collection from "../components/form_item/collection.vue";
export default {
  components: { dm_list_data, dm_dynamic_form, collection },

  data() {
    return {

      collectionData: [
        { time: "2019-09-09", money: 100 },
        { time: "2019-09-11", money: 200 }
      ],
      cfForm: {
        col_span: 12,
        formItems: [
          {
            label: "时间",
            prop: "time",
            type: "date"
          },
          {
            label: "金额",
            prop: "money"
          }
        ]
      },
       obj: {
        a: 1,
        b: 2,person:{name:"Lily"}
      },
    };
  },
    watch: {
      "obj.a": {
        handler(newName, oldName) {
          console.log('obj.a changed');
        },
        immediate: true,
        deep: true
      },
      "obj.person": {
        handler(newName, oldName) {
          console.log('obj.person changed');
        },
        immediate: true,
        deep: true
      }

    },
  methods: {
    testObj: function() {
      //this.$set(‘对象名’,要修改的属性名,属性值)
      this.$set(this.obj, "person", { name: "Jim" });
    },
    testObj2: function() {
     this.$set(this.obj.person, "age", 66);
    },
    testObj3: function() {
     lodash.set(this.obj, `person.sex`,"男");
     //通过深拷贝强制更新，此方法性能不好，会触发该对象的所有子属性的监听触发
     this.obj=util.deepCopy(this.obj)
    }
  },
  created(){
    this.$store.commit("changeActiveMenu",'test');
  },
  async mounted() {}
};
</script>

<style>
</style>
