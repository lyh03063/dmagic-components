<template>
  <div class="DPIB">
    <el-button
      :type="collectStatus ? 'warning' : ''"
      size="mini"
      :icon="icon"
      @click="collectData()"
      circle
    ></el-button>
  </div>
</template>
<script>
export default {
  mixins: [MIX.base,],
  name: "btn_collect",//
  props: {
    dataId: {},
    cf: {
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {
      collectStatus: false, //收藏按钮是否聚焦
      icon: "el-icon-star-off", //收藏按钮图案
    };
  },
  methods: {

    //TODO:函数：{收藏按钮初始化函数}

    async collectBtnInit() {
      console.log(`collectBtnInit:${111}`);
      let _userId = this.$sys.userId

      let { data } = await axios({//请求接口
        method: "post", url: `${PUB.domain}/info/commonDetail`,
        data: {//传递参数
           _systemId: "sys_api", _dataType: "data_collect", findJson: { _idRel: this.dataId,_userId, }
        }
      });

      let { doc } = data
      if (!doc) return
      let { collectStatus } = doc

      this.collectStatus = collectStatus;
    },
    //TODO:函数：{收藏按钮点击的函数}
    async collectData() {
      let _userId = this.$sys.userId
      let data = {//ajax参数
        "_id": this.dataId, _userId, _systemId: "sys_api",
      }
      let tips="收藏成功"
      console.log(`this.collectStatus:`, this.collectStatus);
      if (this.collectStatus) {//Q1：取消收藏
        let clickStatus = await this.$confirm("确定取消收藏？").catch(() => { });
        if (clickStatus != "confirm") return
        this.icon = "el-icon-star-off";
        data.action = "cancel"
        tips="已取消收藏"
      } else {//Q2：加入收藏
        this.icon = "el-icon-star-on";
      }

      {//执行收藏/取消收藏接口

        let rsp = await axios({
          method: "post", url: `${PUB.domain}/info/collectData`, data
        });
      }
      this.$message.success( tips);
      this.collectStatus = !this.collectStatus;
    },

    
  },
  async created() {

    this.collectBtnInit() //调用：{收藏按钮初始化函数}

  },
  mounted() {
    this.$emit("inited", { vm: this }); //将当前对象抛出
  }
};
</script>
<style scoped>
</style>