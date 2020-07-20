<template>
  <div
    @mouseenter.stop="showDialogFamiliarity()"
    @click.stop
    @mouseleave.stop="focusId=null"
    class="PSR DPIB out"
  >
    <el-popover placement="right-start" width="240" trigger="hover">
      <!--候选值列表-->
      <i
        class="familiarity-option"
        :class="{'focus':valueNeed.familiarity==1}"
        @click="changeFamiliarity(1)"
      >陌生</i>
      <i
        class="familiarity-option"
        :class="{'focus':valueNeed.familiarity==2}"
        @click="changeFamiliarity(2)"
      >了解</i>
      <i
        class="familiarity-option"
        :class="{'focus':valueNeed.familiarity==3}"
        @click="changeFamiliarity(3)"
      >熟悉</i>
      <i
        class="familiarity-option"
        :class="{'focus':valueNeed.familiarity==4}"
        @click="changeFamiliarity(4)"
      >精通</i>

      <el-button slot="reference" size="mini" >
        <span
          :style="{color:dictFColor[valueNeed.familiarity]}"
        >{{dictFamiliarity[valueNeed.familiarity]||"未学"}}</span>
      </el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
  mixins: [MIX.base],
  //用于列表模糊查询的组件
  props: {
    //目标数据的id键***，在关系表中就不是_id了
    idKey: {
      default: "_id"
    },
    value: [Object, Array],
    data: [Object],
    // dataType: {}
  },
  data() {
    return {
      dataIdFamiliarity: null, //熟悉度数据id
      valueNeed: null,

      //当前需要聚焦的数据id
      focusId: null,
      //熟悉度的数据字典
      dictFamiliarity: {
        1: "陌生",
        2: "了解",
        3: "熟悉",
        4: "精通"
      },
      //熟悉度的文字颜色数据字典
      dictFColor: {
        1: "#F56C6C",
        2: "#E6A23C",
        3: "rgb(30, 183, 155)",
        4: "#67C23A"
      }
    };
  },

  watch: {
    value: {
      handler(newVal, oldVal) {
        this.valueNeed = this.value;
        // this.valueNeed = lodash.get(this.value, `[0]._data`);
        if (!this.valueNeed) {
          this.valueNeed = {};
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    //显示熟悉度操作界面
    showDialogFamiliarity() {
      this.focusId = this.data[this.idKey]; //将focusId设置成当前点击的数据Id
    },
    //切换当前数据的熟悉度函数
    async changeFamiliarity(value) {
      let studyTime = moment().format("YYYY-MM-DD HH:mm"); //获取当前学习时间
      this.dataIdFamiliarity =
        this.dataIdFamiliarity || lodash.get(this.valueNeed, `_id`);





      let _systemId = util.getSystemId();//


      //Q1:熟悉度uuid存在
      if (this.dataIdFamiliarity) {
        await axios({
          //请求接口
          method: "post",
          url: `${PUB.domain}/info/commonModify`,
          data: {
            _id: this.dataIdFamiliarity,
            _dataType: "familiarity",
            _systemId,
            _data: { familiarity: value, studyTime }
          }
        });
        this.valueNeed.familiarity = value;

        //Q2:熟悉度uuid不存在，新增
      } else {
        let { data } = await axios({
          //请求接口
          method: "post",
          url: `${PUB.domain}/info/commonAdd`,
          data: {
            _idRel: this.data[this.idKey],
            _dataType: "familiarity",
            _systemId,
            _data: {
              userId: this.$sys.userId,

              // dataType: this.dataType,
              familiarity: value,
              studyTime
            }
          }
        });
        let docAdd = lodash.get(data, `addData._data`);
        this.dataIdFamiliarity = lodash.get(data, `addData._id`);
        this.valueNeed = docAdd; //改变valueNeed---注意结构！！！！
        //this.$emit("input", [{ _data: this.valueNeed }]);
        this.$emit("input", this.valueNeed);
      }
    }
  },
  created() { }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/****************************熟悉度切换-START****************************/

.pop-box {
  top: -10px;
  left: 50px;
  width: 215px;
  border: 1px #ddd solid;
  box-shadow: 2px 2px 5px #ccc;
  border-radius: 5px;
  z-index: 4;
  padding: 5px 10px 5px 5px;
}

.familiarity-option {
  float: left;
  display: inline-block;
  border: 1px #ddd solid;
  border-radius: 5px;
  line-height: 1;
  padding: 5px 8px;
  background-color: #f0f0f0;
  margin: 0 5px 0 0;
  cursor: pointer;
  color: #999;
  font-style: normal;
  text-align: center;
}

.familiarity-option:hover {
  border: 1px #f60 solid;
}

.familiarity-option.focus {
  border: 1px #3a0 solid;
}

/****************************熟悉度切换-END****************************/

/* 控制按钮的高度-居然还要穿透 */
.out >>> *{
  line-height: 12px;
}
</style>
