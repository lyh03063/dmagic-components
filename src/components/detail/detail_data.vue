<template>
  <div class style="padding:10px">
    <h1 class="title TAC MB10" id="id_floor_top">{{doc.title}}</h1>
    <div class="desc" v-if="doc.desc">{{doc.desc}}</div>
    <dm_debug_list>
      <dm_debug_item v-model="doc" text="doc" />
      <dm_debug_item v-model="familiarityDoc" text="familiarityDoc" />
    </dm_debug_list>
    <div class="familiarity_box MB10">
      <el-popover
        class="MR10"
        placement="top-start"
        width="200"
        trigger="hover"
        v-if="doc.arrGroup&&doc.arrGroup.length"
      >
        <!--候选值列表-->
        <el-link
          type="primary"
          :href="`#/study_home/detail_group?groupId=${docG._idRel}`"
          v-for="docG in doc.arrGroup"
          :key="docG.relationId"
        >{{docG.title}}</el-link>
        <el-button slot="reference" icon="el-icon-more" size="mini">所属分组</el-button>
      </el-popover>
      {{dataTypeLabel}}熟悉度：
      <dm_familiarity_select
        class="MT6"
        v-model="familiarityDoc"
        :data="doc"
        :dataType="doc._dataType"
        v-if="doc._dataType"
      ></dm_familiarity_select>
      <el-button
        :type="collectBottonAuto?'warning':''"
        size="mini"
        style="margin:0 10px;"
        :icon="collectBotton"
        @click="collectAuto()"
        circle
      ></el-button>
      <div class="C_999 DPIB FR MT6" style="display:flex">
        <span class="keyword_box">关键词：{{doc.keyword}}</span>
        <el-button
          plain
          @click="cfEditDialog.visible=true"
          size="mini"
          style="width:60px"
          v-if="$sys.userId==13691916429"
        >编辑</el-button>
      </div>
    </div>

    <!-- <h1>{{dataTypeLabel}}详情</h1> -->
    <div class="detail_box">
      <!-- 使用v-once指令进行性能优化 -->
      <div class v-html="doc._detail" v-highlight v-if="doc._detail" v-once></div>
      <dm_pannel
        class="MB20"
        :title="doc.title"
        type="plain"
        v-for="(doc,i) in arrRelNote"
        :key="i"
      >
        <div class="MT20" v-html="doc._detail"></div>
      </dm_pannel>
      <div class v-if="doc._dataType=='vedio'">
        <!-- <video width="760" height="440" controls :src="srcVedio"></video> -->
        <dm_video_player :src="srcVedio"></dm_video_player>
      </div>
      <div class="FS18" v-if="doc._dataType=='front_demo'">
        <template v-if="!doc.link">
          本demo为新型demo，
          <a target="_blank" :href="`#/open/auto_layout?demoId=${dataId}`">点此查看demo</a>
        </template>
      </div>
      <div class v-if="doc._dataType=='note'&&doc.sonNoteGId">
        <!--子笔记列表-->
        <dm_detail_son_data class :doc="doc"></dm_detail_son_data>
      </div>
      <template class v-if="doc.link&&isShowIframe">
        <div class>
          以下内容通过嵌入其他网页引用：
          <a target="_blank" :href="doc.link">在新页面打开</a>
        </div>
        <iframe :src="doc.link" class="link_iframe" seamless></iframe>
      </template>
    </div>
    <!-- 编辑实体数据弹窗 -->
    <dm_dialog_edit :cf="cfEditDialog" @after-modify="init" v-if="ready"></dm_dialog_edit>
    <div class="float_bar" v-if="countReldata>0&&isShowFloatBar">
      <ul>
        <li>
          <a href="javascript:;" @click="scrollView('top')">详情</a>
        </li>
        <template class v-for="(item,i) in arrCards">
          <li :key="i" v-if="item.list&&item.list.length">
            <a
              href="javascript:;"
              @click="scrollView(item.type)"
            >{{item.title}}（{{item.list.length}}）</a>
          </li>
        </template>
      </ul>
      <a class="btn-hide MT15" href="javascript:;" @click="isShowFloatBar=false">
        <i class="el-icon-close">隐藏</i>
      </a>
    </div>
    <el-collapse v-model="activeNames" class="n-el-collapse">
      <template class v-for="(item,i) in arrCards">
        <el-collapse-item
          :key="i"
          v-if="item.list&&item.list.length"
          :id="`id_floor_${item.type}`"
          :name="item.type"
        >
          <template slot="title">
            <div class="n-title-bar">
              <b>
                {{item.title}}
                <span class="C_999">（{{item.list.length}}）</span>
              </b>
            </div>
            <!-- <i class="header-icon el-icon-info"></i> -->
          </template>
          <ul class="list-link">
            <li v-for="doc in item.list" :key="doc._id">
              <div class v-if="item.type=='front_demo'">
                <a target="_blank" :href="doc.link" v-if="doc.link">{{doc.title}}</a>
                <a target="_blank" :href="`#/open/auto_layout?demoId=${doc._id}`" v-else>
                  {{doc.title}}
                  <el-tag type="danger" size="mini">新型demo</el-tag>
                </a>
              </div>
              <a target="_blank" :href="`#/detail_data?dataId=${doc._id}`" v-else>{{doc.title}}</a>
            </li>
          </ul>
        </el-collapse-item>
      </template>
    </el-collapse>
  </div>
</template>
<script>
export default {
  mixins: [MIX.base],
  name: "dm_detail_data",
  props: {
    propDataId: null,
    docDetail: {},//***属性过来的caseId
  },
  data() {
    return {
      ready: false,//是否准备完毕
      //编辑数据弹窗配置
      cfEditDialog: {
        listType: "common", //通用型列表-影响urlModify
        cfFormModify: {
          paramAddonInit: {
            _id: "5e78bb5444ba565370025aa5",
            _systemId: "$all",
            _dataType: "url"
          }
        }
      },
      arrRelNote: [], //关联笔记的数组
      relNoteDetail: "", //关联笔记的详情html
      collectBottonAuto: false, //收藏按钮是否聚焦
      collectBotton: "el-icon-star-off", //收藏按钮图案
      isShowFloatBar: true,
      activeNames: [], //激活的折叠面板
      familiarityDoc: {},
      dataId: null,
      doc: {},
      dataTypeLabel: "", //数据类型标签
      noteListByKeyword: [], //关键词匹配的笔记列表
      htmlAPIListByKeyword: [], //关键词匹配的Html-API列表
      cssAPIListByKeyword: [], //关键词匹配的Css-API列表
      jsAPIListByKeyword: [], //关键词匹配的Js-API列表
      frontDemoListByKeyword: [], //关键词匹配的前端demo列表
      vedioListByKeyword: [], //关键词匹配的视频列表
      paramByKeyword: null //根据关键词请求关联数据的ajax固定参数
    };
  },
  computed: {
    //变量：{关联数据数量}
    countReldata() {
      //reduce求和，指定初始n值为0
      let total = this.arrCards.reduce(
        (n, doc) => n + (doc["list"].length || 0),
        0
      );
      return total;
    },
    arrCards() {
      let arr = [
        {
          type: "front_demo",
          title: "关联前端Demo",
          list: this.frontDemoListByKeyword
        },
        //关联笔记 (${noteListByKeyword.length})
        { type: "note", title: "关联笔记", list: this.noteListByKeyword },
        {
          type: "html_api",
          title: "关联Html-API",
          list: this.htmlAPIListByKeyword
        },
        {
          type: "css_api",
          title: "关联Css-API",
          list: this.cssAPIListByKeyword
        },
        {
          type: "js_api",
          title: "关联Js-API",
          list: this.jsAPIListByKeyword
        },
        {
          type: "vedio",
          title: "关联视频",
          list: this.vedioListByKeyword
        }
      ];
      this.activeNames = arr.map(doc => doc.type);
      return arr;
    },
    srcVedio() {
      let src = lodash.get(this.doc, `vedio[0].url`);
      return src;
    },
    isShowIframe() {
      let arrTypeNoIframe = ["vedio"];
      let flag = true;
      if (arrTypeNoIframe.includes(this.doc._dataType)) {
        flag = false;
      }
      return flag;
    }
  },
  methods: {
    //函数：{收藏按钮点击的函数}
    collectAuto() {
      if (this.collectBottonAuto) {
        this.collectBotton = "el-icon-star-off";
      } else {
        this.collectBotton = "el-icon-star-on";
      }
      this.collectBottonAuto = !this.collectBottonAuto;
    },
    //函数：{滚动到指定位置的函数}
    scrollView(type) {
      //让指定元素进入视口
      document.querySelector(`#id_floor_${type}`).scrollIntoView(true);
    },
    //函数：{ajax获取关联笔记列表}
    async ajaxGetNoteList() {
      let param = { ...this.paramByKeyword, _dataType: "note" };
      this.noteListByKeyword = await FN.ajaxlistBykeyword({ param }); //ajax获取关联列表
    },
    //函数：{ajax获取关联Html-API列表}
    async ajaxGetHtmlApiList() {
      let param = { ...this.paramByKeyword, _dataType: "html_api" };
      this.htmlAPIListByKeyword = await FN.ajaxlistBykeyword({ param }); //ajax获取关联列表
    },
    //函数：{ajax获取关联Css-API列表}
    async ajaxGetCssApiList() {
      let param = { ...this.paramByKeyword, _dataType: "css_api" };
      this.cssAPIListByKeyword = await FN.ajaxlistBykeyword({ param }); //ajax获取关联列表
    },
    //函数：{ajax获取关联Js-API列表}
    async ajaxGetJsApiList() {
      let param = { ...this.paramByKeyword, _dataType: "js_api" };
      this.jsAPIListByKeyword = await FN.ajaxlistBykeyword({ param }); //ajax获取关联列表
    },
    //函数：{ajax获取关联前端demo列表}
    async ajaxGetFrontDemoList() {
      let param = { ...this.paramByKeyword, _dataType: "front_demo" };
      this.frontDemoListByKeyword = await FN.ajaxlistBykeyword({ param }); //ajax获取关联列表
    },
    //函数：{ajax获取关联视频列表}
    async ajaxGetVedioList() {
      let param = { ...this.paramByKeyword, _dataType: "vedio" };
      this.vedioListByKeyword = await FN.ajaxlistBykeyword({ param }); //ajax获取关联列表
    },
    //函数：{ajax获取当前数据的熟悉度}
    async ajaxGetFamiliarity() {
      let _systemId = util.getSystemId();//
      let { data } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/info/commonDetail`,
        data: {
          _systemId,//
          _dataType: "familiarity",
          findJson: {
            _idRel: this.dataId,
            userId: PUB.$sys.userId
          } //获取列表的数据总量
        } //传递参数
      });
      this.familiarityDoc = data.doc;
    },
    //函数：{ajax获取关联笔记详情函数}-多篇按顺序拼接
    async ajaxGetRelNoteDetail() {
      let _systemId = util.getSystemId();//
      if (!this.doc.relNoteList) return;
      let htmlDetail = "";
      let arrRelNote = [];
      //循环异步
      for await (const noteEach of this.doc.relNoteList) {
        let { _id } = noteEach;
        let { data } = await axios({
          //请求接口
          method: "post",
          url: `${PUB.domain}/info/commonDetail`,
          data: {
            _systemId,
            _id
          } //传递参数
        });
        let { title, _detail } = data.doc;
        htmlDetail += _detail;
        arrRelNote.push({ title, _detail });
      }
      this.arrRelNote = arrRelNote;
      this.relNoteDetail = htmlDetail;
    },
    //函数：{初始化函数}
    async init() {
      let _systemId = util.getSystemId();//
      let { data } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/info/commonDetail`,
        data: {
          _id: this.dataId,
          _systemId: "$all"
        } //传递参数
      });
      this.doc = data.doc;
      //变量：{ajax添加访客记录函数}
      util.ajaxAddVisitRecord({ tagPage: "detail_data", dataId: this.dataId, dataType: this.doc._dataType })
      this.ajaxGetFamiliarity(); //调用：{ajax获取当前数据的熟悉度}
      this.ajaxGetRelNoteDetail(); //调用：{ajax获取关联笔记详情函数}
      let { title, keyword, _dataType } = this.doc;
      // let keyword = this.doc.keyword;
      this.dataTypeLabel = lodash.get(DYDICT.dataType, `${_dataType}.label`);
      //如果hash值是当前页面为主（不是嵌套在其他路由下）
      if (location.hash.startsWith(`#/detail_data?`)) {
        document.title = `${title}-${this.dataTypeLabel}`; //修改浏览器标题栏文字
      }
      /*****************根据数据类型修改弹窗编辑数据组件配置-START*****************/
      this.cfEditDialog.cfFormModify.paramAddonInit._dataType = _dataType;
      this.cfEditDialog.cfFormModify.paramAddonInit._id = this.doc._id;
      FN.listCFaddItemSystemId(PUB.listCF[`list_${_dataType}`])//调用：{补充_systemId列表字段配置函数}
      /*****************根据数据类型修改弹窗编辑数据组件配置-END*****************/
      this.ready = true;
      //根据关键词请求关联数据的ajax固定参数
      this.paramByKeyword = {
        _systemId,
        _id: this.dataId,
        selectJson: {
          _id: 1,
          title: 1,
          desc: 1,
          keyword: 1,
          link: 1,
          vedio: 1
        }
      };
      if (keyword) {
        this.ajaxGetNoteList(); //调用：{ajax获取关联笔记列表}
        this.ajaxGetHtmlApiList(); //调用：{ajax获取关联Html-API列表}
        this.ajaxGetCssApiList(); //调用：{ajax获取关联Css-API列表}
        this.ajaxGetFrontDemoList(); //调用：{ajax获取关联前端demo列表}
        this.ajaxGetJsApiList(); //调用：{ajax获取关联Js-API列表}
        this.ajaxGetVedioList(); //调用：{ajax获取关联视频列表}
      }
    }
  },
  async created() {
    //如果地址没有(非页面级组件)，从属性中获取数据id
    this.dataId = this.$route.query.dataId || this.docDetail._idRel2 || this.propDataId;
    this.init(); //函数：{初始化函数}
  }, mounted() {
  }
};
</script>
<style  scoped>
.detail_box {
  font-size: 18px;
  padding: 8px 0 12px;
}

/* 针对ul,ol,li的样式补丁 */
.detail_box >>> ul li {
  list-style: disc;
  margin-left: 20px;
}
.detail_box >>> ol li {
  list-style: decimal;
  margin-left: 20px;
}

.float_bar {
  position: fixed;
  right: 10px;
  top: 340px;
  border: 1px #ddd solid;
  border-radius: 5px;
  padding: 8px;
  background: #fff;
  z-index: 100;
}
.float_bar a {
  color: #666;
  text-decoration: none;
}
.link_iframe {
  width: 100%;
  height: 600px;
}
.familiarity_box {
  background: #f0f0f0;
  /* border: 1px #ddd solid; */
  border-radius: 5px;
  padding: 0 10px;
  height: 40px;
}
.keyword_box {
  display: inline-block;
  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 8px;
}
.desc {
  color: #666;
  font-size: 12px;
  padding: 10px;
  border: 1px #ddd dashed;
  border-radius: 5px;
  margin-bottom: 10px;
}
.btn-hide {
  border-radius: 5px;
  color: #666;
  display: block;
  text-align: center;
  height: 22px;
  line-height: 22px;
  background: #f7f8fa;
  cursor: pointer;
  font-size: 12px;
}
</style>

<style >
.detail_box * {
  /* line-height: normal; */
}

.detail_box code {
  line-height: 1;
}
</style>
