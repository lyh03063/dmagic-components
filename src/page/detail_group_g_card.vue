<template>
  <div class style="padding:20px">
    <dm_debug_list>
      <dm_debug_item v-model="listData" text="listData" />
    </dm_debug_list>
    <h1 class="FS24 TAC111">
      {{groupDoc.title}}
      <span class="FS14">
        【总分：
        <span class="C_f30">{{scoreAverage}}</span>】
      </span>

      <a
        target="_blank"
        class="FS12 n-a FR"
        :href="`#/study_home/detail_group?groupId=${this.groupId}`"
        v-if="$power('groupDataList.all.modify')"
      >编辑</a>
      <!-- <el-button plain @click="getDataList" size="mini">刷新</el-button> -->
    </h1>
    <dm_loading height="100" v-if="!listData"></dm_loading>
    <div class="big_group" v-for="docBig in listData" :key="docBig._id">
      <dm_pannel class="MB10" :title="docBig.targetDoc.title" type="plain">
        <template v-slot:more>
          <a
            target="_blank"
            class="FS12"
            :href="`#/study_home/detail_group?groupId=${docBig.targetDoc._id}`"
            v-if="$power('groupDataList.all.modify')"
          >编辑</a>
        </template>
        <dm_list_flex_res class="MT10" :list="docBig.sonList" #default="{item:docSmall}">
          <el-link
            class="small_group_link"
            type="primary"
            :href="`#/study_home/detail_group?groupId=${docSmall.targetDoc._id}`"
            target="_blank"
          >
            <el-card shadow="hover" :body-style="{ padding: '10px' }">
              <el-row :gutter="10" type="flex">
                <el-col>
                  <p class="FS14">{{docSmall.targetDoc.title}}</p>

                  <p class="FS12 C_999">数量：{{docSmall.targetDoc.countData}}</p>
                </el-col>
                <el-col style="width:70px" v-if="docSmall.targetDoc.dataType=='note'">
                  <el-progress
                    type="circle"
                    :percentage="formatScore(docSmall)"
                    :width="60"
                    color="#67c23a"
                  ></el-progress>
                </el-col>
              </el-row>
            </el-card>
          </el-link>
        </dm_list_flex_res>
      </dm_pannel>
    </div>
  </div>
</template>

<script>
export default {
  mixins: [MIX.base],
  components: {},
  props: {},
  data() {
    return {
      scoreAverage: "",
      groupId: null,
      groupDoc: {},
      listData: null,
      dictScore: {} //存储分数的数据字典
    };
  },

  methods: {
    //函数：{格式化分数函数}
    formatScore(docSmall) {
      let score = lodash.get(this.dictScore, `${docSmall._idRel2}.score`, 0);
      if (score > 100) { score = 100 }//如果超过100，会报错
      return Number(score);
    },
    //函数：{列表查询后执行的函数}
    async afterSearch() {
      let arrGroupId = []; //变量：{需要查询分数的分组id}

      //拼接{需要查询分数的分组id}-取二级数据
      this.listData.forEach(docBig => {
        let { sonList } = docBig;
        let arrGroupIdNeed = sonList.map(docSmall => docSmall._idRel2);
        arrGroupId.push(...arrGroupIdNeed);
      });

      let datalist = await this.getGroupUserScore(arrGroupId); //调用：{ajax获取的用户学习缓存数据函数}
      if (!datalist) return;

      let countG = arrGroupId.length; //3级分组数量

      let scoretotal = 0;
      let allCount = 0;

      if (countG) {
        //遍历列表，完善分数数据字典
        datalist.forEach(itemEach => {
          this.$set(this.dictScore, itemEach._idRel, itemEach.score);

          let scoreEach = lodash.get(itemEach, `score.score`, 0);
          let allCountEach = lodash.get(itemEach, `score.allCount`, 0);

          allCount += allCountEach;

          scoreEach = parseFloat(scoreEach);
          scoretotal += scoreEach;
        });

        this.scoreAverage = util.money(scoretotal / countG);

        //alert(`总分${scoretotal}；组数：${countG}；平均分：${this.scoreAverage}`);
        this.updateGroupUserScore({
          groupId: this.groupId,
          score: { score: this.scoreAverage, allCount }
        }); //调用：{更新当前分组的用户学习缓存数据函数}
      }
    },
    updateGroupUserScore: FN.updateGroupUserScore, //函数：{更新当前分组的用户学习缓存数据函数}

    //函数：{ajax获取的用户学习缓存数据函数}
    async getGroupUserScore(arrGroupId) {
      let urlList = PUB.listCF.list_familiarity.url.list;
      let ajaxParam = {
        findJson: {
          _idRel: { $in: arrGroupId },
          dataType: "group",
          _userId: PUB.$sys.userId
        }
      };
      Object.assign(ajaxParam, PUB.listCF.list_familiarity.paramAddonPublic); //合并公共参数
      ajaxParam._systemId = "$all"
      let {
        data: { list }
      } = await axios({
        //请求接口
        method: "post",
        url: PUB.domain + urlList,
        data: ajaxParam //传递参数
      });
      return list;
    },
    //函数：{获取分组详情函数}
    async getGroupDoc() {
      let { data } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/info/commonDetail`,
        data: {
          _id: this.groupId,
          _systemId: "$all"
        } //传递参数
      });
      this.groupDoc = data.doc;
      this.componentName = `detail_group_${this.groupDoc.dataType}`;
      document.title = this.groupDoc.title; //修改浏览器标题栏文字
      let iconSrc=this.groupDoc.iconSrc||`http://qn-dmagic.dmagic.cn/icon_study.png`
        util.changeFavicon(iconSrc)//函数：{改变网页标题图标的函数}

      this.ready = true;
    },
    //函数：{ajax获取列表函数}
    async getDataList() {
      let {
        data: { list: listData }
      } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/info/getCommonGroupList`,
        data: {
          _systemId: "$all",
          groupId: this.groupId,
          arrType: ["group"]
        }
      });

      this.listData = listData;
      this.afterSearch(); //调用：{列表查询后执行的函数}
    }
  },
  async created() {
    this.groupId = this.$route.query.groupId;
    this.getDataList(); //调用：{ajax获取列表函数}
    this.getGroupDoc(); //调用：{获取分组详情函数}
  }
};
</script>


<style scoped>
</style>
