

let deepCopy = function (obj) {//深拷贝一个Json对象的函数
  let str = JSON.stringify(obj);//json对象转字符串
  let objNew = JSON.parse(str); //字符串转json对象
  return objNew
}

let class2type = {},
  //用于记录[object class]样式  
  arrObjs = "Boolean Number String Function Array Date RegExp Null Undefined".split(" ");
for (var i = 0, l = arrObjs.length; i < l; i++) {
  class2type["[object " + arrObjs[i] + "]"] = arrObjs[i].toLowerCase();
}

let type = function (obj) {
  //函数：{返回对象类型函数}
  return class2type[Object.prototype.toString.call(obj)] || "object";
};

function timeout(ms) {//使用promise封装一个延迟方法
  return new Promise((resolve) => {//resolve延迟解决后的回调函数, reject延迟异常的处理函数
    setTimeout(resolve, ms, 'done');
  });
}
/**
 * 
 * @param {开始时间} _json.startTime
 * @param {结束时间} _json.endTime
 *  @param {当前时间} _json.currTime
 */
function getTimeStatus(param) {//
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


/**ajax填充数据列表的某个字段函数
 * 可用于动态数据字典
 */



async function ajaxPopulate(populateConfig) {
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



  return deepCopy(listData);//深拷贝，返回一个全新的对象

  //return listData

}

export default {
  deepCopy, type, timeout, getTimeStatus, ajaxPopulate
}