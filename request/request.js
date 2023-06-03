import ajax from "../component/ajax.js";


// 创建 Ajax 实例
var instance = ajax.create("/api/");

/**
 * 发起 GET 请求
 * @param {string} url 请求的 URL
 * @param {object} params 请求的参数对象
 * @returns {Promise} 返回包含响应数据的 Promise 对象
 */
export const $get = async(url,params)=>{
  let {data} = await instance.get(url,params)
  return data
}

/**
 * 发起 POST 请求
 * @param {string} url 请求的 URL
 * @param {object} params 请求的参数对象
 * @returns {Promise} 返回包含响应数据的 Promise 对象
 */
export const $post = async(url,params)=>{
  let {data} = await instance.post(url,params)
  return data
}

/**
 * 发起 POST 请求
 * @param {string} url 请求的 URL
 * @param {object} params 请求的参数对象
 * @returns {Promise} 返回包含响应数据的 Promise 对象
 */
export const $put = async(url,params)=>{
  let{data} = await instance.put(url,params)
  return data
}

/**
 * 设置请求头的 Token
 * @param {string} token 请求头的 Token 值
 */
export const $setToken = async(token) =>{
  instance.setHeader('Authorization',token)
}

