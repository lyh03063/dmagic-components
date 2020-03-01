<template>
  <div>
    <div class>
      购物车商品列表
      <ul class="n-flex-ul MB10" v-if="objGoodsCart.listGoods&&objGoodsCart.listGoods.length">
        <li v-for="(item) in objGoodsCart.listGoods" :key="item._id+item.idSpecChain">
          <b class="img-box">
            <el-link type="primary" :href="`/goods/${item._id}`">
              <img :src="item.imgSrc" alt />
            </el-link>
          </b>
          <i>
            <p class>
              {{ item.title }}
              <a
                class="FR MR10 n-a"
                href="javascript:;"
                @click="removeGoods(item)"
              >移除商品</a>
            </p>
            <p class>规格：{{ item.nameSpecChain }}</p>
            <p class>
              单价：{{ item.priceSell }}元 &nbsp;
              <el-input-number
                @change="changeCount(item)"
                v-model="item.count"
                :min="1"
                :max="999"
                label="描述文字"
                size="mini"
              ></el-input-number>&nbsp;&nbsp;小计：
              <span class="C_f30">{{ item.priceTotal }}</span>元
            </p>
            <p class></p>

            <!-- <p class>arrSpec：{{ item.arrSpec }}</p> -->
          </i>
        </li>
      </ul>
      <div class="H50 TAC C_999 LH50" v-else>购物车空空如也</div>
    </div>
    <div class="DPF n-bottom-bar">
      合计：
      <span class="C_f30 B FS18" style="flex:1">{{objGoodsCart.priceTotal}}</span>
      <div class="W260">
        <el-button type="primary" @click="goSettlement">去结算</el-button>
        <el-button plain @click="clearCart" size="mini">清空购物车</el-button>
        <el-button plain @click="initCart" size="mini">刷新</el-button>
      </div>
    </div>
  </div>
</template>

<script>
let T;
export default {
  mixins: [MIX.goods_cart],
  components: {},
  data() {
    return {
      objGoodsCart: {},
      listGoods: []
    };
  },
  methods: {
    //函数：{删除商品函数}
    removeGoods: async function(index) {
      let clickStatus = await this.$confirm("确定删除该商品？").catch(() => {});
      T.objGoodsCart.listGoods.splice(index, 1);
      T.updateCart(); //调用：{更新购物车数据函数}
      if (clickStatus == "confirm") {
        //如果点击了确定
        T.$message.success("删除成功");
      }
    },
    //函数：{清空购物车函数}
    changeCount: function(item) {
      item.priceTotal = item.priceSell * item.count; //更新总价
      T.updateCart(); //调用：{更新购物车数据函数}
      T.$message.success("删除成功");
    },
    //函数：{清空购物车函数}
    clearCart: function() {
      util.setLocalStorageObj("objGoodsCart", { listGoods: [] }); //调用：{设置一个对象到LocalStorage}
      T.initCart(); //调用：{初始化购物车函数}
    },
    //函数：{去结算按钮触发函数}
    goSettlement: function(xxx) {
      alert("goSettlement");
      //localStorage.objGoodsCart的数据传入到localStorage.orderData中
      //进入确认订单页
    },
    //函数：{更新购物车数据函数}
    updateCart: function() {
      //reduce求和，指定初始n值为0
      let priceTotal = T.objGoodsCart.listGoods.reduce(
        (n, doc) => n + (doc["priceTotal"] || 0),
        0
      );

      T.$set(T.objGoodsCart, "priceTotal", priceTotal);
      util.setLocalStorageObj("objGoodsCart", T.objGoodsCart); //调用：{设置一个对象到LocalStorage}
    },
    //函数：{初始化购物车函数}
    initCart: function(xxx) {
      //调用：{从LocalStorage获取一个对象的函数}
      let objGoodsCart = util.getLocalStorageObj("objGoodsCart");
      objGoodsCart = objGoodsCart || { listGoods: [] };

      T.objGoodsCart = objGoodsCart;
      T.updateCart(); //调用：{更新购物车数据函数}
    }
  },

  created() {
    T = this;
    
  },
  mounted() {
    T.initCart(); //调用：{initCart}
  }
};
</script>

<style scoped>
.img-box {
  width: 110px;
}
.img-box img {
  width: 100px;
  height: 100px;
}

.n-flex-ul li {
  border-bottom: 1px solid #ddd;
}

</style>
