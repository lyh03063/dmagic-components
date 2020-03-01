<template>
  <div>
    <!-- <div class>arrSpecSelected: {{arrSpecSelected}}</div> -->
    <!-- 
    <div class>IN_listSpecPrice: {{IN_listSpecPrice}}</div>
    <div class>dictSpecPrice: {{dictSpecPrice}}</div>-->

    <div class="n-cover" v-if="isShowSpecPannel" @click="isShowSpecPannel=false"></div>
    <div class="n-bottom-bar" style="z-index:201" v-if="isShowSpecPannel">
      <div class="MB10 DPF">
        <img class="goods_spec_img MR6" :src="imgSrcSpec" alt />
        <div class>
          <div class="LH30">{{docGoods.title}}</div>
          <div class>
            <i class="n-icon-rmb">￥</i>
            <i class="n-icon-money FS18 C_f00">{{priceSpec}}</i>
          </div>
        </div>
      </div>
      <div class="spec-box MB10" v-for="(specEach,i) in IN_listSpecs" :key="specEach.__id">
        <div class="spec-name">{{specEach.name}}</div>
        <el-button
          size="small"
          round
          plain
          v-for="(itemEach) in specEach.options"
          :key="itemEach.__id"
          @click="changeItem(itemEach,specEach)"
          :type="focusItem(i,itemEach.__id)"
        >{{itemEach.name}}</el-button>
      </div>
      <div class="MB10">
        <b>购买数量：</b>
        <span>
          <el-input-number size="small" v-model="countBuy" :min="1" :max="999" label="描述文字"></el-input-number>
        </span>
      </div>
      <el-button type="primary" @click="addCart" v-if="typeBuy=='cart'">确定加入购物车</el-button>
      <el-button type="primary" @click="buy" v-if="typeBuy=='buy'">确定直接购买</el-button>
    </div>

    <div class="n-bottom-bar DPF">
      <a class="ML50 MT6" href="/user/cart" style="flex:1">
        <el-badge :value="countCartGoods" :max="99" class="item MR20" :hidden="countCartGoods==0">
          <i class="el-icon-shopping-cart-2 FS24"></i>
        </el-badge>
      </a>
      <div class>
        <el-button size="small" type="primary" @click="showPannel('cart')">加购物车</el-button>
        <el-button size="small" @click="showPannel('buy')">直接购买</el-button>
      </div>
    </div>
  </div>
</template>

<script>
let T;
export default {
  components: {},
  props: {
    docGoods: {},
    listSpecs: {},
    listSpecPrice: {}
  },

  data() {
    return {
      typeBuy: "", //购买方式
      isShowSpecPannel: false, //是否显示规格选择
      countCartGoods: 0, //购物车商品种数
      countBuy: 1,

      imgSrcSpec: "",
      priceSpec: null,
      //存储已选规格项的数组
      arrSpecSelected: null,
      //数据字典-规格价格表
      dictSpecPrice: {},
      IN_listSpecs: null,
      IN_listSpecPrice: null
    };
  },
  methods: {
    //函数：{显示规格面板函数}
    showPannel: function(typeBuy) {
      T.isShowSpecPannel = true;
      T.typeBuy = typeBuy;
    },
    //函数：{初始化函数}
    init: function() {
      //初始化已选项
      T.arrSpecSelected = T.IN_listSpecs.map(doc => {
        let { __id, name } = doc;
        return { __id, name, objSOp: null };
      });

      T.initIconCart(); //调用：{初始化购物车图标函数}
    },
    //函数：{初始化购物车图标函数}
    initIconCart: function() {
      //调用：{从LocalStorage获取一个对象的函数}
      let objGoodsCart = util.getLocalStorageObj("objGoodsCart");
      objGoodsCart = objGoodsCart || { listGoods: [] };
      T.countCartGoods = objGoodsCart.listGoods.length;
    },
    //函数：{加入购物车函数}
    addCart: function() {
      if (T.isCompleteSelected()) {
        let objGoods = T.getObjGoods(); //调用：{获取当前商品对象函数}
        T.goodsAddCart(objGoods); //调用：{商品加入到购物车函数}
        T.initIconCart(); //调用：{初始化购物车图标函数}

        T.$message.success("加入购物车成功");
        T.isShowSpecPannel = false;
      } else {
        //Q2:选择规格不完整
        T.$message.error("请选择完整规格");
      }
    },
    //函数：{一组商品加入到购物车函数}-多种情况
    goodsAddCart: function(objGoods) {
      //调用：{从LocalStorage获取一个对象的函数}
      let objGoodsCart = util.getLocalStorageObj("objGoodsCart");
      objGoodsCart = objGoodsCart || { listGoods: [] };

      let isExist; //变量：{同种商品是否存在}

      objGoodsCart.listGoods.forEach(goodsEach => {
        let { _id, arrSpec = [] } = goodsEach;
        //变量：{遍历到商品的规格链id}
        let idSpecChainEach = FN.getIdSpecChian(arrSpec); //调用：{获取规格链id函数}
        //变量：{当前商品的规格链id}
        let idSpecChainCurr = FN.getIdSpecChian(objGoods.arrSpec); //调用：{获取规格链id函数}
        let flag = _id == objGoods._id && idSpecChainCurr == idSpecChainEach;
        //Q1:同“商品id”和“规格Id链”的商品已存在
        if (flag) {
          isExist = true;
          goodsEach.count += objGoods.count; //购买数量叠加
          goodsEach.priceTotal += objGoods.priceTotal; //总价叠加
        }
      });

      if (!isExist) {
        //Q1:{同种商品是否存在}为真
        objGoodsCart.listGoods.unshift(objGoods); //加入一组商品
      }

      //调用：{设置一个对象到LocalStorage}
      util.setLocalStorageObj("objGoodsCart", objGoodsCart);
    },
    //函数：{获取当前商品对象函数}
    getObjGoods: function() {
      let { _id, title } = T.docGoods;
      let objGoods = {
        _id,
        idSpecChain: FN.getIdSpecChian(T.arrSpecSelected), //调用：{获取规格链id函数}
        nameSpecChain: FN.getNameSpecChian(T.arrSpecSelected), //调用：{获取规格链名称函数}
        title,
        imgSrc: T.imgSrcSpec,
        count: T.countBuy,
        priceSell: T.priceSpec,
        priceTotal: T.priceSpec * T.countBuy,
        arrSpec: T.arrSpecSelected
      };
      return objGoods;
    },
    //函数：{点击购买函数}
    buy() {
      if (T.isCompleteSelected()) {
        //Q1:选择规格完整
        T.getObjGoods(); //调用：{获取当前商品对象函数}
      } else {
        //Q2:选择规格不完整

        T.$message.error("请选择完整规格");
      }
    },
    //函数：{判断规格是否选择完整的函数}
    isCompleteSelected() {
      let flag = T.arrSpecSelected.every(doc => !!doc.objSOp);
      //当T.arrSpecSelected的objSOp都存在时，代表已选择完
      return flag;
    },
    //函数：{规格项变动函数}
    changeItem(itemEach, specEach) {
      let { __id: idSpec } = specEach;
      //变量：{匹配的已选项}
      let itemTarget = T.arrSpecSelected.find(doc => doc.__id == idSpec);
      itemTarget.objSOp = itemEach;
      T.updateImg(itemEach); //调用：{规格变动后更新商品图片的函数}
      T.updatePrice(); //函数：{规格变动后更新商品价格函数}
    },
    //函数：{规格变动后更新商品价格函数}
    updatePrice() {
      if (T.isCompleteSelected()) {
        //Q1:选择规格完整

        let idSpecChain = FN.getIdSpecChian(T.arrSpecSelected); //调用：{获取规格链id函数}
        let price = lodash.get(T.dictSpecPrice, `${idSpecChain}.price`);
        T.priceSpec = price;
        if (util.isNullUndefined(price)) {
          //如果{000}000
          T.priceSpec = T.docGoods.priceSell;
        }
      } else {
        //Q2:否则
        let arrPrice = T.IN_listSpecPrice.map(doc => {
          let { price } = doc;
          if (util.isNullUndefined(price)) {
            //如果未设置价格
            price = T.docGoods.priceSell || 0;
          }
          return price;
        });
        let minPrice = Math.min(...arrPrice);
        let maxPrice = Math.max(...arrPrice);
        T.priceSpec = `${minPrice} ~ ${maxPrice}`;
        if (minPrice == maxPrice) {
          //如果价格都相等
          T.priceSpec = minPrice;
        }
      }
    },
    //函数：{规格变动后更新商品图片的函数}
    updateImg(itemEach) {
      let { imgSrc } = itemEach;
      let specHasImg = T.arrSpecSelected.find(doc =>
        lodash.get(doc, `objSOp.imgSrc`)
      );
      if (specHasImg) {
        //如果imgSrc存在
        T.imgSrcSpec = specHasImg.objSOp.imgSrc;
      } else {
        T.imgSrcSpec = T.docGoods.imgSrc;
      }
    },
    //函数：{规格项变动函数}
    focusItem(indexSpec, idItem) {
      //变量：{当前规格组的已选的规格项id}
      let IdSelected = lodash.get(
        T.arrSpecSelected,
        `[${indexSpec}].objSOp.__id`
      );
      if (IdSelected == idItem) {
        return "primary";
      }
    }
  },
  beforeCreate() {
    T = this;
  },
  created() {
    let { docGoods, listSpecs, listSpecPrice } = T.$props;
    T.IN_listSpecs = lodash.cloneDeep(listSpecs);
    T.IN_listSpecPrice = lodash.cloneDeep(listSpecPrice);
  },
  mounted() {
    T.init(); //调用：{初始化函数}

    T.dictSpecPrice = lodash.keyBy(T.IN_listSpecPrice, "id");
    T.updatePrice(); //函数：{规格变动后更新商品价格函数}

    T.imgSrcSpec = T.docGoods.imgSrc;
  }
};
</script>

<style scoped>
.spec-box .spec-name {
  line-height: 30px;
  font-weight: 700;
}

.n-icon-rmb {
  font-size: 10px;
  font-family: Arial, Helvetica, sans-serif;
  font-style: normal;
}
.n-icon-money {
  color: #f00;
  font-family: Arial;
  font-style: normal;
}

.goods_spec_img {
  border: 1px #ddd solid;
  width: 60px;
  height: 60px;
}


</style>
