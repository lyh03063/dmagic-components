<template>
  <div class>
    <dm_group_audio class :cf="cf1"></dm_group_audio>
  </div>
</template>

<script>


export default {
  name: "aplayer_demo2",
  components: {},
  data() {
    return {

      cf1: {
        showBigBtn: true,
        cfAPlayer: {
          audio: [
            {
              name: '童年',
              artist: '',
              url: 'http://qn-dmagic.dmagic.cn/202006131516192323_31829_%E7%AB%A5%E5%B9%B4.mp3',
              cover: 'http://img1.imgtn.bdimg.com/it/u=2201773812,3354531125&fm=26&gp=0.jpg'
            }, {
              name: '童年2',
              artist: '',
              url: 'http://qn-dmagic.dmagic.cn/202006131516192323_31829_%E7%AB%A5%E5%B9%B4.mp3',
              cover: 'http://img1.imgtn.bdimg.com/it/u=2201773812,3354531125&fm=26&gp=0.jpg'
            }
          ]
        }
      },

    };
  },

  methods: {


  },

  async created() {


  },
  async mounted() {
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
