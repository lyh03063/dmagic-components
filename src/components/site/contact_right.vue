<template>
  <div>
    <div class="float-bar BC_fff">
      <ul>
        <li class="normal">
          <a href="tel:13480986519">
            <b class="a"></b>
            <!--word-break:break-all在这里一定要加，否则会把图标挤到上面-->
            <span class style="word-break:break-all">13480986519</span>
          </a>
        </li>
        <!-- <li class="normal">
          <a href="javascript:;">
            <b class="b"></b>在线客服
          </a>
        </li>-->
        <!-- <li class="normal"><a href="javascript:;"><b class="f"></b>免费预约报价</a></li>-->

        <li class="erweima-li">
          <b class="c"></b>
          <div class="erweima">
            <p class="PT10">
              <img
                class="F1 ML5"
                src="http://qn-dmagic.dmagic.cn/%E5%88%98%E6%96%B0%E7%85%8C%E5%BE%AE%E4%BF%A1%E4%BA%8C%E7%BB%B4%E7%A0%81.png"
                style="width: 100px;height: 100px;"
              />
            </p>
          </div>
        </li>
        <li class>
          <a href="#top">
            <b class="top"></b>
          </a>
        </li>
      </ul>
    </div>

  </div>

</template>

<script>
let T;
export default {
  props: ["productList"],
  data() {
    return {};
  },
  methods: {},
  beforeCreate() {
    T = this;
  },
  created() { }
};
</script>

<style scoped>
.float-bar {
  position: fixed;
  top: 250px;
  z-index: 100;
  right: 0;
  width: 45px;
}
.float-bar a:link,
.float-bar a:visited {
  color: #fff;
}
.float-bar ul li {
  transition: 0.3s;
  width: 45px;
  height: 45px;
  margin-bottom: 1px;
  float: right;
  line-height: 45px;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  position: relative;
  text-indent: 10px;
}
.float-bar ul li.normal {
  overflow: hidden;
}
.float-bar ul li.normal:hover {
  transition: 0.3s;
  width: 160px;
  background-color: #0091e0;
  overflow: hidden;
}

.float-bar ul li b {
  width: 45px;
  height: 45px;
  display: block;
  overflow: hidden;
  float: right;
}

.float-bar ul li b {
  background-color: #0091e0;
  background-position: center;
  background-repeat: no-repeat;
}

.float-bar ul li:hover b {
  background-color: #0091e0;
}

.float-bar ul li b.a {
  background-image: url(http://www.dmagic.cn/images/IconS/IconS_2562.png);
}

.float-bar ul li b.b {
  background-image: url(http://www.dmagic.cn/images/IconS/IconS_2563.png);
}

.float-bar ul li b.f {
  background-image: url(http://www.dmagic.cn/images/IconS/IconS_2561.png);
}

.float-bar ul li b.c {
  background-image: url(http://www.dmagic.cn/images/IconS/IconS_2565.png);
}

.float-bar ul li b.top {
  background-image: url(http://www.dmagic.cn/images/IconS/IconS_2564.png);
}

.erweima {
  position: absolute;
  width: 111px;
  height: 150px;
  top: -110px;
  left: -111px;
  float: right;
  cursor: default !important;
  display: none;
  background: url(http://www.dmagic.cn/images/IconS/IconS_2560.png) no-repeat;
}

.float-bar ul li.erweima-li:hover .erweima {
  display: block;
}
</style>
