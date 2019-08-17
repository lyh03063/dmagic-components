<template>
  <div class>
     <el-transfer v-model="memberIdList" 
     :titles="['未指定会员', '已指定会员']"
     :data="memberList"
      @change="change"
      >
      <!-- 插槽插入自定义搜索框 -->
      <el-input v-model="search" placeholder="输入关键字搜索" slot="left-footer"></el-input>
      </el-transfer>
  </div>
</template>

<script>
export default {
  props: {
    value: Array,
    url:{//父组件传过来的地址
      type:String,
      default:"/crossList?page=tangball_member"
    },
    keyValue:{//父组件传过来的搜索key
      type:String,
      default:'name'
    }
  },
  data() {
    return {
      param:{},
      search:"",//搜索框搜索的内容
      memberList: [],//会员数组
      checkedMemberList:[],//已经选中的会员数据
      memberIdList: this.value,//父组件传过来的会员id
    };
  },
  watch:{
    // 每当搜索框的值发生变化时，请求axios数据
    search:function(event){
      // 保存用户已选中的数据
      this.getMenberFromId(this.memberIdList)
      // 根据用户输入的姓名连接接口请求数据
      this.getMenber(event);
    }
  },
  methods: {
    /**
    * @name 获取会员数据的方法
    * @desc 如果是搜索时调用的，也就是name存在是，就根据name去获取数据
    *       如果name不存在就是一开始调用，就直接获取全部数据
    * @param name 用户输入要搜索的关键字
    */
    async getMenber(name) {
      if(name){
        let { data } = await axios({
        //请求接口
        method: "post",
        url: PUB.domain + this.url,
        data:{
          findJson: {
              [this.keyValue]:{
                $options: "i",
                $regex:name
              }
            }
        }
      });
      this.memberList = this.transferData(data.list).concat(this.checkedMemberList);
      // 防止同时出现两个相同的会员，对象数组去重
      var obj = {}
      this.memberList = this.memberList.reduce((item,next)=>{
        obj[next.key]?'':obj[next.key] = true && item.push(next);
        return item
      },[])
      }else{
      let { data } = await axios({
        //请求接口
        method: "post",
        url: PUB.domain + this.url,
        data:{
  
        }
      });
      this.memberList = this.transferData(data.list)
      }
      
    },
    /**
    * @name 根据P1获取数据的方法
    * @desc 根据已保存选中的P1获取数据
    * @param id 已指定的数组
    */
    async getMenberFromId(id) {
      let { data } = await axios({
        //请求接口
        method: "post",
        url: PUB.domain + this.url,
        data:{
          findJson: {
              P1:id
            }
        }
      });
      this.checkedMemberList = this.transferData(data.list)
    },
    /**
    * @name 改变数据格式的方法
    * @desc 由于要使用element穿梭框组件，所以需要将数据改变成element支持的格式
    *       用这个方法改变数据格式
    * @param 
    */
    transferData(data){
      let newData =[];
        data.forEach(member => {
          let newMember = {}
          newMember.key=member.P1
          newMember.label=member.P1+'('+member[this.keyValue]+')'
          newData.push(newMember)
      });
      return newData
    },
    // 数据发生变化时，触发双向绑定
    change() {
      this.$emit("input", this.memberIdList);//触发双向绑定
    },
  },
  mounted(){
    // 页面加载就调用此方法，参数才不会为空
    this.getMenber();

  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
