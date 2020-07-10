<template>
  <div class>
    <div :id="id"></div>
    <div class></div>

    <div class="foot_bar">
      <div class="DPF">
        <div class="M_0 btn_big_pre" @click="addTime(-5)" v-if="cf.showBigBtn">退5秒</div>
        <div class="M_0 btn_big_pre" @click="addTime(5)" v-if="cf.showBigBtn">进5秒</div>
      </div>
      <div class="DPF">
        <div class="M_0 btn_big_pre" @click="pre" v-if="cf.showBigBtn">上一曲{{secondCurr}}</div>
        <div class="M_0 btn_big_pre" @click="next" v-if="cf.showBigBtn">下一曲</div>
      </div>

      <div class="M_0 btn_big_play" @click="playOrPause" v-if="cf.showBigBtn">
        <i :class="iconPlay"></i>
      </div>
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
      secondCurr: null,
    };
  },
  computed: {
    iconPlay: function () {
      return this.play ? "el-icon-video-pause" : "el-icon-video-play"
    }
  },
  methods: {
    //函数：{添加秒数函数}
    addTime: async function (time) {
      console.log(`this.ap:##`, this.ap);

      let { currentTime } = this.ap.audio//变量：{当前播放的时间}

      this.ap.seek(currentTime + time)

    },
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
    //函数：{上一曲函数}
    pre: async function () {
      console.log(`this.ap:`, this.ap);
      console.log(`this.ap.list:`, this.ap.list);
      let { index } = this.ap.list
      let { length } = this.ap.list.audios
      if (index == 0) {
        index = length - 1
      } else {
        index--;
      }

      this.ap.list.switch(index);
      this.ap.play()


    },
    //函数：{下一曲函数}
    next: async function () {
      let indexNext = 1;
      let { index } = this.ap.list
      let { length } = this.ap.list.audios
      if (index == length - 1) {
        index = 0
      } else {
        index++;
      }

      console.log(`index:`, index);
      this.ap.list.switch(index);
      this.ap.play()
    },
    //函数：{点击按钮的函数}
    playOrPause: async function () {
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
.foot_bar {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
}

.btn_big_pre {
  align-items: center;
  justify-content: center;
  display: flex;
  width: 50%;
  font-size: 44px;
  height: 90px;
  background: #f8f8f8;
  color: #666;
  cursor: pointer;
}

.btn_big_play {
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
  font-size: 124px;
  height: 180px;
  background: #f0f0f0;
  color: #666;
  cursor: pointer;
}
</style>
