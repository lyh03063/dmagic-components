let WIN;
if (typeof (window) === "undefined") { //如果window不存在
    WIN = global;
} else {
    WIN = window;
}
WIN.PUB = WIN.PUB || {}

if (typeof (lodash) === "undefined") { //如果{000}000
    WIN.lodash = _; //ladash加入全局变量
} else {
    WIN.lodash = lodash; //ladash加入全局变量
}

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
function getAllUrlParame(_json) { //函数定义：{获取所有url参数Json的函数}
    _json = _json || {};
    _json.url = _json.url || WIN.location.href;
    var url1 = _json.url.split('#')[0]; //变量定义：{url(去掉井号后续部分)}
    var jsonParameOld = {}; //变量定义：{存储已有参数的Json}
    var urlOldParame = url1.split('?')[1]; //变量定义：{参数部分字符串}
    if (urlOldParame) { //如果{参数部分字符串}存在，
        var arr1 = urlOldParame.split("&"); //变量定义：{存储已有参数的数组}
        var length = arr1.length;
        for (var i = 0; i < length; i++) { //循环，将已有参数存储到jsonParameOld
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
                that.$emit(emitPropsChangeName, prop, newVal, oldVal); //将组件内p_prop通知给组件外(调用方)
            }, {});
            unwatchDataFnArr.push(dataFn);
        });
    },
    destroyed: function () { }
};
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
    methods: {},
    created() { }
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
            propsync: false //不会被propsync实现双向绑定
        },
        width: {
            type: Number,
            default: 600,
            propsync: false //不会被propsync实现双向绑定
        },
        height: {
            type: Number,
            default: 400,
            propsync: false //不会被propsync实现双向绑定
        },
        confirm: {
            type: Function,
            propsync: false //不会被propsync实现双向绑定
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
    created() { },
    mounted() { }
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
if (WIN.Vuex) { //如果{Vuex}存在
    WIN.store = new Vuex.Store({ //定义Vuex的存储对象
        state: {
            debug: false,
            activeMenuIndex: "", //当前激活的菜单index
            listState: { //存放列表的共享状态，
            },
            defultFindJson: { //存放列表的默认查询参数，
                // list_article:{articleCategory:3  }
            },
        },
        mutations: { //变更事件
            setDebug(state, param) { //设置debug模式
                state.debug = param;
            },
            setListFindJson(state, param) { //设置列表的初始筛选参数值
                state.defultFindJson[param.listIndex] = param.findJson;
                //对listState进行整个对象的变更（深拷贝），因为listState是有注册的，可以触发响应
                let str = JSON.stringify(state.defultFindJson) //对象转换成字符串
                state.defultFindJson = JSON.parse(str) //字符串转换成对象
            },
            initListState(state, param) { //改变列表的初始状态值
                state.listState[param.listIndex] = param.objState;
                //对listState进行整个对象的变更（深拷贝），因为listState是有注册的，可以触发响应
                let str = JSON.stringify(state.listState) //对象转换成字符串
                state.listState = JSON.parse(str) //字符串转换成对象
            },
            changeActiveMenu(state, activeMenuIndex) { //改变聚焦菜单
                state.activeMenuIndex = activeMenuIndex
            },

            openDialogDetail(state, param) { //打开详情弹窗事件
                state.listState[param.listIndex].isShowDialogDetail = true;
                // state.listState[param.listIndex].tableDataDetail.forEach(doc => {
                //   //遍历详情弹窗的表格数据
                //   doc.itemValue = param.row[doc.field]; //修改itemValue
                // });
                state.listState[param.listIndex].row = param.row; //将行数据保存到vuex
            },
            closeDialogDetail(state, listIndex) { //关闭详情弹窗事件
                state.listState[listIndex].isShowDialogDetail = false;
            },
        }
    })
    Vue.prototype.$store = WIN.store //让vue实例中可访问$store
    document.onkeydown = e => {
        //绑定ctrl+D事件
        var keyCode = e.keyCode || e.which || e.charCode;
        var ctrlKey = e.ctrlKey || e.metaKey;
        if (ctrlKey && keyCode == 68) {
            // this.toggleDebug();//调用：{切换调试模式函数}
            let debug = WIN.store.state.debug;
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
        getPower(_json) { //函数：{获取权限函数}
            if (!WIN.needPower) return true;
            let { page, operation, group } = _json;
            let power = WIN.PUB.rolePower;
            if (!power) { //如果没有权限变量，表示不需要权限设置
                return true
            }
            if (group) { //如果{000}000
                return lodash.get(power, `groupPower.${group}`);
            }
            if (page && operation) { //如果{000}000
                // let flag = power[page] && power[page][operation];
                let flag = lodash.get(power, `listPower.${page}.${operation}`);
                return flag;
            } else if (page) {
                return lodash.get(power, `listPower.${page}`) || lodash.get(power, `normalPagePower.${page}`);
            }
        },
    },
    created() {
        if (!WIN.PUB.rolePower && localStorage.rolePower) { //公共权限数据变量不存在，从localStorage读取
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

//表单字段组件配置【新】-内外同步，但要注意，可能死循环！！！！尤其是对象/数组结构需要改造的时候
//
util.MIX.form_item_new = {
    props: ["value"],
    data() {
        return {
            valueNeed: this.value
        };
    },
    watch: { //监听器，双向同步
        value: {
            handler(newVal, oldVal) {
                console.log(`【form_item_new】的value变动`);
                this.valueNeed = this.value
            },
            deep: true
        },
        valueNeed: {
            handler(newVal, oldVal) {
                console.log(`【form_item_new】的valueNeed变动`);
                this.$emit("input", this.valueNeed); //同步valueNeed值到value
            },
            // immediate: true,//组件初始化时立即执行一次变动
            deep: true //深度监听
        }
    },
}

WIN.MIX = util.MIX //WIN.MIX加入，兼容dmagic-components
//#region MIX:MIX混入-暂时废弃
// let MIX = {};

// WIN.MIX = MIX;
//#endregion
//#endregion
//#endregion
//#region deepCopy:深拷贝函数
util.deepCopy = function (obj) { //深拷贝一个Json对象的函数
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
util.timeout = function (ms) { //使用promise封装一个延迟方法
    return new Promise((resolve) => { //resolve延迟解决后的回调函数, reject延迟异常的处理函数
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
util.getTimeStatus = function (param) { //
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
    if (now < start) { //如果当前时间小于开始时间
        msg = "未开始";
        flag = 1;
    } else if (now > end) { //如果当前时间大于结束时间
        flag = 3;
        msg = "已结束";
    }
    return { flag, msg, start, end, now }
}
//#endregion
//#region ajaxPopulate:ajax填充数据列表的某个字段函数/可用于动态数据字典
util.ajaxPopulate = async function (populateConfig) {
    //补充ajax配置20191128
    let { ajax, listData, page, populateColumn, idColumn, idColumn2, findJson = {} } = populateConfig;
    let arrId = [];
    listData.forEach(itemEach => { //循环：{原数据数组}
        let idEach = itemEach[idColumn]
        if (idEach) { //如果{idEach}存在
            if (util.type(idEach) == "array") { //Q1:idEach是数组
                arrId = arrId.concat(idEach); //拼接
            } else { //Q2:idEach不是数组
                arrId.push(idEach);
            }
        }
    })
    arrId = Array.from(new Set(arrId)) //去重
    if (!arrId.length) return listData;//没有arrId,就不要再发送请求，节省性能
    let urlAjax = `/crossList?page=${page}`;
    let paramAjax = { pageSize: 999 }
    if (ajax) { //如果{ajax配置}存在*****
        let { url, param = {} } = ajax
        urlAjax = url;
        Object.assign(paramAjax, param); //合并对象
    }
    //补充id数组过滤条件****
    lodash.set(paramAjax, `findJson.${idColumn2}`, { "$in": arrId, ...findJson });


    //调用：{给一个对象设置默认属性函数}-加入全局公共参数
    util.setObjDefault(paramAjax, PUB._paramAjaxAddon);


    let { data } = await axios({ //请求接口
        method: "post", url: `${WIN.PUB.domain}${urlAjax}`, data: paramAjax //传递参数
    });
    var dict = lodash.keyBy(data.list, idColumn2)
    listData.forEach(itemEach => { //循环：{原数据数组}
        let idEach = itemEach[idColumn]
        if (idEach) { //如果{idEach}存在
            if (util.type(idEach) == "array") { //Q1:idEach是数组
                itemEach[populateColumn] = [];
                idEach.forEach(idOneEach => { //循环：{id数组}
                    itemEach[populateColumn].push(dict[idOneEach])
                })
            } else { //Q2:idEach不是数组
                itemEach[populateColumn] = dict[idEach]
            }
        }
    })
    return util.deepCopy(listData); //深拷贝，返回一个全新的对象
    //return listData
}
//#endregion
//#region stringify:json转字符串函数（含function处理）
util.stringify = function (_json) { //函数定义：{json转字符串函数（含function处理）}
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
util.parseJson = function (str) { //函数定义：{字符串转json函数（含function还原处理）}
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
    list = list || this[this.KEY.arrRelate]; //KEY配置相关数组
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
    arrNeed = arrNeed.filter(doc => doc) //过滤null的数据
    return arrNeed; //获取排序后的列表数据
};
//#endregion
//#region toFixed/money:将数字转换成保留小数点，默认2位
util.toFixed = function (num, length = 2) {
    num = parseFloat(num);
    let result;
    if (isNaN(num) || num == 0 || num === undefined || num === null) { //结果为数字
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

//#region getTimeStamp:获取当前的时间戳
util.getTimeStamp = function () {
    return Math.round(new Date().getTime() / 1000)
};
//#endregion


//#region handelItem:处理字段数组的某个字段配置的函数
util.handelItem = function (cf) {
    let { action, items, prop, itemNew, key = "prop" } = cf;
    if (!items) return;
    let index = items.findIndex(item => item[key] == prop);
    if (index < 0) return; //找不到目标，return
    if (action == "replace") { //Q1:replace
        this.$set(items, index, itemNew); //修改memberId对应的字段配置
    } else if (action == "delete") { //Q2:delete
        items.splice(index, 1)
    } else if (action == "merge") { //Q3:merge合并
        // let itemNew=Object.assign(items[index],itemNew);//合并对象
        itemNew = { ...items[index], ...itemNew }
        this.$set(items, index, itemNew); //修改memberId对应的字段配置
    }
}
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

    let hasPowerCopy = lodash.get(WIN.rolePower, `${powerPath}.copy`);
    //如果没有修改权限
    if (!hasPowerCopy) {
        //删除单选修改按钮
        util.handelItem({ items: cfList.singleBtns.addon, action: "delete", key: "eventType", prop: "copy" })
    }

    let hasPowerSort = lodash.get(WIN.rolePower, `${powerPath}.sort`);
    //如果没有排序权限
    if (!hasPowerSort) {
        //删除单选修改按钮
        util.handelItem({ items: cfList.singleBtns.addon, action: "delete", key: "eventType", prop: "up" })
        util.handelItem({ items: cfList.singleBtns.addon, action: "delete", key: "eventType", prop: "down" })
        util.handelItem({ items: cfList.singleBtns.addon, action: "delete", key: "eventType", prop: "top" })
        util.handelItem({ items: cfList.singleBtns.addon, action: "delete", key: "eventType", prop: "bottom" })
    }

    return cfList
};
//#endregion
//#region setLocalStorageObj:设置一个对象到LocalStorage函数
util.setLocalStorageObj = function (key, val) {
    if (util.type(val) == "array" || util.type(val) == "object") { //Q1:数据类型是数组活对虾
        val = JSON.stringify(val); //Json对象转换Json字符串
    }
    localStorage[key] = val
}
//#endregion
//#region getLocalStorageObj:从LocalStorage获取一个对象的函数
util.getLocalStorageObj = function (key) {
    if (!localStorage[key]) return false;
    if (localStorage[key]) {//Q1:对应的存储变量存在
        return JSON.parse(localStorage[key]); //
    } else { //Q2:对应的存储变量不存在
        return {error:"没有获取对应的localStorage"}
    }

}
//#endregion


//#region extendLocalStorageObj:拓展一个LocalStorage对象的函数
util.extendLocalStorageObj = function (key, extend) {
    let obj = util.getLocalStorageObj(key) || {}
    Object.assign(obj, extend);//合并对象
    util.setLocalStorageObj(key, obj)//调用：{设置一个对象到LocalStorage}
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


util.cfList.bBtns.refresh = {
    text: "刷新",
    eventType: "refresh",
    cfElBtn: {
        icon: "el-icon-refresh"
    }
}
util.cfList.bBtns.exportExcel = {
    text: "导出Excel",
    eventType: "export_excel",
}
//变量：{分组数据列表的新增按钮}
util.cfList.bBtns.addEntity = {
    text: "新增并引用",
    eventType: "add_entity",
    cfElBtn: {
        type: "primary",
    }
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
util.cfList.sBtns.up = {
    title: "上移",
    eventType: "up",
    cfElBtn: {
        circle: true,
        icon: "el-icon-top"
    }
};
util.cfList.sBtns.down = {
    title: "下移",
    eventType: "down",
    cfElBtn: {
        circle: true,
        icon: "el-icon-bottom"
    }
};
util.cfList.sBtns.top = {
    title: "置顶",
    eventType: "top",
    cfElBtn: {
        circle: true,
        icon: "el-icon-top",
        class: "sort-top-bottom"
    }
};
util.cfList.sBtns.bottom = {
    title: "置底",
    eventType: "bottom",
    cfElBtn: {
        circle: true,
        icon: "el-icon-bottom",
        class: "sort-top-bottom"
    }
};
//变量：{查看实体数据详情按钮}
util.cfList.sBtns.detailEntity = {
    uiType: "link",
    text: "查看详情",
    target: "_blank",
    //地址格式函数
    urlFormatter: function (row) {
        return `#/detail_data?dataId=${row._idRel2}`;
    },
};
util.cfList.sBtns.copyEntity = {
    title: "复制实体",
    eventType: "copy_entity",
    cfElBtn: {
        circle: true,
        icon: "el-icon-document-copy"
    }
}



util.cfList.sBtns.linkGroup = {
    uiType: "link",
    text: "查看分组",
    target: "_blank",
    //地址格式函数
    urlFormatter: function (row) {
        return `#/detail_group?groupId=${row._idRel2}`;
    },
}

util.cfList.sBtns.link = {
    uiType: "link",
    text: "打开链接",
    title: "打开链接",
    target: "_blank",
    urlFormatter: function (row) {
        return `${row.link}`;
    },
    cfElBtn: {
        circle: true,
        icon: "el-icon-link"
    }
}




util.cfList.sBtns.download = {
    uiType: "link",
    title: "下载文件",
    text: "下载文件",
    target: "_blank",
    //地址格式函数
    urlFormatter: function (row) {
        let url = lodash.get(row, `file[0].url`, "");
        return `${url}?download`;
    },

}


util.cfList.sBtns.openFile = {
    uiType: "link",
    title: "打开文件",
    text: "打开文件",
    target: "_blank",
    //地址格式函数
    urlFormatter: function (row) {
        let url = lodash.get(row, `file[0].url`, "");
        return `${url}`;
    },

}





//所有的标准版单项按钮数组
util.cfList.sBtns.arrAllBtns = [util.cfList.sBtns.detail, util.cfList.sBtns.modify, util.cfList.sBtns.copy, util.cfList.sBtns.delete]
//排序按钮数组
util.cfList.sBtns.arrSortBtns = [util.cfList.sBtns.up, util.cfList.sBtns.down, util.cfList.sBtns.top, util.cfList.sBtns.bottom]
//#endregion
//#region setObjDefault:给一个对象设置默认属性（但不整个替换对象，并且默认属性优先级低于已有属性）
util.setObjDefault = function (obj, objDeault) {
    //for of循环遍历对象，for of不能直接处理对象，本质上是同个Object.keys拼装一个新数组进行辅助
    for (var key of Object.keys(objDeault)) {
        if (obj[key] === null || obj[key] === undefined) { //如果属性不存在
            obj[key] = objDeault[key]
        }
    }
}
//#endregion
//#region setObj:拓展vue实例的data数据函数
util.setObj = function (path, extend) {
    let objOld = lodash.get(this, path);
    let objNew = lodash.cloneDeep(objOld);
    if (objNew === null || objNew === undefined) { //如果{000}000
        objNew = {}
    }
    Object.assign(objNew, extend); //合并对象
    lodash.set(this, path, objNew);
}
//#endregion
//#region searchCollection:查询静态集合列表函数（支持模糊查询）
util.searchCollection = function (param = {}) {
    let { findJson = {}, dataBase } = param;
    let paramVague = {}; //模糊查询参数
    let paramEqual = {}; //等值查询参数
    for (var prop in findJson) {
        let pEach = findJson[prop];
        if (pEach && pEach["$regex"]) { //如果带正则
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
//#region isNotEmptyArr:判断是否为非空数组的函数
util.isNotEmptyArr = function (arr) { //函数：{判断是否为非空数组}
    let type = util.type(arr); //变量：{类型}
    if (type !== "array") { //如果不是数组
        return false
    }
    return !!arr.length;
};
//#endregion
//#region isNotEmptyObj:判断是否为非空对象的函数
util.isNotEmptyObj = function (obj) {
    var arr = Object.keys(obj);
    return !!arr.length;
};
//#endregion

//#region countProp:返回对象的属性数的函数
util.countProp = function (obj) {
    var arr = Object.keys(obj);
    return arr.length;
};
//#endregion

//#region clearObj:清除对象中的空属性（null,undefined,空格等）
util.clearObj = function (obj) {
    let arrSpec = ["", null, undefined];
    for (var prop in obj) {
        //如果属性值是特殊的空值，删除属性
        if (arrSpec.includes(obj[prop])) {
            delete obj[prop];
        }
    }
};
//#endregion

//#region clearArr:清除数组中的null,undefined,空格等
util.clearArr = function (arr) {
    var arrSpec = ["", null, undefined];
    return arr.filter(item => !arrSpec.includes(item))

};
//#endregion

//#region ajaxGroupDataSort:调用分组数据排序接口的函数
util.ajaxGroupDataSort = async function (actionType, doc) {
    let { _id } = doc;
    //***获取系统id,注意优先级
    let _systemId= lodash.get(PUB, `_paramAjaxAddon._systemId`,PUB._systemId);
    await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/info/groupDataSort`,
        data: { _systemId, _id, actionType } //传递参数
    });
};
//#endregion
//#region setCookie:cookie中存值函数
util.setCookie = function ({ key, value, cookie }) {
    if (!cookie) { //如果cookie串没有指定
        cookie = document.cookie
    }
    if (value) {
        var days = 1; //定义一天
        var exp = new Date();
        exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
        // 写入Cookie, toGMTString将时间转换成字符串
        cookie = key + "=" + escape(value) + ";expires=" + exp.toGMTString;
    }
    return cookie
};
//#endregion
//#region getCookie: cookie中取值函数
util.getCookie = function ({ key, cookie }) {
    if (!cookie) { //如果cookie串没有指定
        cookie = document.cookie
    }
    var arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)"); //匹配字段
    if (arr = cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        return null;
    }
};
//#endregion
//#region delCookie :删除cookie函数
util.delCookie = function ({ key, cookie }) {
    if (!cookie) { //如果cookie串没有指定
        cookie = document.cookie
    }
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = setCookie(name);
    if (cval && cval != null) {
        document.cookie = key + "=" + cval + ";expires=" + exp.toGMTString()
    }
};
//#endregion
//#region longting-nuxt站点新增公共函数
//函数：{处理分组数据列表数据函数}-使之适用于列表渲染
util.handleGDataList = function (list) {
    return list.map(doc => {
        return {
            _id: lodash.get(doc, `targetDoc._id`),
            title: lodash.get(doc, `targetDoc.title`),
            link: lodash.get(doc, `targetDoc.link`),
            alias: lodash.get(doc, `targetDoc.alias`),
            imgSrc: lodash.get(doc, `targetDoc.album[0].url`),
            priceMarket: lodash.get(doc, `targetDoc.priceMarket`),
            priceSell: lodash.get(doc, `targetDoc.priceSell`),
            priceSellSection: lodash.get(doc, `targetDoc.priceSellSection`)
        };
    });
};
//函数：{根据别名获取子分组数据列表的函数}-更稳定的定位方式
util.getSonListByAlias = function ({ list, alias }) {
    console.log("list:", list);
    console.log("alias:", alias);
    let obj = list.find(doc => doc.targetDoc.alias == alias);
    if (!obj) return [];
    return util.handleGDataList(obj.sonList); //调用：{处理列表数据函数}
};
//#endregion



//#region inWX:判断是否处于微信浏览器内函数
util.inWX = function () {
    let ua = window.navigator.userAgent.toLowerCase();
    let flag = ua.indexOf("micromessenger") != -1; //变量：{是否在微信浏览器}
    return flag
};
//#endregion


//#region callWXPay:调用网页微信支付控件的函数-promise化
util.callWXPay = function (param) {
    var promise = new Promise((resolve, reject) => {
        function onBridgeReady() {
            console.log("onBridgeReady");
            let paramCall = { signType: "MD5", ...param };
            //唤起微信支付控件！！
            WeixinJSBridge.invoke("getBrandWCPayRequest", paramCall, function (res) {
                resolve(res);

            });
        }
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);
            } else if (document.attachEvent) {
                document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
                document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
            }
        } else {
            onBridgeReady();
        }
    });

    return promise;
};
//#endregion

//#region combination:返回多个数组的排列组合结果数组函数
util.combination = function (arr) {
    arr.reverse(); //反转
    //函数：{递归排列组合函数}
    function combine(arr) {
        var r = [];
        (function f(t, a, n) {
            if (n == 0) return r.push(t);
            for (var i = 0; i < a[n - 1].length; i++) {
                f(t.concat(a[n - 1][i]), a, n - 1);
            }
        })([], arr, arr.length);
        return r;
    }

    return combine(arr)
};
//#endregion

//#region isNullUndefined:判断是否为null或undefind函数
util.isNullUndefined = function (param) {
    return param === null || param === undefined
};

//#endregion


//#region console控制台强化
if (typeof (console) !== "undefined") { //如果window不存在
    //函数：{控制台打印转字符串函数}
    console.logs = function (s) {
        // console.log(arguments);
        let arrAg = Array.from(arguments); //伪数组转数组
        arrAg = arrAg.map(agm => {
            let type = util.type(agm); //变量：{类型}
            if (type !== "string") {
                //如果不是字符串，转成字符串
                agm = util.stringify(agm);
            }
            return agm;
        });
        console.log(...arrAg);
    };
}
//#endregion


//函数：{获取商品价格(区间)的函数}-可能存在多个价格
util.getGoodsPrice = function (docGoods) {
    let priceSpec;
    if (!docGoods.listSpecPrice) return docGoods.priceSell;
    let arrPrice = docGoods.listSpecPrice.map(doc => {
        let { price } = doc;
        if (util.isNullUndefined(price)) {
            //如果未设置价格
            price = docGoods.priceSell || 0;
        }
        return price;
    });
    let minPrice = Math.min(...arrPrice);
    let maxPrice = Math.max(...arrPrice);
    priceSpec = `${minPrice} ~ ${maxPrice}`;
    if (minPrice == maxPrice) {
        //如果价格都相等
        priceSpec = minPrice;
    }
    return priceSpec;
};

//函数：{根据key/val获取字典标签}
util.getDictLabel = function (key, val) {
    return lodash.get(DYDICT[key], `${val}.label`, "");
};




//函数：{改造列表字段配置形式的函数（字符串转对象）}-dm列表组件专用
//让列表的配置更简洁且能跟踪错误，避免像之前那样很难定位错误！！！！
//20200413优化，兼容字符串和对象形式的配置
util.reformCFListItem = function (cfList) {
    let map = {
        columns: "COLUMNS", searchFormItems: "F_ITEMS", detailItems: "D_ITEMS", formItems: "F_ITEMS",
    }
    let arrNeed = Object.keys(map);//变量：{需要处理的字段名数组}
    arrNeed.forEach(propBig => {//循环：{需要处理的字段名数组}


        let keyPub = map[propBig]
        let arrKey = cfList[propBig];//变量：{某项配置字段数组}
        if (!keyPub) return console.error(`找不到${propBig}对应的公共变量`)

        let objTarget = window[map[propBig]]//目标存储字段的公共变量
        let arrNew = arrKey.map(prop => {//新数组
            let type = util.type(prop)//变量：{数据类型}
            if (type == "string") {//如果{数据类型}是字符串
                if (!objTarget[prop]) {//如果字段不存在
                    return console.error(`${keyPub}.${prop}字段不存在`)
                }
                return objTarget[prop]
            }
            return prop//如果不是字符串，直接返回

        })
        cfList[propBig] = arrNew
    })
}

//#region handleCommonListCF:***处理通用列表配置数据函数
util.handleCommonListCF = function ({ _dataType, listCFAddon }) {


    let listIndex = `list_${_dataType}`
    PUB.listCF[listIndex] = {
        idKey: "_id", //键名
        pageSize: 20,
        listIndex, //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        //objParamAddon列表接口的附加参数
        objParamAddon: {

            _dataType
        },
        //公共的附加参数，针对所有接口
        paramAddonPublic: {

            _dataType
        },
        ...listCFAddon,
    }
    //调用：{改造列表字段配置形式的函数（字符串转对象）}
    util.reformCFListItem(PUB.listCF[listIndex])


};
//#endregion

//#region changeFavicon:改变网页标题图标的函数
util.changeFavicon = function (link) {
    let $favicon = document.querySelector('link[rel="icon"]');
    // If a <link rel="icon"> element already exists,
    // change its href to the given link.
    if ($favicon !== null) {
        $favicon.href = link;
        // Otherwise, create a new element and append it to <head>.
    } else {
        $favicon = document.createElement("link");
        $favicon.rel = "icon";
        $favicon.href = link;
        document.head.appendChild($favicon);
    }
};
//#endregion

//#region tableExportExcel:确认表格导出excel函数-只支持一页
util.tableExportExcel = async function ({ el, fileName = "数据表" }) {
    let { saveAs, XLSX } = window;
    if (!saveAs) return console.error("saveAs不存在，请先引用对应的js")
    if (!XLSX) return console.error("XLSX不存在，请先引用对应的js")
    return new Promise(async (resolve, reject) => {
        let clickStatus = await this.$confirm("确定导出excel文件？每次只能导出一页，您可以在右下角选择每页显示更多的数据来提高导出效率").catch(() => { });
        if (clickStatus != "confirm") return resolve(false);
        console.log("dom:", document.querySelector(el));
        let et = XLSX.utils.table_to_book(document.querySelector(el)); //此处传入table的DOM节点
        let etout = XLSX.write(et, { bookType: 'xlsx', bookSST: true, type: 'array' });
        try {
            //导出文件
            saveAs(new Blob([etout], { type: 'application/octet-stream' }), `${fileName}_${util.getTimeRandom()}.xlsx`);
        } catch (e) {
            console.log(e, etout);
        }
        this.$message({ type: 'success', message: '导出成功!' });
        resolve(true);
        return etout;
    });
};




//#endregion


//#region nextTickStatus:强制某个状态值更新
util.nextTickStatus = async function (key) {
    this[key] = false;
    await this.$nextTick();//延迟到视图更新
    this[key] = true;
};
//#endregion


//#region getQiNiuToken:ajax获取七牛云token的函数
util.getQiNiuToken = async function (file) {
    console.log(`util.getQiNiuToken`);
    let random = util.getTimeRandom()//调用：{返回带时间戳的随机数函数}
    let name = file.name || "paste";
    let requestData = await axios({
        method: "post",
        url: PUB.urlGetQiniuToken,
        data: {
            options: {
                //配置项
                forceSaveKey: true, //使用自定义的key
                saveKey: `${random}_${name}`, //自定义的key
                //返回数据格式y
                returnBody: `{"key":   $(key), "hash": $(etag), "w": $(imageInfo.width), "h": $(imageInfo.height), 
            "size": $(fsize),
            "bucket": $(bucket),
            "fname": $(fname),
            "ext": $(ext),
            "time": "$(year)-$(mon)-$(day) $(hour):$(min):$(sec) "
            }`
            }
        }
    });
    return requestData
};
//#endregion

//#region uploadQiNiuFile:ajax上传文件到七牛云的函数
util.uploadQiNiuFile = async function ({ file, token }) {
    let formData = new FormData()
    formData.append("file", file)
    formData.append('token', token)
    let requestData = await axios({
        method: "post",
        url: window.PUB.urlUpload,
        data: formData,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    return requestData
};
//#endregion


//#region deleteQiNiuFile:删除七牛云文件函数
util.deleteQiNiuFile = async function (url) {
    console.log(`util.deleteQiNiuFile`);
    let { data } = await axios({
      //请求接口
      method: "post",
      withCredentials: true, //携带cookie aaa
      url: `${PUB.domain}/api_third_part/delete_qiniu_file`,
      data: { url } //传递参数
    });
    return data
  
  };
//#endregion






//#region handleCommonListCF:处理通用列表配置数据函数
util.handleCommonListCF = function ({ _dataType, listCFAddon }) {
    {
        let listIndex = `list_${_dataType}`
        PUB.listCF[listIndex] = {
            idKey: "_id", //键名
            pageSize: 20,
            listIndex, //vuex对应的字段~
            focusMenu: true, //进行菜单聚焦
            //objParamAddon列表接口的附加参数
            objParamAddon: {
                _dataType
            },
            //公共的附加参数，针对所有接口
            paramAddonPublic: {
                _dataType
            },
            ...listCFAddon,
        }
        //调用：{改造列表字段配置形式的函数（字符串转对象）}
        util.reformCFListItem(PUB.listCF[listIndex])

    }
};
//#endregion




//#region aaaa:000函数
util.aaaa = function (param) {
    return 1111
};
//#endregion







Vue.prototype.$util = util //让vue实例中可访问$util
Vue.prototype.$nextTickStatus = util.nextTickStatus //让vue实例中可访问$nextTickStatus
Vue.prototype.$lodash = lodash //让vue实例中可访问$util