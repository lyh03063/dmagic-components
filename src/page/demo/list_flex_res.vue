<template>
  <div>
    <dm_pannel class="MB20" title="默认的列表(4列)">
      <dm_list_flex_res class="MB20" :list="productList"  #default="{item}">
        <div class="group">{{item.title}}</div>
      </dm_list_flex_res>
    </dm_pannel>

    <dm_pannel class="MB20" title="强制修改style_g">
      <dm_list_flex_res
        class="MB20"
        :style_g="{width:'49.5%'}"
        :list="productList"
       
        #default="{item}"
      >
        <div class="group">{{item.title}}</div>
      </dm_list_flex_res>
    </dm_pannel>

    <dm_pannel class="MB20" title="1到10列">
       <dm_list_flex_res
        class="MB20"
        :list="productList"
        
        #default="{item}"
        col="1"
      >
        <div class="group">{{item.title}}</div>
      </dm_list_flex_res>

      <dm_title_bar class="MB20" title="2列"></dm_title_bar>
      <dm_list_flex_res
        class="MB20"
        :list="productList"
        
        #default="{item}"
        col="2"
      >
        <div class="group">{{item.title}}</div>
      </dm_list_flex_res>
      <dm_list_flex_res
        class="MB20"
        :list="productList"
       
        #default="{item}"
        col="3"
      >
        <div class="group">{{item.title}}</div>
      </dm_list_flex_res>

      <dm_list_flex_res
        class="MB20"
        :list="productList"
       
        #default="{item}"
        col="5"
      >
        <div class="group">{{item.title}}</div>
      </dm_list_flex_res>

      <dm_list_flex_res
        class="MB20"
        :list="productList"
      
        #default="{item}"
        col="6"
      >
        <div class="group">{{item.title}}</div>
      </dm_list_flex_res>

      <dm_list_flex_res
        class="MB20"
        :list="productList"
      
        #default="{item}"
        col="7"
      >
        <div class="group">{{item.title}}</div>
      </dm_list_flex_res>

      <dm_list_flex_res
        class="MB20"
        :list="productList"
      
        #default="{item}"
        col="8"
      >
        <div class="group">{{item.title}}</div>
      </dm_list_flex_res>

      <dm_list_flex_res
        class="MB20"
        :list="productList"

        #default="{item}"
        col="9"
      >
        <div class="group">{{item.title}}</div>
      </dm_list_flex_res>

      <dm_list_flex_res
        class="MB20"
        :list="productList"
    
        #default="{item}"
        col="10"
      >
        <div class="group">{{item.title}}</div>
      </dm_list_flex_res>
    </dm_pannel>

    <dm_list_flex_res class="MB20" :list="productList"  #default="{item}">
      <el-button type="primary">{{item.title}}</el-button>
    </dm_list_flex_res>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
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
  methods: {},
  created() {},
  async mounted() {}
};
</script>

<style scoped>
.group {
  border: 1px #ddd solid;
  border-radius: 5px;
  padding: 10px;
}
</style>
