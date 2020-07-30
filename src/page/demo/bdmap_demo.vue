<template>
  <div>
    <div class="dialog_on_map">
      <div class="FWB">城北农场</div>
      <div class>
        <img class="WP100" src="http://qn-dmagic.dmagic.cn/202007281705751818_53581_farm.png
" alt />
      </div>浮层
    </div>

    <div style="padding: 20px">
      <div>
        <a
          v-bind:class="[(areaDoc.id==focusIdBtnArea)?'focus':'', 'btn-area']"
          v-for="areaDoc in areaList"
          v-bind:key="areaDoc.id"
          href="javascript:;"
          @click="switchArea(areaDoc)"
        >{{areaDoc.name}}</a>
      </div>
      <p class="H10 OF2 CL1"></p>
      <div>
        <a
          v-bind:class="[(trainDoc.id==focusIdBtnTrainPoint)?'focus':'', 'btn-train-point']"
          v-for="trainDoc in trainPointList"
          v-bind:key="trainDoc.id"
          href="javascript:;"
          @click="switchTrainPoint(trainDoc)"
        >{{trainDoc.name}}</a>
      </div>
      <p class="H10 OF2 CL1"></p>
    </div>
    <div id="l-map"></div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      focusIdBtnArea: null,
      focusIdBtnTrainPoint: null,
      trainPointList: [],
      areaList: [{
        id: '1',
        name: '黄浦区',
        coordsX: "113.470607",
        coordsY: "23.13132",
        trainPointList: [{
          id: '1_1',
          name: '科林路总站公交车站旁',
          coordsX: "113.454907",
          coordsY: "23.147292",
        },
        {
          id: '1_2',
          name: '荔景特色农家菜馆附近',
          coordsX: "113.518765",
          coordsY: "23.080704",
        }]
      }, {
        id: '2',
        name: '番禺区',
        coordsX: "113.391622",
        coordsY: "22.941967",
        trainPointList: [{
          id: '2_1',
          name: '南村板桥地铁口旁',
          coordsX: "113.394397",
          coordsY: "23.022994",
        },
        {
          id: '2_2',
          name: '大石地铁站',
          coordsX: "113.328086",
          coordsY: "23.023517",
        }]
      }],

      formData: {

      },
    };
  },
  methods: {
    switchArea: function (areaDoc) {
      this.map.clearOverlays();//清除所有覆盖物
      this.focusIdBtnArea = areaDoc.id;
      this.trainPointList = areaDoc.trainPointList
      var point = new BMapGL.Point(areaDoc.coordsX, areaDoc.coordsY);
      this.map.panTo(point);      //移动中心点到指定点（动画效果）
      this.focusIdBtnTrainPoint = null;
    },
    switchTrainPoint: function (trainDoc) {
      this.map.clearOverlays();//清除所有覆盖物
      var point = new BMapGL.Point(trainDoc.coordsX, trainDoc.coordsY);
      this.focusIdBtnTrainPoint = trainDoc.id;
      // map.centerAndZoom(point, 13);      //
      this.map.panTo(point);      //移动中心点到指定点（动画效果）
      var marker = new BMapGL.Marker(point);  // 创建标注
      this.map.addOverlay(marker);               // 将标注添加到地图中

      //创建标签
      var label = new BMapGL.Label(trainDoc.name + `xxxxxx`, { offset: new BMapGL.Size(20, -10) });
      marker.setLabel(label);


      var opts = {
        width: 200,     // 信息窗口宽度
        height: 100,     // 信息窗口高度
        title: "城北农场", // 信息窗口标题
        message: "这里是城北农场"
      }
      var infoWindow = new BMapGL.InfoWindow("城北农场介绍，城北农场设备列表", opts);  // 创建信息窗口对象 
      marker.addEventListener("click", function () {
        alert(`click`);
        this.map.openInfoWindow(infoWindow, point); //开启信息窗口
      });



    }
  },
  async created() {




  },
  async mounted() {


    // await util.loadJs({ url: "//api.map.baidu.com/api?type=webgl&v=1.0&ak=guk8QpiO1vfyDyftwVkfTdMgGUe5jHOz" })//加载

    console.log(`BMapGL:####`, window.BMapGL);
    // 百度地图API功能
    var map = new BMapGL.Map("l-map");            // 创建Map实例
    this.map = map;
    var point = new BMapGL.Point(113.262232, 23.154345);
    map.centerAndZoom(point, 13);      // 初始化地图,用城市名设置地图中心点
    map.enableScrollWheelZoom(true);//启动滚轮缩放

    map.setMapType(BMAP_EARTH_MAP);      // 设置地图类型为地球模式


    await util.timeout(300); //延迟


    this.switchArea(this.areaList[0])
    this.switchTrainPoint(this.trainPointList[0])

  }
};
</script>

<style scoped>
.dialog_on_map {
  position: fixed;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.7);

  top: 300px;
  left: 400px;
  width: 300px;
  height: 300px;
  padding: 10px;
}

#l-map {
  height: 600px;
  width: 100%;
}

.btn-area {
  color: #666;
  display: inline-block;
  width: 80px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background: #f0f0f0;
  cursor: pointer;
  border: 1px #f0f0f0 solid;
  font-size: 14px;
  margin-right: 10px;
}

.btn-area.focus {
  font-weight: 700;
  border: 1px #f60 solid;
}

.btn-train-point {
  margin-right: 10px;
  font-size: 12px;
}

.btn-train-point.focus {
  font-weight: 700;
}

.btn-train-point.focus:link,
.btn-train-point.focus:visited {
  color: #f60;
}
</style>
