<template>
  <div class="main">
    <div class="TAC">
      <h1 class="FS24 MT20">欢迎使用{{systemName}}</h1>

     

      <div class="TAL" v-if="listData">
        <div class="big_group" v-for="docBig in listData" :key="docBig._id">
          <dm_pannel_new class="MB20" :title="docBig.targetDoc.title">
            <el-row :gutter="6" class="big_group_List MT20">
              <el-col
                :span="6"
                class="small_group_box"
                v-for="docSmall in docBig.sonList"
                :key="docSmall._id"
              >
                <el-link
                  class="small_group_link"
                  type="primary"
                  :href="docSmall.targetDoc.link"
                  target="_blank"
                >
                  <el-card shadow="hover">
                    <p class>{{docSmall.targetDoc.title}}</p>
                  </el-card>
                </el-link>
              </el-col>
            </el-row>
          </dm_pannel_new>
        </div>
      </div>
       <div class="TAC P10 MT20" v-else><img src="http://qn-dmagic.dmagic.cn/bg.png" alt="" style="width: 450px;"></div>

      <el-button plain @click="updateGroupAndCount" size="mini">更新分组数据</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listData: null,
      systemName: PUB.systemName,
      productList: [
        { title: "产品1", price: 15 },
        { title: "产品2", price: 25 },
        { title: "产品3", price: 25 },
        { title: "产品4", price: 25 },

        { title: "产品5", price: 15 },
        { title: "产品6", price: 25 },
        { title: "产品7", price: 25 },
        { title: "产品8", price: 25 },

        { title: "产品11", price: 15 },
        { title: "产品12", price: 25 },
        { title: "产品13", price: 25 },
        { title: "产品14", price: 25 }
      ]
    };
  },
  methods: {
    async updateGroupAndCount() {
      let clickStatus = await this.$confirm(
        "确定操作,将需要10到30秒时间？"
      ).catch(() => { });
      if (clickStatus != "confirm") return;
      //开始loding
      const loading = this.$loading({
        lock: true,
        text: "执行中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      let { data } = await axios({
        method: "post",
        url: `${PUB.domain}/info/updateGroupAndCount`,
        data: {}
      });

      loading.close(); //关闭loding

      this.$message.success(`操作成功,更新了${data.length}条数据`);
    }
  },
  async created() {

    let groupId = PUB.homeGroupId;
    if (this.$route.path == "/manage/listHome") {//如果是主后台首页
      groupId = "5e18821555a1e947e7bec88d";
    }

    if (!groupId) return



    let {
      data: { list: listData }
    } = await axios({
      //请求接口
      method: "post",
      url: `${PUB.domain}/info/getCommonGroupList`,
      data: {
        _systemId: PUB._systemId,
        groupId,
      }
    });

    this.listData = listData;


    this.$store.commit("changeActiveMenu", "listHome");//聚焦菜单
  }


};
</script>

