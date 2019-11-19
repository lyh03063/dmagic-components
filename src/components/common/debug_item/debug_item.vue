<template>

  <tr>
    <td class>
      <span class="debug-text" :title="pathNeed">{{pathNeed}}</span>
      <!-- <JsonViewer :value="JSON.parse(getValueStr(pathNeed))" class="valueShowInTip"></JsonViewer> -->
    </td>
    <td class>
      <span class="debug-text" :title="text">{{text}}</span>
    </td>
    <td class="PSR" :class="{'changing':isChanging}" @dblclick="isEdit=true">
      <el-tooltip class="item MR6 PSA L3 T2" effect="light" placement="left" >
        <i class="el-icon-view"></i>
        <div slot="content">
          <pre class="valueShowInTip" v-if="getDataType(pathNeed)=='null'">{{getValueStr(pathNeed)}}</pre>
          <JsonViewer  
          :expand-depth=2
          :value="getValueStr(pathNeed)" class="valueShowInTip" v-else ></JsonViewer>
          <!--  -->
        </div>
      </el-tooltip>

      <span class="DPIB valueShow" v-if="!isEdit">{{valueNeed}}</span>
      <div class="PL18" v-if="isEdit">
        <input
          type="number"
          v-model.number="valueNeed"
          class="WP100"
          v-if="editComType=='number'"
          @blur="isEdit=false"
        />
        <textarea v-model="valueNeed" class="WP100" v-if="editComType=='text'" @blur="isEdit=false"></textarea>
        <json_editor
          v-model="valueNeed"
          class="WP100"
          v-if="editComType=='json'"
          @blur="isEdit=false"
        ></json_editor>
      </div>
    </td>
  </tr>
  
</template>

<script>
import json_editor from "../../../components/form_item/json_editor.vue";
import JsonViewer from 'vue-json-viewer'
export default {
  components: {
    //注册组件
    json_editor,JsonViewer
  },
  mixins: [MIX.form_item], //混入
  props: ["path", "text", "value"],
  data() {
    return {
      isEdit: false,
      pathNeed: this.path,
      isChanging: false,
      editComType: "text"
    };
  },
  watch: {
    value: {
      async handler(newVal, oldVal) {
        this.addClassChange(); //调用：{切换样式防抖函数}

        let type = util.type(this.value);
        let arrType = ["object", "array"];
        if (arrType.includes(type)) {
          this.editComType = "json"; //转成字符串
        } else if (type == "number") {
          this.editComType = "number"; //转成字符串
        } else {
          this.editComType = "text"; //转成字符串
        }
      },
      immediate: true,
      deep: true
    }
  },

  methods: {
    async addClassChange() {
      this.isChanging = true;
      await util.timeout(300); //延迟
      this.isChanging = false;
    },
    getDataType(path) {
      let data = this.valueNeed;
      let type = util.type(data);
      return type;
    },
    getValueStr(path) {
      let data = this.valueNeed;
      let type = util.type(data);
      let arrType = ["object", "array"];
      if (arrType.includes(type)) {
        //如果类型是对象或数组
       // data = JSON.stringify(data, null, 4); //{Json对象转换Json字符串函数}-后面两个参数可以设置缩进
      }else if(type=="null") {
        data = "null"; //转成字符串
      } else {
        data += ""; //转成字符串
      }
      return data;
    },
 
  },
  created() {
    //获取v-model变量名（表达式）
    this.pathNeed =
      this.pathNeed || lodash.get(this, "$vnode.data.model.expression");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.valueShow {
  width: 100%;
  overflow-y: auto;
  max-height: 20px;
  padding: 0 0 0 18px;
  word-break: break-all;
}
/* 属性值颜色 */
/* .valueShowInTip /deep/ .jv-code .jv-node .jv-key{
  color:white
} */
/* 大扩号颜色 */
/* .valueShowInTip /deep/ .jv-code .jv-node .jv-item.jv-object{
  color:white
} */
/*中括号颜色 */
/* .valueShowInTip /deep/ .jv-code .jv-node .jv-item.jv-array{
  color:white
} */
.valueShowInTip {
  overflow-y: auto;
  max-height: 350px;
  font-size: 16px;
  /* background-color: */
}
.jv-container.jv-light .jv-item.jv-object{
  width: 100%;
}
table.n-table.n-table-debug td,
table.n-table.n-table-debug th {
  padding: 3px;
  line-height: 18px;

}
.changing {
  background: #f60;
  color: #fff;
}

.debug-text {
  max-width: 130px;

  white-space: nowrap;
  overflow: hidden;
  max-height: 20px;
  display: inline-block;
  text-overflow: ellipsis;
}
</style>
