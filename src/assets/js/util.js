
window.PUB = {}
//window.PUB.domain="http://120.76.160.41:3000"
// window.PUB.domain = "http://localhost:3000"
window.PUB.domain = 'http://test.dmagic.cn'
// window.PUB.urlUpload = `${PUB.domain}/api_third_part/qiniu_upload?scope=test`
window.PUB.urlUpload = `https://up-z2.qiniup.com`//七牛云上传地址（域名）
window.PUB.urlGetQiniuToken = `${PUB.domain}/api_third_part/get_qiniu_token?scope=test`
window.util = {}
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
//#region ajaxPopulate:ajax填充数据列表的某个字段函数
/**ajax填充数据列表的某个字段函数
 * 可用于动态数据字典
 */
util.ajaxPopulate = async function (populateConfig) {
  let { listData, page, populateColumn, idColumn, idColumn2, findJson = {} } = populateConfig;
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
  console.log("arrId#####", arrId);
  //变量：{填充查询条件}
  let findJsonNeed = {
    [idColumn2]: {
      "$in": arrId
    }
  }
  Object.assign(findJsonNeed, findJson);//合并对象
  let { data } = await axios({
    //请求接口
    method: "post",
    url: window.PUB.domain + `/crossList?page=${page}`,
    data: {
      findJson: findJsonNeed, pageSize: 999
    } //传递参数
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
export default util