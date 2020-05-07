<template>
  <div>
    <dm_debug_list>
      <dm_debug_item v-model="data" />
    </dm_debug_list>
    <dm_pannel_new class="MB20" title="极简-只配置formItems">
      <dm_object class="MT8" v-model="data" :cf="cfItem"></dm_object>
    </dm_pannel_new>

    <dm_pannel_new class="MB20" title="添加cfForm定制">
      <dm_object class="MT8" v-model="data2" :cf="cfItem2"></dm_object>
    </dm_pannel_new>
  </div>
</template>

<script>



PUB.dataSite = PUB.dataSite || {}
PUB.dataSite.sys_chunqiu = {
  cfBanner: {
    cfElCarousel: {
      height: "450px",
      interval: 5000,
    },
    list: [
      {
        title: 'banner2',
        link: 'javascript:;',
        imgSrc: 'http://qn-dmagic.dmagic.cn/chunqiu/banner_big_9.jpg',
      },
      {
        title: 'banner2',
        link: 'javascript:;',
        imgSrc: 'http://qn-dmagic.dmagic.cn/chunqiu/banner_big_7.jpg',
        // imgSrc: 'http://qn-dmagic.dmagic.cn/chunqiu/banner_big_6.jpg',
        // imgSrc: 'http://qn-dmagic.dmagic.cn/chunqiu/banner_big_5.jpg',
        // imgSrc: 'http://qn-dmagic.dmagic.cn/chunqiu/banner_big_2.jpg',
        // imgSrc: 'http://qn-dmagic.dmagic.cn/chunqiu/banner_1200_1.jpg',
      },
      {
        title: 'banner2',
        link: 'javascript:;',
        imgSrc: 'http://qn-dmagic.dmagic.cn/chunqiu/banner_big_4.jpg',
      },


    ],
  },

  cfPageMenu: {
    cfElMenu: {
      "background-color": "#0091e0",
      "text-color": "#fff",
      "active-text-color": "#ffd04b"
    },
    listMenu: [
      { name: "首页", url: "/" },
      {
        name: "课程体系",
        url: "/productList",
        sonMenu: [
          { name: "专业设置", url: "javascript:;" },
          { name: "培训项目", url: "javascript:;" },

        ]
      },
      {
        name: "创业就业", url: "javascript:;",
        sonMenu: [
          { name: "教学成果", url: "javascript:;" },
          { name: "学员风采", url: "javascript:;" },
          { name: "就业指导", url: "javascript:;" },
        ]
      },


      {
        name: "新闻中心",
        url: "javascript:;",
        sonMenu: [
          { name: "学校动态", url: "javascript:;" },
          { name: "媒体报道", url: "javascript:;" },
          { name: "行业新闻", url: "javascript:;" }
        ]
      },
      {
        name: "关于星孵化",
        url: "javascript:;",
        sonMenu: [
          { name: "学校简介", url: "javascript:;" },
          { name: "发展历程", url: "javascript:;" },
          { name: "核心技术", url: "javascript:;" },
          { name: "教学实景", url: "javascript:;" },
          { name: "师资保障", url: "javascript:;" },
        ]
      },
      {
        name: "学员风采",
        url: "javascript:;",
        sonMenu: [
          { name: "xxx", url: "javascript:;" },
          { name: "xxx1", url: "javascript:;" },
          { name: "xxx2", url: "javascript:;" },

        ]
      },
      {
        name: "案例剖析",
        url: "javascript:;",
        sonMenu: [
          { name: "xxx", url: "javascript:;" },
          { name: "xxx1", url: "javascript:;" },
          { name: "xxx2", url: "javascript:;" },

        ]
      }
    ]

  },
  cfPageHead: {
    siteName: "春秋教育-烹饪培训",
    cfLogo: {
      title: "星孵化烹饪学校",
      src: "http://qn-dmagic.dmagic.cn/202004231128385151_20083_logo_chunqiu_simple.png",
      width: "86px",
      height: "86px",
      styleText: {
        "font-size": "34px",
        "margin-top": "32px",
        "margin-left": "10px",
        "color": "#333",
      },
      styleBox: {

        "margin-top": "0",
        "height": "86px",
      }
    },
  },

  cfStudentWork: {
    title: "学生作品",
    list: [
      {
        title: "学生作品1",
        imgSrc: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      },

      {
        title: "学生作品2",
        imgSrc: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      },

      {
        title: "学生作品3",
        imgSrc: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      },

      {
        title: "学生作品4",
        imgSrc: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      },

    ]
  },

  cfCourse: {
    title: "课程体系",
    list: [
      {
        title: "粤菜",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course1.png",
        priceSell: 1900,
        priceMarket: 2400,
      },

      {
        title: "火锅",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course2.png",
        priceSell: 1300,
        priceMarket: 2200,
      },

      {
        title: "西餐",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course3.png",
        priceSell: 2900,
        priceMarket: 3400,
      },

      {
        title: "粥粉面",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course4.png",
        priceSell: 1400,
        priceMarket: 2400,
      },
      {
        title: "粤菜",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course1.png",
        priceSell: 1900,
        priceMarket: 2400,
      },

      {
        title: "火锅",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course2.png",
        priceSell: 1300,
        priceMarket: 2200,
      },

      {
        title: "西餐",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course3.png",
        priceSell: 2900,
        priceMarket: 3400,
      },

      {
        title: "粥粉面",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course4.png",
        priceSell: 1400,
        priceMarket: 2400,
      },
    ]
  },
  cfTeacher: {
    title: "师资力量",
    list: [
      {
        title: "张老师",
        desc: "粤菜料理专家级导师",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/cook1.png"
      },

      {
        title: "李老师",
        desc: "粥粉面专家老师",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/cook2.png"
      },

      {
        title: "黄老师",
        desc: "粥粉面专家老师",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/cook3.png"
      },

      {
        title: "罗老师",
        desc: "粥粉面专家老师",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/cook4.png"
      },

    ]
  },
  cfSchoolNews: {
    title: "学校新闻",
    // linkMore: "###",
    list: [
      {
        title: "学校动态文章标题1",
        date: "2020-11-22",
      },

      {
        title: "学校动态文章标题2",
        date: "2020-4-22",
      },

      {
        title: "学校动态文章标题3",
        date: "2020-4-22",
      },

      {
        title: "学校动态文章标题4",
        date: "2020-4-22",
      },
      {
        title: "学校动态文章标题4",
        date: "2020-4-22",
      },
      {
        title: "学校动态文章标题4",
        date: "2020-4-22",
      },
      {
        title: "学校动态文章标题4",
        date: "2020-4-22",
      },
      {
        title: "学校动态文章标题4",
        date: "2020-4-22",
      },

    ]
  },
  cfNews2: {
    title: "行业资讯",
    linkMore: "######",
    list: [
      {
        title: "行业资讯文章标题1",
        date: "2020-11-22",
      },

      {
        title: "行业资讯文章标题2",
        date: "2020-11-22",
      },



    ]
  },
  cfNewsCenter: {
    title: "新闻中心",
    linkMore: "######",




  },
  cfSchoolIntro: {
    title: "学校简介",
    linkMore: "######",
    imgSchool: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=405534800,3305762250&fm=26&gp=0.jpg",
    cotent: `江门市春秋教育科技有限公司，成立于2012年，是集学历合作办学、职业行业培训、线上学习平台研发运营、教育装备整合研发的教育科技公司。目前与江门开放大学（原江门市广播电视大学）开展合作办学，为学生提供便利、先进和优质的学习平台和支持服务。
    <br>

    春秋教育本着“发展科技、培养人才、传承文化、服务社会”的宗旨，以解放思想，实事求是，大胆革新为办学理念，依靠品德高尚、专业技术过硬，不断开拓进取的师资团队，建立和发展优秀的教育培训综合服务平台，服务学校，服务学生，服务企业。目前在读学生近4000人，合作办学学校两间，战略合作行业企业两家。<br>
    作为协调各部门运作基础业务部门，教务部是主管教育培训平台的教学工作和实施教学管理与服务的行政职能部门，主要负责学员档案、教学计划、教学质量、考试安排以及教学发展等方面的教学运行与管理工作。
    
    `

  },
  cfStrength: {
    title: "实力保证",
    linkMore: "######",
    imgSrc: "http://qn-dmagic.dmagic.cn/202004231052135959_57032_1.png"


  },

  cf_page_list_course: {
    focusMenu: "粤菜",
    breadcrumb: [{ value: "首页", path: "home" }, { value: "课程体系" }, { value: "粤菜" }],
    cfListMain: {
      title: "粤菜体系",
      list: [
        {
          title: "粤菜1",
          imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course1.png",
          priceSell: 1900,
          priceMarket: 2400,
        },

        {
          title: "粤菜2",
          imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course2.png",
          priceSell: 1300,
          priceMarket: 2200,
        },

        {
          title: "粤菜3",
          imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course3.png",
          priceSell: 2900,
          priceMarket: 3400,
        },

        {
          title: "粤菜4",
          imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course4.png",
          priceSell: 1400,
          priceMarket: 2400,
        },
        {
          title: "粤菜",
          imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course1.png",
          priceSell: 1900,
          priceMarket: 2400,
        },

        {
          title: "火锅",
          imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course2.png",
          priceSell: 1300,
          priceMarket: 2200,
        },

        {
          title: "西餐",
          imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course3.png",
          priceSell: 2900,
          priceMarket: 3400,
        },

        {
          title: "粥粉面",
          imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course4.png",
          priceSell: 1400,
          priceMarket: 2400,
        },
      ]
    },
    cfCategory: {
      title: "课程分类",
      list: [
        {
          title: "粤菜",
          imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course1.png",
        },

        {
          title: "火锅",
          imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course2.png",
        },

        {
          title: "西餐",
          imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course3.png",
        },

        {
          title: "粥粉面",
          imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course4.png",
        },
        {
          title: "湘菜",
          imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course1.png",
        },

        {
          title: "火锅",
          imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course2.png",
        },

        {
          title: "西餐",
          imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course3.png",
        },

        {
          title: "粥粉面",
          imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course4.png",
        },
      ]
    }

  }
}


let T;
export default {
  components: {},
  data() {

    return {
      data: PUB.dataSite.sys_chunqiu,
      cfItem: {
        formItems: [
          F_ITEMS.cfSchoolNews,
          F_ITEMS.cfNews2,
          F_ITEMS.cfBanner,
          F_ITEMS.cfCourse,
          F_ITEMS.cfTeacher,
          { label: "姓名", prop: "name", },
          { label: "年龄", prop: "age", },
        ],
      },
      data2: { name: "张三", age: 17, sex: { "prop": "xxx", "label": "xxx", "width": 70, "fixed": false, "edit": false } },
      cfItem2: {
        formItems: [
        ],

        cfForm: {
          col_span: 24,

        },

        // cfForm: {
        //   col_span: 24,
        //   formItems: [
        //     { label: "姓名xxs", prop: "name", },
        //     { label: "年龄", prop: "age", },
        //     { "prop": "__extend", "label": "拓展", "type": "jsonEditor" },
        //   ],
        //   btns: [
        //     { text: "新增", event: "submit", type: "primary", validate: true },
        //     { text: "关闭", event: "cancel" }
        //   ]
        // },
      },

    };
  },
  methods: {

  },
  beforeCreate() {
    T = this;
  },
  created() { },
  async mounted() { }
};
</script>

<style>
</style>
