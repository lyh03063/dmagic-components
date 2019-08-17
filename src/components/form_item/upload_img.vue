<template>
  <div class>
    <el-upload
      action="http://www.dmagic.cn/ServiceItem36"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="uploaded"
      :file-list="valueNeed"
      name="ImgParame"
      v-if="!changeOrder"
    >
      <i class="el-icon-plus"></i>
      
    </el-upload>
    <el-button size="mini" plain v-if="!changeOrder" @click="changeOrder=true">排序</el-button>
        
    
        <draggable v-model="valueNeed" v-if="changeOrder">
          <div class="photo-box" v-for="(img,index) in valueNeed" :key="index">
          <img  :src="img.url" class="photo-img" @mousemove="showtool[index]=true">
          </div>
        </draggable>
        <div style="clear:both"></div>
        <el-button size="mini" plain v-if="changeOrder" @click="changeOrder=false" style="margin-top:20px">上传</el-button>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
// action="https://jsonplaceholder.typicode.com/posts/"
export default {
  // props: {
  //   value: [Array]
  // },
  mixins: [MIX.form_item],//混入
  components:{draggable },
  data() {
    return {
      // valueNeed: this.value,
      dialogImageUrl: "",
      dialogVisible: false,
      changeOrder:false
    };
  },
  computed:{
    showtool(){
      let arr = []
      arr.length = this.valueNeed.length
      return arr
    }
  },

  methods: {
    //处理图片上传后的同步
    uploaded(response) {
      console.log("response", response);
      let url = response.url.replace("./", "");
      url = `http://www.dmagic.cn/${url}`; //图片的绝对路径
      this.valueNeed.push({ url }); //s
 
    },

    //处理图片删除后的同步
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.valueNeed = fileList;
     
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  created() {
    //如果{value}不存在
    if (!this.value) {
      this.valueNeed = [];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

  .photo-box {
    float: left;
    width: 146px;
    height: 146px;
    margin-right: 10px;
  }
  .photo-img{
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  .sort-button{
    height: 40px;
    width: 50px;
    float: left;
    border:1px solid #c0ccda;
    text-align: center;
  }
</style>
