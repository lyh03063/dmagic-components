import axios from "axios";
console.log("ajax-1");
/**
 * 优势1，统一接口数据处理规范
 * 优势2，精简代码
 * 
 * 步骤1：通过axios.create方法去创建axios实例，做一些基本的配置，比如基础域名，超时时间
 * 步骤2：通过axios实例的interceptors.response.use方法去做响应的统一处理，比如对404错误的处理
 */


/****** 创建axios实例 ******/
const service = axios.create({
   baseURL: "http://120.76.160.41:3000",  // api的base_url
  timeout: 1000,  // 请求超时时间
 
});




/****** request拦截器==>对请求做处理 ******/
service.interceptors.request.use(
  config => {
    /**
     * 设置token，后端要配合
     */
    // const xToken = "xToken"
    // if (xToken !== null) {
    //   config.headers['X-Token'] = xToken
    // }

      /**
     * 加上时间戳
     */
    if (config.method === 'post') {
      config.data = {
        ...config.data, 
        _t: Date.parse(new Date()) / 1000, 
      }
    } else if (config.method === 'get') {
      config.params = {
         _t: Date.parse(new Date()) / 1000, 
         ...config.params 
      }
    }
    return config
  }, function (error) {
    return Promise.reject(error) 
  }
)






/****** respone拦截器==>对响应做处理 ******/
service.interceptors.response.use(
  response => {  //成功请求到数据
    console.log("axios的生命周期-响应时");
    console.log(response);
    console.log("response.data", response.data);

    // //这里根据后端提供的数据进行对应的处理
    // if (response.data.code === 0) {
    //   console.log("接口数据正确");
      
    // } else {
    //   alert("接口数据错误");
    // }
    return response.data;
  },
  error => {  //响应错误处理
    console.log('error');
    console.log(error.response);

    if (error.response) {//如果{000}000
      let text = error.response.status === 404
        ? '404-请求的资源不存在'
        : '网络异常，请重试';
      alert(text)
      
    }else{
      alert("其他异常，可能是跨域接口权限不足！")
    }

    return Promise.reject(error)
    
  }
);
service.defaults.timeout=1000;



export default service;