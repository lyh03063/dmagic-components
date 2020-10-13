<template>
  <div class="WP100">
    <dm_collection
      v-model="valueNeed"
      :show-toolbar="true"
      :cf-form="cfForm"
      :cfElBtnAdd="cfElBtnAdd"
      data-slot="dataSlot1"
    >
      <!--插槽内容-->
      <template v-slot:dataSlot1="{ doc }">
        <div class="PL8"><span class="C_f30">{{ doc.prop }}</span> =<span class="code_html_val">"{{ doc.value }}"</span></div>
      </template>
    </dm_collection>
  </div>
</template>
<script>
let T;
export default {
  mixins: [MIX.form_item_new], //混入
  components: {},
  props: {
    tag: {},
    formData:{}//父级表单数据
  },
  data() {
    return {
      dictProp: {},
      collectionlistType: "",//form
      cfForm: {
        col_span: 12,
        watch: {
          //监听属性名变化**
          prop(newVal, oldVal) {
            if (!newVal) return
  
            let dictMatch = T.dictProp[newVal]
            //***属性值的字段配置
            let itemValue = T.cfForm.formItems.find(
              item => item.prop == "value"
            );
            if (dictMatch) {//Q1：有匹配属性名的字典项
              let { frequency } = dictMatch//获取候选值配置
              itemValue.frequency = frequency//变更候选值配置
              console.log(`itemValue:`, itemValue);
            } else {//Q2：无匹配属性名的字典项
              itemValue.frequency = null
            }
          }
        },
        formItems: [
          {
            label: "属性名",
            prop: "prop",
            type: "input",
            frequency: {
              style: { width: '82px' },
              options: []
            },
          },
          {
            label: "属性值",
            prop: "value",
            type: "input",
            frequency: {
              //   widthG: "80px",
              style: { width: '82px' },
              options: []
            },
          },
        ]
      },
      cfElBtnAdd: {
        text: "+添加属性",
        size: "mini",
        plain: false
      },
   
    };
  },
  watch: {
    "formData.tag": {//监听父表单数据的tag字段变化*****
      handler(newVal, oldVal) {
        // this.tag=newVal;//更新当前tag
        console.log(`newVal:###`, newVal);
        this.setFrequency()//调用：{设置候选项函数}
      },

    },
    tag: {
      handler(newVal, oldVal) {
        console.log(`newVal:###`, newVal);
        this.setFrequency()//调用：{设置候选项函数}
      },

    }
  },

  methods: {
    //函数：{设置候选项函数}
    setFrequency: async function () {
      //变量：{公共属性候选项数组}
      let arrFPublic = [{ value: "id" }, { value: "class" }, { value: "style" }, { value: "title" },]
      //变量：{事件属性选项数组}
      let arrFEvent = [{ value: "onclick" }, { value: "ondblclick" }, { value: "onmouseenter" }, { value: "onmouseleave" },]

      let tag=this.formData.tag||this.tag//当前html标签，优先使用父表单的tag*****
      let listProp = util.getFormItemsBytag(tag)//调用：{根据html标签获取对应的属性表单项函数}
      let frequency = this.cfForm.formItems.find(d => d.prop == 'prop').frequency
      if (listProp) {
        // return//如果没有属性表单项，退出
        console.log(`listProp:###`, listProp);
        let arrFrequency = listProp.map(d => {
          return { value: d.prop }
        })
        T.dictProp = lodash.keyBy(listProp, 'prop')
        console.log(`arrFrequency:`, arrFrequency);

        console.log(`frequency:`, frequency);
        frequency.options = [...arrFrequency,...arrFPublic,  ...arrFEvent]
      } else {
        frequency.options = [...arrFPublic, ...arrFEvent]
      }

    },
  },
  async created() {
    T = this;
    await util.loadJs({ url: PUB.urlJS.html_tag })//加载html相关JS
    await util.loadJs({ url: PUB.urlJS.css_prop })//加载css相关JS
  },
  async mounted() {
    await util.timeout(1000); //延迟
    this.setFrequency()//调用：{设置候选项函数}
  }
};
</script>
<style scoped>
</style>
