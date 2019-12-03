<template>
  <div class>
    <dm_loading height="200" v-if="!isReadyFormData"></dm_loading>
    <!--isReadyFormData为真时才开始渲染表单，保证里面的组件初始化时，表单初始数据已经准备好-->
    <dm_debug_list>
      <dm_debug_item v-model="formDataNeed" text="formDataNeed" />
      <dm_debug_item v-model="value" text="value" />
      <dm_debug_item v-model="cf" text="配置" />
    </dm_debug_list>
    <el-form
      ref="form"
      :model="value"
      :label-width="cf.labelWidth||'120px'"
      :size="cf.size||'small'"
      :inline="cf.inline"
      v-if="isReadyFormData"
    >
      <el-row>
        <template v-for="(item,index) in cf.formItems">
          <!--这里搞了个特殊的key，其实可以去掉，但编辑器代码会显示红色错误。-->
          <!--而只使用prop或index则代码会报key重复的错误，很奇怪index也会报key重复-->
          <el-col
            :span="item.col_span||cf.col_span"
            :key="item.prop+'_'+index"
            :class="{clearall:clearall}"
            :style="getItemStyle(item)"
            v-if="satisfyTerm(item)"
          >
            <div
              v-if="item.cfForm"
              :class="{'form-group-box':true,'form-group-no-label':!item.label}"
              :style="item.style"
            >
              <div class="FWB FS16">{{item.label}}</div>
              <!--递归表单组件，如果有配置prop-->
              <dm_dynamic_form :cf="item.cfForm" v-model="formDataNeed[item.prop]" v-if="item.prop">
                <!--递归插槽-->
                <template
                  v-slot:[formItem.slot]="{formData}"
                  v-for="formItem in item.cfForm.formItems"
                >
                  <!--根据cf.formItems循环输出插槽-->
                  <slot :name="formItem.slot" :formData="formData" v-if="formItem.slot"></slot>
                </template>
              </dm_dynamic_form>
              <!--递归表单组件，如果没有配置prop-->
              <dm_dynamic_form :cf="item.cfForm" v-model="formDataNeed" v-else>
                <!--递归插槽-->
                <template
                  v-slot:[formItem.slot]="{formData}"
                  v-for="formItem in item.cfForm.formItems"
                >
                  <!--根据cf.formItems循环输出插槽-->
                  <slot :name="formItem.slot" :formData="formData" v-if="formItem.slot"></slot>
                </template>
              </dm_dynamic_form>
            </div>

            <el-form-item :prop="item.prop" :rules="item.rules||[]" v-if="!item.cfForm">
              <!--通过插槽方式实现字段标签-->
              <label slot="label">
                {{item.label}}
                <!--提示-->
                <i class="el-icon-question" :title="item.tips" style="color:#999" v-if="item.tips"></i>
              </label>
              <form_item :cf="item" v-model="formDataNeed" @enterClick="enterClick">
                <!--递归普通表单字段的插槽-->
                <template v-slot:[item.slot]="{formData}">
                  <slot :name="item.slot" :formData="formDataNeed" v-if="item.slot"></slot>
                </template>
                <!--递归集合里的插槽-->
                <template v-slot:[item.dataSlot]="{doc}">
                  <!--输出插槽-->
                  <slot :name="item.dataSlot" v-if="item.dataSlot" :doc="doc"></slot>
                </template>
              </form_item>
            </el-form-item>
          </el-col>
        </template>

        <template class v-if="cf.btns&&cf.btns.length">
          <div class="TAC LH50 clear" v-if="!cf.inline">
            <el-button
              :type="item.type"
              @click="btnClick(item.event,item.validate)"
              v-for="(item,index) in cf.btns"
              :key="index"
              size="normal"
            >{{item.text}}</el-button>
          </div>
          <!-- 查询按钮 -->
          <el-form-item style="display:inline-block;" v-else>
            <el-button
              :type="item.type"
              @click="btnClick(item.event,item.validate)"
              v-for="(item,index) in cf.btns"
              :key="index"
              size="mini"
            >{{item.text}}</el-button>
          </el-form-item>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import form_item from "../../components/form_item/form_item.vue";

export default {
  name: "dm_dynamic_form", //组件名，用于递归
  components: {
    form_item
  },
  props: {
    cf: {
      type: Object,
      default() {
        return {
          btns: [
            { text: "提交", event: "submit", type: "primary", validate: true },
            { text: "取消", event: "cancel" }
          ]
          // col_span: 0
        };
      }
    },
    value: Object
    // formData: Object
  },
  data() {
    return {
      visibleFrequency: {}, //候选项可见性

      clearall: false, //控制变为行内块状
      spanIndex: null, //控制span属性值
      isReadyFormData: false, //表单初始化数据是否已备好的逻辑标记
      formDataNeed: null
    };
  },
  watch: {
    formDataNeed: {
      handler(newVal, oldVal) {
        console.log("dynamic-form-formDataNeed变更");
        console.log("this.formDataNeed:", this.formDataNeed);
        this.$emit("input", this.formDataNeed);
      },
      deep: true
    },
    value: {
      handler(newVal, oldVal) {
        console.log("dynamic-form-value变更");
        this.formDataNeed = this.value || {};
      },
      deep: true
      // immediate: true
    }
  },
  methods: {
    enterClick(){
      let eventName
      this.cf.btns.forEach(item=>{
        if (item.event=="submit") {
          eventName = "submit"
        }else if (item.event=="submit1") {
          eventName = "submit1"
        }
      })
      this.btnClick(eventName,true)
    },
    /**
     * @name 获取该字段样式函数
     */
    getItemStyle: function(item) {
      let styleFinal = {}; //最终的样式对象
      styleFinal["min-height"] = this.cf.itemMinHeight || "51px"; //字段高度
      let { style = {} } = item;
      Object.assign(styleFinal, style); //合并对象
      return styleFinal;
    },

    //给递归表单字段做一层空对象的保障

    initRecursionProp() {
      this.cf.formItems.forEach(itemEach => {
        //循环：{表单字段配置数组}
        if (itemEach.cfForm && itemEach.prop) {
          //如果是递归字段
          this.formDataNeed[itemEach.prop] =
            this.formDataNeed[itemEach.prop] || {};
        }
      });
    },
    satisfyTerm(item) {
      //函数：{返回是否满足显示条件的函数}-用于字段联动
      let flag = true;
      //函数定义：{递归检查条件函数}
      let checkTerm = objTerm => {
        let flagIn = true;
        for (var key in objTerm) {
          //遍历term对象
          //QK1:或查询
          if (key == "$or") {
            //或条件
            let arrOr = objTerm[key]; //变量：{或条件数组}
            let arrFlagOr = []; //变量：{或条件结果数组}
            //循环：{或条件数组}
            arrOr.forEach(orEach => {
              let flagTemp = checkTerm(orEach); //递归获取***
              arrFlagOr.push(flagTemp); //数组添加元素：{或条件结果数组}
            });
            if (!arrFlagOr.includes(true)) {
              //如果{或条件结果数组}连一个true都没有
              return false;
            }
          }
          //QK2:{普通查询}
          else {
            let valueTerm = objTerm[key];
            if (valueTerm != this.formDataNeed[key]) {
              return false;
            }
          }
        }
        return flagIn;
      };

      //如果存在term条件
      if (item.term) {
        flag = checkTerm(item.term);
      }

      return flag;
    },
    //表单校验方法，支持promise
    validate() {
      var promise = new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          if (valid) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
      return promise;
    },
    async btnClick(eventName, validate) {
      // console.log(111);
      
      //Q1：需要校验
      if (validate) {
        let valid = await this.validate(); //校验结果
        if (valid) {
          this.$emit(eventName);
        } else {
          return false;
        }
      } else {
        //Q2：不需要校验
        this.$emit(eventName);
      }
    },
    //初始化表单函数
    initForm() {
      this.initRecursionProp(); //给递归表单字段做一层空对象的保障
      this.isReadyFormData = true; //***表单初始化数据是否已备好的逻辑标记,某些字段需要等待这个标记为true
    }
  },
  async created() {
    this.formDataNeed = this.value;

    console.log("created###");
    console.log("this.value:", this.value);

    this.cf.formItems.forEach(itemEach => {
      //循环：{表单字段配置数组}处理默认值-之前的短路运算符有坑，会把值为0变成null
      let val1 = this.value[itemEach.prop];
      //Q1:{值未定义}
      if (val1 === undefined) {
        // this.formDataNeed[itemEach.prop] = itemEach.default;
        //使用set方法增加注册双向绑定字段********非常重要的手段
        this.$set(this.formDataNeed, itemEach.prop, itemEach.default);
      }
    });

    let ajaxParam = {
      [this.cf.idKey == "_id" ? "_id" : "id"]: this.value[this.cf.idKey]
    };
    Object.assign(ajaxParam, this.cf.paramAddonInit); //合并对象

    //如果初始化的ajax地址存在
    if (this.cf.urlInit) {
      let { data } = await axios({
        //请求接口
        method: "post",
        url: (PUB.domain || "") + this.cf.urlInit, //注意运算符要用括号
        data: ajaxParam //传递参数
      });
      if (data) {
        this.formDataNeed = data.Doc ||data.doc; //这里要使用大写的Doc，通用数据用小写的doc
      } else {
        this.$message.error('ajax读取初始化数据失败！');
    
      }
    }
    this.initForm(); //调用：{初始化表单函数}
  },
  mounted() {
    if (this.cf.watch) {
      //for of循环遍历对象，for of不能直接处理对象，本质上是同个Object.keys拼装一个新数组进行辅助
      let obj1 = this.cf.watch;

      for (var key of Object.keys(obj1)) {
        //增加监听器
        this.$watch(`value.${key}`, this.cf.watch[key], { immediate: true });
      }
    }

    this.spanIndex = Math.floor(24 / this.cf.col_span);
    if (!this.cf.col_span && this.cf.inline) {
      //如果form表单已经启动了行内模式和不进行分块
      this.clearall = true; //控制是否变为行内块状元素
      this.cf.col_span = null; //控制不分行
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.clear {
  /* 清除浮动的样式 */
  clear: both;
}

.clearall.el-col {
  /* 当不需要分块时，把所有区块都设置为行内块级元素 */
  display: inline-block;
}
.clear ~ .el-form-item {
  /* 查询按钮，按钮浮动 */
  float: left;
}

.form-group-box {
  border: 1px #ddd solid;
  border-radius: 5px;
  padding: 10px 10px 15px;
  margin: 0 0 20px 0;
}
/* 当标签为空时，把边框也去掉 */
.form-group-no-label {
  border: none;
  padding: 0;
  margin: 0 0 20px 0;
}

/* 防止最下边的子表单出现过大的间距 */

.el-col-24:last-child .form-group-box {
  margin-bottom: 0;
}

/* 防止最下边的字段出现过大的间距,包括双列情况 ，这个很难的-多层级嵌套时还是有问题*/
.el-col-12:last-child .el-form-item,
.el-col-12:nth-last-child(2) .el-form-item,
.el-col-24:last-child .el-form-item {
  margin-bottom: 0;
}

/* 20191018增加-用于多层级嵌套表单 */
/* .el-form-item {
  margin-bottom: 0;
} */
</style>
