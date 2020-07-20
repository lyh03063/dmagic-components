<template>
  <div class style="padding:20px">
    <dm_debug_list>
      <dm_debug_item v-model="listData" text="listData" />
    </dm_debug_list>

    <h1 class="FS24 TAC">
      {{groupDoc.title}}
      <!-- <el-button plain @click="getDataList" size="mini">刷新</el-button> -->
      <a
        target="_blank"
        class="FS12 n-a FR"
        :href="`#/study_home/detail_group?groupId=${this.groupId}`"
        v-if="$power('groupDataList.all.modify')"
      >编辑</a>
    </h1>

    <dm_loading height="100" v-if="!listData"></dm_loading>
    <div class="big_group" v-for="docBig in listData" :key="docBig._id">
      <dm_pannel class="MB10" :title="docBig.targetDoc.title" type="plain">
        <dm_list_flex_res class="MT10" :list="docBig.sonList" #default="{item:docSmall}">
          <el-link
            class="small_group_link"
            type="primary"
            :href="`${docSmall.targetDoc.link}`"
            target="_blank"
          >
            <el-card shadow="hover" :body-style="{ padding: '10px' }">
              <el-row :gutter="10">
                <el-col style="width:100%">
                  <p class="FS14">{{docSmall.targetDoc.title}}</p>
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
      groupId: null,
      groupDoc: {},
      listData: null,
      dictScore: {} //存储分数的数据字典
    };
  },

  methods: {
    //函数：{格式化分数函数}
    formatScore(docSmall) {
      let score = lodash.get(this.dictScore, `${docSmall._idRel2}.score`);
      return util.money(score);
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

      let datalist = await this.getGroupUserScore(arrGroupId);
      if (datalist && datalist.length) {
        datalist.forEach(itemEach => {
          // this.dictScore[itemEach._idRel] = itemEach.score;

          this.$set(this.dictScore, itemEach._idRel, itemEach.score);
        });
      }
    },

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
      if (this.groupDoc.iconSrc) {//如果{000}000
        util.changeFavicon(this.groupDoc.iconSrc)//函数：{改变网页标题图标的函数}
      }


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
          arrType: ["group", "url"]
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
