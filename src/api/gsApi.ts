import { request } from "../utils/request";

/* godsplan server 接口 */

// 测试
export const getTest = (url: string) => {
  return request({ url, method: 'get' }, 'a')
}

// 注册
export const postReg = (data: object) => {
  return request({
    url: '/user/reg', method: 'post', data: data
  }, 'a')
}

// 视频路径接口
export const getVideo = () => {
  return request({
    url: '/video',
    method: 'get'
  }, 'a')
}