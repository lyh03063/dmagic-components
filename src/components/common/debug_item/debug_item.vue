<template>
  <tr>
    <td class="TAR">
      <span class="debug-text">
        <span class :title="pathNeed">{{pathNeed}}</span>
        <span class="C_999" v-if="text">({{text}})</span>
      </span>

      <!-- <JsonViewer :value="JSON.parse(getValueStr(pathNeed))" class="valueShowInTip"></JsonViewer> -->
    </td>

    <td class="PSR" :class="{'changing':isChanging}" @dblclick="isEdit=true">
      <el-tooltip class="item MR6 PSA L3 T2" effect="light" placement="left">
        <i class="el-icon-view"></i>
        <div slot="content">
          <pre class="valueShowInTip" v-if="getDataType(pathNeed)=='null'">{{getValueStr(pathNeed)}}</pre>
          <div class v-else>
            <el-link type="info" @click="expandLevel">继续展开</el-link>
            <el-link type="info" @click="foldLevel">继续折叠</el-link>
            <JsonViewer
              :expand-depth="depth"
              :value="getValueStr(pathNeed)"
              class="valueShowInTip"
              v-if="readyJsonViewer"
            ></JsonViewer>
          </div>
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
        <dm_json_editor
          v-model="valueNeed"
          class="WP100"
          v-if="editComType=='json'"
          @blur="isEdit=false"
        ></dm_json_editor>
      </div>
    </td>
  </tr>
</template>

<script>
import JsonViewer from 'vue-json-viewer'
export default {
  components: {
    //注册组件
    JsonViewer
  },
  mixins: [MIX.form_item_new], //混入
  props: ["path", "text", "value"],
  data() {
    return {
      readyJsonViewer: true,//用于重新选人jsonview
      depth: 2,
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
    //函数：{JsonViewer展开多一层函数}
    expandLevel() {
      this.depth++;
      this.$nextTickStatus("readyJsonViewer")//更新视图
    },
    //函数：{JsonViewer收起多一层函数}
    foldLevel() {
      this.depth--;
      this.$nextTickStatus("readyJsonViewer")//更新视图
    },
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
      } else if (type == "null") {
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
  max-height: 14px;
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
  font-size: 12px;
  /* background-color: */
}
.jv-container.jv-light .jv-item.jv-object {
  width: 100%;
}
table.n-table.n-table-debug td,
table.n-table.n-table-debug th {
  padding: 2px;
  line-height: 14px;
  font-size: 13px;
  font-family: Arial, Helvetica, sans-serif;
}
.changing {
  background: #f60;
  color: #fff;
}

.debug-text {
  max-width: 130px;

  white-space: nowrap;
  overflow: hidden;
  max-height: 14px;
  display: inline-block;
  text-overflow: ellipsis;
}
</style>
