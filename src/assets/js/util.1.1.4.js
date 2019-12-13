let WIN;
if (typeof (window) === "undefined") {//如果{000}000
    WIN = global;
} else {
    WIN = window;
}
WIN.PUB = WIN.PUB || {}
WIN.PUB.domain = "http://120.76.160.41:3000"
// WIN.PUB.domain = "http://localhost:3000"
//WIN.PUB.domain = 'http://test.dmagic.cn'
// WIN.PUB.urlUpload = `${PUB.domain}/api_third_part/qiniu_upload?scope=test`
WIN.PUB.urlUpload = `https://up-z2.qiniup.com`//七牛云上传地址（域名）
WIN.PUB.urlGetQiniuToken = `${PUB.domain}/api_third_part/get_qiniu_token?scope=dmagic`
WIN.util = {}

//#region 从dmagic-util.js迁移过来
//#region encodeHtml:html转义函数
util.encodeHtml = function (str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&/g, "&amp;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/ /g, "&nbsp;");
    s = s.replace(/\'/g, "&#39;");
    s = s.replace(/\"/g, "&quot;");
    s = s.replace(/\n/g, "<br/>");
    return s;
}
//#endregion
//#region decodeHtml:html反转义函数
util.decodeHtml = function (str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&amp;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    s = s.replace(/<br\/>/g, "\n");
    return s;
};
//#endregion

//#region parseParam:将json转成url参数形式函数[全局]
var parseParam = function (param, key1) {
    //函数：{将json转成url参数形式}-递归
    var paramStr = "";
    if (typeof param == "string" || typeof param == "number" || typeof param == "boolean") {
        //Q1：{参数类型}是字符串，数字或布尔
        paramStr += "&" + key1 + "=" + encodeURIComponent(param);
    } else {
        //Q2：{参数类型}是数组或对象
        for (var key in param) {
            var k = key1 == null ? key : key1 + (param instanceof Object ? "[" + key + "]" : "." + key);
            //if (param[key]) {
            //如果{key}存在
            paramStr += "&" + parseParam(param[key], k);
            // }
        }
    }
    return paramStr.substr(1);
};
//#endregion
//#region getAPI:get调用api函数[全局]
//函数定义：{get调用api函数}
var getAPI = function (_param) {
    var promise = new Promise((resolve, reject) => {
        _param.param = _param.param || {};
        var paramAdd = parseParam(_param.param);
        var ajaxUrl = _param.url;
        ajaxUrl += "?" + paramAdd; //*****变量赋值：{将参数拼接到url}
        axios.get(ajaxUrl, {}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
    return promise;
};
//#endregion
//#region postAPI:post调用api函数[全局]
var postAPI = function (_param) {
    var promise = new Promise((resolve, reject) => {
        _param.param = _param.param || {};
        var ajaxUrl = _param.url;
        axios.post(ajaxUrl, _param.param).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
    return promise;
};
//#endregion
//#region getAllUrlParame:获取所有url参数Json的函数[全局]
function getAllUrlParame(_json) {//函数定义：{获取所有url参数Json的函数}
    _json = _json || {};
    _json.url = _json.url || WIN.location.href;
    var url1 = _json.url.split('#')[0]; //变量定义：{url(去掉井号后续部分)}
    var jsonParameOld = {};//变量定义：{存储已有参数的Json}
    var urlOldParame = url1.split('?')[1];//变量定义：{参数部分字符串}
    if (urlOldParame) {//如果{参数部分字符串}存在，
        var arr1 = urlOldParame.split("&");//变量定义：{存储已有参数的数组}
        var length = arr1.length;
        for (var i = 0; i < length; i++) {//循环，将已有参数存储到jsonParameOld
            var arr1C = arr1[i].split('=');
            jsonParameOld[arr1C[0]] = arr1C[1];
        }
    }
    return jsonParameOld;
}
//#endregion


//#region 【废弃】propsync:vue组件的混合对象
/**
 * =================说明==================
 * propsync：vue组件的混合对象，主要用于组件编写时混入调用。
 *
 * 【主要功能】
 * 1、实现了在组件内自动创建所有prop对应的data属性，方便组件内修改prop使用。解决了vue2.0中不允许组件内直接修改prop的设计。
 * 2、实现了组件外修改组件prop，组件内自动同步修改到data属性。
 * 3、实现了组件内修改了data属性（由prop创建的），自动向组件外发出事件通知有内部prop修改。由组件外决定是否要将修改同步到组件外
 *
 * 【使用方法】
 * 1、编写组件：在选项对象中增加 mixins:[propsync]即可，无需其他修改
 * 2、调用组件：在调用组件的templat处，增加一个事件监听 onPropsChange（可修改）,当组件内修改了props时会调用此函数，返回 修改prop名称，修改后值，修改前值
 *
 * 调用组件例：
 * <mycomponent :prop1="xxx" :prop2="xxx" @onPropsChange="change"></mycomponent>
 *
 * {
 *   methods:{
 *     change:function(propName,newVal,oldVal){
 *       this[propName]=newVal;
 *       console.log("组件mycomponent的" +propName+ "属性由" +oldVal+ "修改为了" +newVal);
 *     }
 *   }
 * }
 *
 * 【可配置忽略】
 * 默认情况下，调用了本mixin的组件，会实现组件定义的所有的props，创建对应data变量，绑定双向watch。
 * 若希望某个props不进行绑定（如仅纯展示型props），则可在那个props中增加propsync:false(可配置)来忽略，默认所有props均为true
 * 例：
 * props:{
 *   xxx:{
 *     type: String,
 *     default: "xxx",
 *     propsync: false//增加此props的属性，则本mixin会忽略xxx
 *   }
 * }
 */
/**
 * 【配置】
 * 当在组件内部修改了prop属性，对外emit发出的事件名称
 */
const emitPropsChangeName = "on-props-change";
/**
 * 【配置】
 * 可在组件属性中定义当前props是否参加本mixin实现双向绑定。
 */
const isEnableName = "propsync";
/**
 * 【配置】
 * 根据prop的名称生成对应的data属性名，可自行修改生成后的名称。
 * 默认为在prop属性名前面增加"p_"，即若prop中有字段名为"active"，则自动生成名为"p_active"的data字段
 *
 * @param {string} propName 组件prop字段名称
 * @returns {string} 返回生成的data字段名
 */
function getDataName(propName) {
    //注意：映射后名称不能以 $ 或 _ 开头，会被vue认定为内部属性！！
    return "p_" + propName;
}
var propsync = {
    //修改data，自动生成props对应的data字段
    data: function () {
        var data = {};
        var that = this;
        /** 所有组件定义的props名称数组 */
        var propsKeys = Object.keys((that.$options.props) || {});
        propsKeys.forEach(function (prop, i) {
            var dataName = getDataName(prop);
            var isEnable = that.$options.props[prop][isEnableName];
            isEnable = (typeof isEnable === "boolean") ? isEnable : true;
            if (!isEnable)
                return;
            //若使用mixins方法导入本代码，则本函数会 先于 组件内data函数执行！
            data[dataName] = that[prop];
        });
        return data;
    },
    created: function () {
        var that = this;
        /** 所有 取消props的watch监听函数 的数组 */
        var unwatchPropsFnArr = [];
        /** 所有 取消data的watch监听函数 的数组 */
        var unwatchDataFnArr = [];
        /** 所有组件定义的props名称数组 */
        var propsKeys = Object.keys((that.$options.props) || {});
        propsKeys.forEach(function (prop, i) {
            var dataName = getDataName(prop);
            var isEnable = that.$options.props[prop][isEnableName];
            isEnable = (typeof isEnable === "boolean") ? isEnable : true;
            if (!isEnable)
                return;
            //监听所有props属性
            var propsFn = that.$watch(prop, function (newVal, oldVal) {
                that[dataName] = newVal; //将组件外变更的prop同步到组件内的p_prop变量中
            }, {});
            unwatchPropsFnArr.push(propsFn);
            //[监听所有属性映射到组件内的变量]
            var dataFn = that.$watch(dataName, function (newVal, oldVal) {
                console.log("监听所有属性映射到组件内的变量@###########");
                that.$emit(emitPropsChangeName, prop, newVal, oldVal); //将组件内p_prop通知给组件外(调用方)
            }, {});
            unwatchDataFnArr.push(dataFn);
        });
    },
    destroyed: function () {
    }
};
//博客园 @xxcanghai @小小沧海 
//#endregion
//#region space:自定义空行组件
// 自定义空行组件
Vue.component('space', {
    template: `<p class=" OF2 CL1 " :style='"height:"+height+"px"'></p>`,
    props: {
        height: {
            type: String,
            default: 10
        }
    },
    data() {
        return {
            //  showFlag: this.show,
        };
    },
    methods: {
    },
    created() {
    }
})
//#endregion
//#region dialog-normal:普通弹窗组件
let templateDialogNormal = `
<div class="" v-if="showDialogFlag">
<div class=" dialogCover" :style="'z-index:'+zIndex+';'" ></div>
<div class="  dialogMain FM2 " :style='"width:"+width+"px;"+"height:"+height+"px;"+"z-index:"+zIndex+";"'>
        <div class="dialog-title-bar"> <span class="dialog-title MT11 FM2">{{title}}</span> <span class="dialog-btn-close F2 MT2 MR2" @click="closeDialog">×</span> </div>
        <div style="padding: 20px;" class="dialogInner" :style='"height:"+(height-100)+"px;"'>
<slot></slot>
        </div>
        <div style="text-align: center"> <button type="button" class="btn btn-primary" @click="confirmFun" >确认</button> <button type="button" class="btn btn-primary" @click="closeDialog">关闭</button> </div>
    </div>
</div>
`;
// 普通弹窗组件
Vue.component('dialog-normal', {
    template: templateDialogNormal,
    mixins: [propsync], //声明使用propsync的mixin
    props: {
        title: {
            type: String,
            default: "默认弹窗标题",
            propsync: false//不会被propsync实现双向绑定
        },
        width: {
            type: Number,
            default: 600,
            propsync: false//不会被propsync实现双向绑定
        },
        height: {
            type: Number,
            default: 400,
            propsync: false//不会被propsync实现双向绑定
        },
        confirm: {
            type: Function,
            propsync: false//不会被propsync实现双向绑定
        },
        show: {
            type: Boolean,
            default: true,
        }
    },
    data() {
        return {
            zIndex: 100
            //  showFlag: this.show,
        };
    },
    computed: {
        showDialogFlag: function () {
            WIN.PUB.dialogZIndex = WIN.PUB.dialogZIndex || 2500;
            WIN.PUB.dialogZIndex++;
            this.zIndex = WIN.PUB.dialogZIndex
            console.log("computed-this.show1", this.show);
            return this.p_show
        },
    },
    watch: {
        // aaa: function(curVal, oldVal) {
        // }
    },
    methods: {
        async confirmFun(e) { //函数：{确认弹窗}
            if (this.confirm) { //如果{确认函数}存在
                this.confirm();
            }
        },
        closeDialog(e) { //函数：{关闭弹窗}
            this.p_show = false;
        }
    },
    created() {
    },
    mounted() {
    }
})
//#endregion
//#region loading:loading组件

// loading组件
Vue.component('loading', {
    template: `
<div class="loading-box" :style="{'height':height+'px','line-height':height+'px','color':color,'text-align':'center'}">
加载中
<i class="el-icon-loading FS16"></i>
</div>
`,
    props: {
        text: {
            type: [String],
            default: "加载中",
        },
        height: {
            type: [String, Number],
            default: "100",
        },
        color: {
            type: [String, Number],
            default: "#999",
        }
    },
})
//#endregion

//#region Vuex
if (WIN.Vuex) {//如果{Vuex}存在
    WIN.store = new Vuex.Store({//定义Vuex的存储对象
        state: {
            debug: false,
            activeMenuIndex: "",//当前激活的菜单index
            listState: {//存放列表的共享状态，
            },
            defultFindJson: {//存放列表的默认查询参数，
                // list_article:{articleCategory:3  }
            },
        },
        mutations: {//变更事件
            setDebug(state, param) {//设置debug模式
                state.debug = param;
            },
            setListFindJson(state, param) {//设置列表的初始筛选参数值
                state.defultFindJson[param.listIndex] = param.findJson;
                //对listState进行整个对象的变更（深拷贝），因为listState是有注册的，可以触发响应
                let str = JSON.stringify(state.defultFindJson)//对象转换成字符串
                state.defultFindJson = JSON.parse(str)//字符串转换成对象
            },
            initListState(state, param) {//改变列表的初始状态值
                state.listState[param.listIndex] = param.objState;
                //对listState进行整个对象的变更（深拷贝），因为listState是有注册的，可以触发响应
                let str = JSON.stringify(state.listState)//对象转换成字符串
                state.listState = JSON.parse(str)//字符串转换成对象
            },
            changeActiveMenu(state, activeMenuIndex) {//改变聚焦菜单
                state.activeMenuIndex = activeMenuIndex
            },
            openDialogAdd(state, listIndex) {//打开新增弹窗事件
                state.listState[listIndex].isShowDialogAdd = true;
            },
            closeDialogAdd(state, listIndex) {//关闭新增弹窗事件
                state.listState[listIndex].isShowDialogAdd = false;
            },
            openDialogDetail(state, param) {//打开详情弹窗事件
                state.listState[param.listIndex].isShowDialogDetail = true;
                // state.listState[param.listIndex].tableDataDetail.forEach(doc => {
                //   //遍历详情弹窗的表格数据
                //   doc.itemValue = param.row[doc.field]; //修改itemValue
                // });
                state.listState[param.listIndex].row = param.row;//将行数据保存到vuex
            },
            closeDialogDetail(state, listIndex) {//关闭详情弹窗事件
                state.listState[listIndex].isShowDialogDetail = false;
            },
        }
    })
    Vue.prototype.$store = WIN.store//让vue实例中可访问$store
    document.onkeydown = e => {
        //绑定ctrl+D事件
        var keyCode = e.keyCode || e.which || e.charCode;
        var ctrlKey = e.ctrlKey || e.metaKey;
        if (ctrlKey && keyCode == 68) {
            console.log("ctrlKey", ctrlKey);
            console.log("keyCode", keyCode);
            // this.toggleDebug();//调用：{切换调试模式函数}
            let debug = WIN.store.state.debug;
            console.log("debug", debug);
            WIN.store.commit("setDebug", !debug);
            e.preventDefault(); //阻止默认事件
            return false;
        }
    };
}
//#endregion
//#region MIX:混合对象
util.MIX = {}
//表单字段组件配置
util.MIX.power = {
    methods: {
        getPower(_json) {//函数：{获取权限函数}
            if (!WIN.needPower) return true;
            let { page, operation, group } = _json;
            let power = WIN.PUB.rolePower;
            if (!power) {//如果没有权限变量，表示不需要权限设置
                return true
            }
            if (group) {//如果{000}000
                return lodash.get(power, `groupPower.${group}`);
            }
            if (page && operation) {//如果{000}000
                // let flag = power[page] && power[page][operation];
                let flag = lodash.get(power, `listPower.${page}.${operation}`);
                return flag;
            } else if (page) {
                return lodash.get(power, `listPower.${page}`) || lodash.get(power, `normalPagePower.${page}`);
            }
        },
    }, created() {
        if (!WIN.PUB.rolePower && localStorage.rolePower) {//公共权限数据变量不存在，从localStorage读取
            console.log("公共权限数据变量不存在，从localStorage读取");
            WIN.PUB.rolePower = JSON.parse(localStorage.rolePower)
        }
    }
}
//表单字段组件配置
util.MIX.form_item = {
    props: ["value"],
    data() {
        return {
            valueNeed: this.value
        };
    },
    watch: {
        valueNeed: {
            handler(newVal, oldVal) {
                this.$emit("input", this.valueNeed); //同步valueNeed值到value
            },
            // immediate: true,//组件初始化时立即执行一次变动
            deep: true //深度监听
        }
    },
}
WIN.MIX = util.MIX//WIN.MIX加入，兼容dmagic-components




//#region MIX:MIX混入-暂时废弃
let MIX = {};
//表单字段组件配置
MIX.form_item = {
    props: ["value"],
    data() {
        return {
            valueNeed: this.value
        };
    },
    watch: {//监听器，双向同步
        value: {
            handler(newVal, oldVal) {
                this.valueNeed = this.value
            },
            deep: true
        },
        valueNeed: {
            handler(newVal, oldVal) {
                this.$emit("input", this.valueNeed); //同步valueNeed值到value
            },
            // immediate: true,//组件初始化时立即执行一次变动
            deep: true //深度监听
        }
    },
}
// WIN.MIX = MIX;
//#endregion




//#endregion

//#endregion


//#region deepCopy:深拷贝函数
util.deepCopy = function (obj) {//深拷贝一个Json对象的函数
    return lodash.cloneDeep(obj);
}
//#endregion
//#region type:返回对象数据类型函数
let class2type = {},
    //用于记录[object class]样式  
    arrObjs = "Boolean Number String Function Array Date RegExp Null Undefined".split(" ");
for (var i = 0, l = arrObjs.length; i < l; i++) {
    class2type["[object " + arrObjs[i] + "]"] = arrObjs[i].toLowerCase();
}
util.type = function (obj) {
    return class2type[Object.prototype.toString.call(obj)] || "object";
};
//#endregion
//#region timeout:基于promise的延迟函数
util.timeout = function (ms) {//使用promise封装一个延迟方法
    return new Promise((resolve) => {//resolve延迟解决后的回调函数, reject延迟异常的处理函数
        setTimeout(resolve, ms, 'done');
    });
}
//#endregion
//#region getTimeStatus:获取时间段状态函数
/**
 * 
 * @param {开始时间} _json.startTime
 * @param {结束时间} _json.endTime
 *  @param {当前时间} _json.currTime
 */
util.getTimeStatus = function (param) {//
    let { start, end, now } = param;
    let flag = 2;
    let msg = "进行中";
    if (!(start && end)) {
        start = start || "——";
        end = end || "——";
        flag = 4;
        msg = "时间段设置有误，时间段不完整";
        return { flag, msg, start, end }
    }
    let fomatStr = "YYYY-MM-DD HH:mm";
    now = now || moment();
    now = moment(now).format(fomatStr);
    start = moment(start).format(fomatStr);
    end = moment(end).format(fomatStr);
    //先格式化才能正确比较大小
    if (start > end) {
        start = start || "——";
        end = end || "——";
        flag = 4;
        msg = "时间段设置有误，开始时间大于结束时间";
        return { flag, msg, start, end }
    }
    if (now < start) {//如果当前时间小于开始时间
        msg = "未开始";
        flag = 1;
    } else if (now > end) {//如果当前时间大于结束时间
        flag = 3;
        msg = "已结束";
    }
    return { flag, msg, start, end, now }
}
//#endregion
//#region ajaxPopulate:ajax填充数据列表的某个字段函数/可用于动态数据字典
util.ajaxPopulate = async function (populateConfig) {
    //补充ajax配置20191128
    let { ajax, listData, page, populateColumn, idColumn,
        idColumn2, findJson = {} } = populateConfig;
    let arrId = [];
    listData.forEach(itemEach => {//循环：{原数据数组}
        let idEach = itemEach[idColumn]
        if (idEach) {//如果{idEach}存在
            if (util.type(idEach) == "array") {//Q1:idEach是数组
                arrId = arrId.concat(idEach);//拼接
            } else {//Q2:idEach不是数组
                arrId.push(idEach);
            }
        }
    })
    arrId = Array.from(new Set(arrId))//去重
    let urlAjax = `/crossList?page=${page}`;
    let paramAjax = {
        pageSize: 999
    }
    if (ajax) {//如果{ajax配置}存在*****
        let { url, param = {} } = ajax
        urlAjax = url;
        Object.assign(paramAjax, param);//合并对象
    }
    //补充id数组过滤条件****
    lodash.set(paramAjax, `findJson.${idColumn2}`, {
        "$in": arrId, ...findJson
    });
    let { data } = await axios({
        //请求接口
        method: "post",
        url: WIN.PUB.domain + urlAjax,
        data: paramAjax //传递参数
    });
    var dict = lodash.keyBy(data.list, idColumn2)
    listData.forEach(itemEach => {//循环：{原数据数组}
        let idEach = itemEach[idColumn]
        if (idEach) {//如果{idEach}存在
            if (util.type(idEach) == "array") {//Q1:idEach是数组
                itemEach[populateColumn] = [];
                idEach.forEach(idOneEach => {//循环：{id数组}
                    itemEach[populateColumn].push(dict[idOneEach])
                })
            } else {//Q2:idEach不是数组
                itemEach[populateColumn] = dict[idEach]
            }
        }
    })
    return util.deepCopy(listData);//深拷贝，返回一个全新的对象
    //return listData
}
//#endregion
//#region stringify:json转字符串函数（含function处理）
util.stringify = function (_json) {//函数定义：{json转字符串函数（含function处理）}
    var strJson = JSON.stringify(_json, function (key, val) {
        if (typeof val === "function") {
            return val + ""; //将函数代码转换成字符串
        }
        return val;
    });
    return strJson
}
//#endregion
//#region parseJson:字符串转json函数（含function还原处理）
util.parseJson = function (str) {//函数定义：{字符串转json函数（含function还原处理）}
    //将带function字符串的还原成真正发function
    let json = JSON.parse(str, function (k, v) {
        if (v.indexOf && v.indexOf("function") > -1) {
            return eval("(function(){return " + v + " })()");
        }
        return v;
    });
    return json;
}
//#endregion
//#region moveData:数组元素上下移动函数
util.moveData = function (index, type, list) { //函数：{数据移动函数}-注意调用对象的KEY等配置
    list = list || this[this.KEY.arrRelate];//KEY配置相关数组
    let objIndex = {
        "up": index - 1,
        "down": index + 1,
        "top": 0,
        "bottom": list.length,
    }
    if ((type == "up" || type == "top") && index < 1) { //如果已到最上
        return alert("已到最上");
    } else if ((type == "down" || type == "bottom") && index >= list.length - 1) { //如果已到最上
        return alert("已到最底");
    }
    let doc = list[index]
    list.splice(index, 1); //先删除
    list.splice(objIndex[type], 0, doc); //再插入
};
//#endregion
//#region sortByArrId:根据id数组重排集合的函数
util.sortByArrId = function (param) {
    let { list, idKey = "P1", arrId } = param;
    if (!(list && list.length && arrId && arrId.length)) return list;
    var dict = lodash.keyBy(list, idKey); //转成数据字段，方便重排
    let arrNeed = arrId.map(id => dict[id]); //获取排序后的列表数据
    arrNeed = arrNeed.filter(doc => doc)//过滤null的数据
    return arrNeed; //获取排序后的列表数据
};
//#endregion
//#region toFixed/money:将数字转换成保留小数点，默认2位
util.toFixed = function (num, length = 2) {
    num = parseFloat(num);
    let result;
    if (isNaN(num) || num == 0 || num === undefined || num === null) {//结果为数字
        num = 0;
    }
    result = Number(num.toFixed(length));
    return result
}
util.money = util.toFixed;
//#endregion
//#region getTimeRandom:返回带时间戳的随机数
util.getTimeRandom = function () {
    return moment().format("YYYYMMDDHHmmSSsss_") + lodash.random(99999)
};
//#endregion
//#region handelItem:处理字段数组的某个字段配置的函数
util.handelItem = function (cf) {
    let { action, items, prop, itemNew, key = "prop" } = cf;
    if (!items) return;
    let index = items.findIndex(item => item[key] == prop);
    if (index < 0) return;//找不到目标，return
    if (action == "replace") {//Q1:replace
        this.$set(items, index, itemNew); //修改memberId对应的字段配置
    } else if (action == "delete") { //Q2:delete
        items.splice(index, 1)
    }
}
// 
//#endregion
//#region setListPower:根据当前角色权限设置列表配置的函数-需要用到WIN.rolePower变量
util.setListPower = function (cfList) {
    let { powerPath } = cfList;
    if (!powerPath) return cfList
    let hasPowerAdd = lodash.get(WIN.rolePower, `${powerPath}.add`);
    //如果没有新增权限
    if (!hasPowerAdd) {
        //删除新增按钮
        util.handelItem({ items: cfList.batchBtns.addon, action: "delete", key: "eventType", prop: "add" })
    }
    let hasPowerDelete = lodash.get(WIN.rolePower, `${powerPath}.delete`);
    //如果没有删除权限
    if (!hasPowerDelete) {
        //删除单项删除按钮
        util.handelItem({ items: cfList.singleBtns.addon, action: "delete", key: "eventType", prop: "delete" })
        //删除批量删除按钮
        util.handelItem({ items: cfList.batchBtns.addon, action: "delete", key: "eventType", prop: "delete" })
    }
    let hasPowerModify = lodash.get(WIN.rolePower, `${powerPath}.modify`);
    //如果没有修改权限
    if (!hasPowerModify) {
        //删除单选修改按钮
        util.handelItem({ items: cfList.singleBtns.addon, action: "delete", key: "eventType", prop: "modify" })
    }
    return cfList
};
//#endregion
//#region setLocalStorageObj:设置一个对象到LocalStorage函数
util.setLocalStorageObj = function (key, val) {
    if (util.type(val) == "array" || util.type(val) == "object") {//Q1:数据类型是数组活对虾
        val = JSON.stringify(val);//Json对象转换Json字符串
    }
    localStorage[key] = val
}
//#endregion
//#region getLocalStorageObj:从LocalStorage获取一个对象的函数
util.getLocalStorageObj = function (key) {
    if (!localStorage[key]) return false;
    return JSON.parse(localStorage[key]);//
}
//#endregion
//#region cfList:标准列表的一些配置项
util.cfList = {}
util.cfList.bBtns = {}
util.cfList.bBtns.add = {
    text: "新增",
    eventType: "add",
    cfElBtn: {
        type: "primary",
    }
}
util.cfList.bBtns.delete = {
    text: "删除选中",
    eventType: "delete",
    needSelect: true,
    cfElBtn: {}
}
util.cfList.sBtns = {}
util.cfList.sBtns.detail = {
    title: "详情",
    eventType: "detail",
    cfElBtn: {
        circle: true,
        icon: "el-icon-notebook-2"
    }
}
util.cfList.sBtns.modify = {
    title: "编辑",
    eventType: "modify",
    cfElBtn: {
        circle: true,
        icon: "el-icon-edit"
    }
}
util.cfList.sBtns.delete = {
    title: "删除",
    eventType: "delete",
    cfElBtn: {
        circle: true,
        icon: "el-icon-close"
    }
}
util.cfList.sBtns.copy = {
    title: "复制",
    eventType: "copy",
    cfElBtn: {
        circle: true,
        icon: "el-icon-document-copy"
    }
}
//#endregion
//#region setObjDefault:给一个对象设置默认属性（但不整个替换对象，并且默认属性优先级低于已有属性）
util.setObjDefault = function (obj, objDeault) {
    //for of循环遍历对象，for of不能直接处理对象，本质上是同个Object.keys拼装一个新数组进行辅助
    for (var key of Object.keys(objDeault)) {
        if (obj[key] === null || obj[key] === undefined) {//如果属性不存在
            obj[key] = objDeault[key]
        }
    }
}
//#endregion
//#region setObj:拓展vue实例的data数据函数
util.setObj = function (path, extend) {
    let objOld = lodash.get(this, path);
    let objNew = lodash.cloneDeep(objOld);
    if (objNew === null || objNew === undefined) {//如果{000}000
        objNew = {}
    }
    Object.assign(objNew, extend);//合并对象
    lodash.set(this, path, objNew);
}
//#endregion

//#region searchCollection:查询静态集合列表函数（支持模糊查询）
util.searchCollection = function (param = {}) {
    let { findJson = {}, dataBase } = param;
    let paramVague = {};//模糊查询参数
    let paramEqual = {};//等值查询参数
    for (var prop in findJson) {
        let pEach = findJson[prop];
        if (pEach && pEach["$regex"]) {//如果带正则
            paramVague[prop] = pEach["$regex"];
        } else if (!(pEach == undefined || pEach == null)) {
            paramEqual[prop] = pEach
        }
    }
    //第1步，先处理等值查询
    let result = lodash.filter(dataBase, paramEqual);
    //第2步，处理模糊查询
    let searchResult = lodash.filter(result, function (doc) {
        let flag = true;
        for (var prop in paramVague) {
            let flagEach;
            if (doc[prop]) {
                //如果对象的属性值存在
                flagEach = doc[prop].includes(paramVague[prop]);
            } else {
                flagEach = false;
            }
            flag = flag && flagEach;
        }
        return flag;
    });
    return searchResult
};
//#endregion





Vue.prototype.$util = util//让vue实例中可访问$util
Vue.prototype.$lodash = lodash//让vue实例中可访问$util

