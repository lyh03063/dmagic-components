<template>
  <div class>
    <div :id="id"></div>
    <div class="M_0 btn-big-play" @click="fnClick" v-if="cf.showBigBtn">
      <i :class="iconPlay"></i>
    </div>
  </div>
</template>

<script>


export default {
  name: "aplayer_demo",
  components: {},
  props: {
    cf: {
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {
      id: `id_${util.getTimeRandom()}`,
      play: false,
    };
  },
  computed: {
    iconPlay: function () {
      return this.play ? "el-icon-video-pause" : "el-icon-video-play"
    }
  },
  methods: {
    async init() {
      await util.loadJs({ url: `//qn-static.dmagic.cn/APlayer.min.1.10.1.js` })//加载
      await util.loadCss({ url: `//qn-static.dmagic.cn/APlayer.min.1.10.1.css` })//加载
      this.ap = new APlayer({
        container: document.getElementById(this.id),
        ...this.cf.cfAPlayer
      });
      this.ap.on('pause', () => {
        this.play = false;
      });
      this.ap.on('play', () => {
        this.play = true;
      });
    },
    //函数：{点击按钮的函数}
    fnClick: async function () {
      this.play = !this.play;
      if (this.play) {//如果{播放状态}为真
        this.ap.play()
      } else {
        this.ap.pause()
      }

    },
    //函数：{初始化组件配置函数}
    initCf: async function () {
      let cfAPlayer = lodash.get(this.cf, `cfAPlayer`, {});
      let cfAPlayerDefault = {
        audio: [
        {
          name: 'we are the champions',
          artist: 'queen',
          url: 'https://www.dmagic.cn/media/article/8064.mp3',
          cover: 'http://img1.imgtn.bdimg.com/it/u=2201773812,3354531125&fm=26&gp=0.jpg'
        }
      ]
      }
      util.setObjDefault(cfAPlayer, cfAPlayerDefault);
      util.setObjDefault(this.cf, {
        // isShowSearchForm: false,
        cfAPlayer
      });


    },

  },

  async created() {


  },
  async mounted() {
    this.initCf()//调用：{初始化组件配置函数}
    this.init()
  }
};
</script>

<style scoped>
.btn-big-play {
  width: 100%;
  font-size: 124px;
  text-align: center;
  /* font-weight: 100; */

  height: 160px;
  background: #f0f0f0;
  color: #666;
  cursor: pointer;
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
