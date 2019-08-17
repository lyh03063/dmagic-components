<template>
  <tr>
    <td class>
      <span class="debug-text" :title="pathNeed">{{pathNeed}}</span>
    </td>
    <td class>
      <span class="debug-text" :title="text">{{text}}</span>
    </td>
    <td class="PSR" :class="{'changing':isChanging}" @dblclick="isEdit=true">
      <el-tooltip class="item MR6 PSA L3 T2" effect="dark" placement="left">
        <i class="el-icon-view"></i>
        <div slot="content">
          <pre class="valueShowInTip">{{getValueStr(pathNeed)}}</pre>
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
export default {
  components: {
    //注册组件
    json_editor
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
      async handler(newName, oldName) {
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
    getValueStr(path) {
      let data = this.valueNeed;
      let type = util.type(data);
      let arrType = ["object", "array"];
      if (arrType.includes(type)) {
        //如果类型是对象或数组
        data = JSON.stringify(data, null, 4); //{Json对象转换Json字符串函数}-后面两个参数可以设置缩进
      } else {
        data += ""; //转成字符串
      }
      return data;
    }
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

.valueShowInTip {
  overflow-y: auto;
  max-height: 350px;
  font-size: 16px;
}
table.n-table.n-table-debug td,
table.n-table.n-table-debug th {
  padding: 3px;
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
