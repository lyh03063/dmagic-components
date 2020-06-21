<template>
  <div class>
    <dm_debug_list>
      <dm_debug_item v-model="cf1" />
    </dm_debug_list>

    <dm_aplayer class :cf="cf1" v-if="ready"></dm_aplayer>
  </div>
</template>

<script>
export default {
  name: "group_audio",
  components: {},
  data() {
    return {
      ready: false,
      cf1: {
        showBigBtn: true,
        cfAPlayer: {
          audio: [
            {
              name: '童年',
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
    let groupId = this.groupId || this.$route.query.groupId || "5e92819e3654e268f360be23";



    let {
      data: { list }
    } = await axios({
      //请求接口
      method: "post", url: `${PUB.domain}/info/getCommonGroupList`,
      data: {
        _systemId: "$all", groupId, arrType: ["group", "file"],
        $projectTgAddon: { file: "$targetDoc._data.file", }
      }
    });
  




    let listAudio = list.map(doc => {
      let { targetDoc } = doc
      let { title, file } = targetDoc
      let url = lodash.get(file, `[0].url`);
      let objAudio = { name: title, url, }
      return objAudio
    })
  console.log(`listAudio:`, listAudio);

    // let { data } = await axios({      //请求接口
    //   method: "post", url: `${PUB.domain}/info/commonDetail`,
    //   data: {//传递参数
    //     _id: dataId, _systemId: "$all"
    //   }
    // });
    // this.doc = data.doc;

    // let { title, file } = data.doc
    // let url = lodash.get(file, `[0].url`);
    // let objAudio = { name: title, url, }
    this.cf1.cfAPlayer = {
      audio: listAudio
    }
    this.ready = true;

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
