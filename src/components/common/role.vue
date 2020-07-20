<template>
  <div>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <i class="el-icon-s-custom MR5" title="用户名"></i>
        {{$sys.nickName}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item disabled>{{$sys.userId}}</el-dropdown-item>
        <el-dropdown-item disabled>{{$sys.roleName}}</el-dropdown-item>
        <router-link to="/manage/modify_password">
          <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
        </router-link>
        <el-dropdown-item command="logOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  mixins: [MIX.base],
  methods: {
    handleCommand(command) {
      let systemId = this.$route.params.sysId||PUB._systemId;
    
      if ((command == "logOut")) {
        //退出登录函数
        util.extendLocalStorageObj(systemId, { isLogin: "0" }); //调用：{拓展一个LocalStorage对象的函数}
        this.$router.push({ path: "../login" }); //跳转到manage
        this.$message("click on item " + command);
      }
    }
  }
};
</script>
<style scoped>

.el-dropdown-link {
  cursor: pointer;
  color: #ddd;
}
.el-icon-arrow-down {
  font-size: 10px;
}
</style>