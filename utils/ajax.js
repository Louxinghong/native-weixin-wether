//项目URL相同部分，减轻代码量，同时方便项目迁移
//这里因为我是本地调试，所以host不规范，实际上应该是你备案的域名信息
// var host = 'http://localhost:8081/demo/';
var host = ''
/**
 * POST请求，
 * URL：接口
 * postData：参数，json类型
 * doSuccess：成功的回调函数
 * doFail：失败的回调函数
 */
function post(url, postData) {
  return new Promise((resolve, reject) => {
    wx.request({
      //项目的真正接口，通过字符串拼接方式实现
      url: host + url,
      header: {
        'content-type': 'application/json;charset=UTF-8'
      },
      data: postData,
      method: 'POST',
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

//GET请求，不需传参，直接URL调用，
function get(url, getData) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url,
      header: {
        'content-type': 'application/json;charset=UTF-8'
      },
      data: getData,
      method: 'GET',
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

const ajax = {
  post,
  get
}

export default ajax

/**
 * module.exports用来导出代码
 * js文件中通过var call = require("../util/request.js")  加载
 * 在引入引入文件的时候"  "里面的内容通过../../../这种类型，小程序的编译器会自动提示，因为你可能
 * 项目目录不止一级，不同的js文件对应的工具类的位置不一样
 */
// module.exports = {
//   post,
//   get
// }
