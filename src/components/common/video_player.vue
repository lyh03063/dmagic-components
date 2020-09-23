<template>
  <div class="video-box">
    <video :id="id" class="video-js vjs-default-skin" controls :src="src"></video>
  </div>
</template>

<script>
export default {
  name: "video_player",
  props: {
    src: {

    },
    options: {}

  },
  data() {
    return {
      id: null,
      optionsNeed: {
        playbackRates: [0.5, 1.0, 1.5, 2.0,], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            src: this.src || "http://vjs.zencdn.net/v/oceans.mp4" //视频url地址
          }
        ],
        // poster: "http://vjs.zencdn.net/v/oceans.png", //你的封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {

          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: true,
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  }, async mounted() {
    this.id = "id_" + util.getTimeRandom();//随机id
    await util.loadJs({ url: "https://cdnjs.cloudflare.com/ajax/libs/video.js/7.3.0/video.min.js" })//加载
    await util.loadCss({ url: "https://cdnjs.cloudflare.com/ajax/libs/video.js/7.3.0/video-js.min.css" })//加载
    var player = videojs(this.id, this.optionsNeed);
  }
};
</script>

<style scoped>
.video-box {
  width: 800px;
  height: 450px;
}
/* 让播放按钮居中 */
.video-box >>> .vjs-big-play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -60px;
  margin-top: -30px;
}
/* 播放按钮行高补丁 */
.video-box >>> .vjs-icon-placeholder {
  line-height: 1.5em;
}

@media screen and (max-width: 640px) {
  .video-box {
    width: 100%;
    height: auto;
  }
}
</style>


