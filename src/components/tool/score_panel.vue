<template>
  <span>
    <dm_debug_list>
      <dm_debug_item v-model="param" text="param" />
    </dm_debug_list>
     <!-- <div class="" >listIndex:{{listIndex}}</div> -->
    总分：
   
    <span class="C_f30 FWB">{{data.score}}</span>
    &nbsp;&nbsp;
    <span class="C_999">
      <span
        :class="{'item':true,'focus':focusId===undefined}"
        @click="filterData()"
      >全部({{data.allCount}})</span>
      <span
        :class="{'item':true,'focus':focusId==='null'}"
        @click="filterData('null')"
      >未学({{data.countNull}})</span>
      <span :class="{'item':true,'focus':focusId===1}" @click="filterData(1)">陌生({{data.count1}})</span>
      <span :class="{'item':true,'focus':focusId===2}" @click="filterData(2)">了解({{data.count2}})</span>
      <span :class="{'item':true,'focus':focusId===3}" @click="filterData(3)">熟悉({{data.count3}})</span>
      <span :class="{'item':true,'focus':focusId===4}" @click="filterData(4)">精通({{data.count4}})</span>
    </span>
  </span>
</template>

<script>
export default {
  name: "dm_score_panel",
  //用于列表模糊查询的组件
  props: {
    //需要更新的记分项key
    scoreKey: {},
    idKey: {
      default: "_id"
    },
    param: {},
    listIndex: {}, //列表标记
   
    //单独的arrLookup***
    arrLookup: {
      default: function () {
        return [];
      }
    }
  },
  data() {
    return {
      focusId: undefined,
      data: {}
    };
  },

  methods: {
    //函数：{按熟悉度过滤数据函数}
    filterData(familiarity) {
      if (this.focusId == familiarity) return; //防止重复点击
      this.focusId = familiarity;
      let arrLookup = [
        {
          //联合目标数据表
          $lookup: {
            from: "sheet232",
            localField: this.idKey,
            foreignField: "_idRel",
            as: "relDoc"
          }
        }
      ];
      //Q1：未学
      if (familiarity == "null") {
        //加入熟悉度联合查询条件
        arrLookup.push({
          $match: {
            "relDoc._data.userId": {
              $ne: PUB.$sys.userId
            }
          }
        });
        //Q2：不是未学，熟悉度存在
      } else if (familiarity) {
        //加入熟悉度联合查询条件
        arrLookup.push(
          //展开relDoc,防止串数据！！！！20191203
          {
            $unwind: "$relDoc"
          },
          {
            $match: {
              "relDoc._data.familiarity": familiarity,
              "relDoc._data.userId": PUB.$sys.userId
            }
          }
        );
      }

      //层级太多太麻烦，这里需要使用vuex!!!!!
      //设置列表的联合查询参数值
      this.$store.commit("setListArrLookup", {
        listIndex: this.listIndex,
        arrLookup: arrLookup
      });

      this.$emit("switch");
    },
    //函数：{ajax获取分数函数}
    async ajaxGetScore() {
      let { _systemId, _dataType, findJson, arrLookup } = this.param;

      let { data } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/info/getFamiliarityScore`,
        data: {
          _systemId,
          _dataType,
          // dataType: this.dataType, //补充单独的dataType
          idKey: this.idKey, //需要传递idKey****
          findJson,
          arrLookup: this.arrLookup||[],
          userId: PUB.$sys.userId
        }
      });

      this.data = data;

      /*
     ***对于分组数据列表来说groupId存在
     对于Html-API列表等场景来说groupId不存在
     */
      let groupId = lodash.get(this.param, `findJson._idRel`);
      if (groupId) {
        this.updateGroupUserScore({ groupId, score: this.data }); //调用：{更新当前分组的用户学习缓存数据函数}
      } else {

        util.clearObj(findJson); //调用：{清除对象中的空属性（null,undefined,空格等）}
        let isEmpty = !util.isNotEmptyObj(findJson); //调用：{判断是否为非空对象的函数}
        //如果是空对象
        if (isEmpty) {
          FN.updateItemScore({ scoreKey: this.scoreKey, score: this.data }); //调用：{更新记分项缓存数据函数}
        }
      }
    },
    updateGroupUserScore: FN.updateGroupUserScore //函数：{更新当前分组的用户学习缓存数据函数}
  },
  async created() {
    // this.ajaxGetScore(); //调用：{ajax获取分数函数}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item {
  border: 1px #ddd solid;
  border-radius: 5px;
  padding: 5px;
  display: inline-block;
  margin-right: 5px;
  cursor: pointer;
}
.item.focus {
  border: 1px #f60 solid;
}
</style>
