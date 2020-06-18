<template>
  <div class="">

    <div class="modify-father-box" v-show="ak47">
      <div class="login-box">
        
        <h1>设置管理员密码</h1>
        <h2>当前管理员：{{userName}}</h2>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="0"
          class="demo-ruleForm"
        >
          <el-form-item prop="oldPassword">
            <div class>
              <el-input v-model="ruleForm.oldPassword" placeholder="请输入旧密码" show-password>
                <!-- <template slot="prepend">管理账户</template> -->
              </el-input>
            </div>
          </el-form-item>
          <el-form-item prop="newPassWord">
            <el-input v-model="ruleForm.newPassWord" placeholder="请输入新密码" show-password></el-input>
          </el-form-item>
          <el-form-item prop="affirmPassWord">
            <el-input v-model="ruleForm.affirmPassWord" placeholder="确认密码" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="WP100" @click="submitForm('ruleForm')">确认修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var validateuserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入旧密码"));
      } else {
        callback(); //通过校验
      }
    };
    var validatepassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      }
      else {
        callback(); //通过校验
      }
    };
    var affirmPassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请确认新密码"));
      }else if( value != this.ruleForm.newPassWord){
        callback(new Error("两次输入的密码不一致"));
      }
      else {
        callback(); //通过校验
      }
    };
  

    return {
      url:'/crossList?page=tangball_admin',
      modifyUrl:'/crossModify?page=tangball_admin',
      userName:PUB.$sys.userId,
      findJson:{},
      ak47: true,
      ruleForm: {
        //表单数据.
        oldPassword: "",
        newPassWord: "",
        affirmPassWord:''
      },
      rules: {
        //校验规则，需要定在el-form的rules属性上
        // validateuserName校验器是一个回调函数
        // trigger: "blur" 规则的触发方式，失焦事件
        oldPassword: [{ validator: validateuserName, trigger: "blur" }],
        newPassWord: [{ validator: validatepassWord, trigger: "blur" }],
        affirmPassWord:[{ validator: affirmPassWord, trigger: "blur" }]
      },
      userLog: {}
    };
  },

  methods: {
    async modifyPassword() {
     let loadingInstance =  this.$loading({ fullscreen: true })
	    let { data } = await axios({
          method: "post",
          url: PUB.domain + this.url,
          data: {
            findJson: this.findJson
          }
        }).catch(() => {});
        loadingInstance.close()
       let obj  = data.list[0]
       if (this.$route.query.flag) {
        obj.passWord =  obj.password
       }
      if (obj.passWord == this.ruleForm.oldPassword) {
        obj.passWord = this.ruleForm.newPassWord
        if (this.$route.query.flag) {
        obj.password =  this.ruleForm.newPassWord
       }
        await axios({
          method: "post",
          url: PUB.domain + this.modifyUrl,
          data: {
            findJson: {
              P1:obj.P1
            },
            modifyJson:obj
          }
        }).catch(() => {});
        this.$message({
          showClose: true,
          message: '修改成功',
          type: 'success'
        });
        // this.$router.push({ path: "/manage" });
        
      }else{
        alert('旧密码不正确')
        this.ruleForm.oldPassWord = ''
      }
      
    },
    submitForm(formName) {
      this.$refs.ruleForm;
      this.$refs["ruleForm"];

      this.$refs.ruleForm.validate(valid => {
        //表单组件执行validate校验方法
        if (valid) {
          //如果validate为真执行以下放方法
          this.modifyPassword();
        }
      });
    }
  },
  created() {
    if (this.$route.query.flag) {
      this.url = "/crossList?page=tangball_franchisee"
      this.modifyUrl = "/crossModify?page=tangball_franchisee"
      this.userName = PUB.$sys.userId
      this.findJson = {
              name:this.userName
            }
    }else{
      this.findJson = {
              userName:this.userName
            }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.login-box {
  width: 100%;
  padding: 0 40px 40px 40px;

  h1 {
    padding: 10px 20px 10px 5px;
    font-size: 24px;
    font-weight: 400;
  }
  h2 {
    margin: 10px 20px 10px 5px;
    padding-left: 5px;
    color: #999999;
    font-size: 16px;
    font-weight: 400;
  }
}

.modify-father-box {
  padding-top:20px;
  border: 1px solid #ddd;
  box-shadow: 10px #ddd;
  /*弹窗绝对居中*/
  width: 400px;
  height: 370px;
  // border: 1px solid #000;
  background: #ffffff;
  position: fixed;
  top:25%;
  left: 41%;


  box-shadow: 10px #ffffff;
  border-radius: 10px;
}

</style>
