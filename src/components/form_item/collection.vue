<template>
  <div class v-if="valueNeed && valueNeed.length" >
    <ul>
      <li
        v-for="(doc,i) in valueNeed"
        :key="i"
        :class="{'data-group':true,'edit':editItem==i}"
        @mouseenter="focusItem=i"
        @mouseleave="focusItem=999"
        @dblclick="editItem=i"
      >
        <div class v-if="editItem==i">
          <json_editor v-model="valueNeed[i]" @blur="afterBlur" ></json_editor>
        </div>
        <div class v-else>
          <span>{{doc}}</span>
          <div class="tool-bar" v-if="focusItem==i">
            <i class="el-icon-top btn-op" title="上移" @click="move(i, 'up')"></i>
            <i class="el-icon-bottom btn-op" title="下移" @click="move(i, 'down')"></i>
            <i class="el-icon-delete btn-op" title="删除" @click="deleteData(i)"></i>
          </div>
        </div>
      </li>
      <li></li>
    </ul>
  </div>
</template>

<script>
import json_editor from "../../components/form_item/json_editor.vue";
export default {
  components: {
    //注册组件
    json_editor
  },
  mixins: [MIX.form_item], //混入
  props: ["prop"],
  data() {
    return {
      editItem: "999", //处于编辑状态的项目Index
      focusItem: "999",
      dataIn: null
    };
  },

  methods: {
    afterBlur(){
      this.editItem="999"
    },
    move: function(index, type) {
      util.moveData(index, type, this.valueNeed);
    },
    deleteData: async function(index) {
      let clickStatus = await this.$confirm("确定删除该数据？").catch(() => {});
      if (clickStatus == "confirm") {
        //如果点击了确定
        this.valueNeed.splice(index, 1); //从下标为1的元素开始删除1个元素.
      }
    }
  },
  created() {}
};
</script>

<style scoped>
.data-group {
  position: relative;
  font-size: 12px;
  height: 26px;
  line-height: 26px;
  background-color: #f0f0f0;
  margin: 0 0 6px 0;
  padding: 0 6px;
  overflow: hidden;
}

.data-group.edit{
  height: auto;
   padding: 0 0;
}
.tool-bar {
  position: absolute;
  right: 0px;
  top: 0;
  height: 100%;
  background: #999;
  color: #fff;
  padding: 0 10px;
}

.btn-op {
  padding: 3px 3px;

  cursor: pointer;
}
</style>
