import { request } from "../utils/request";

export const getTest = (url:string) => {
  return request({ url, method: 'get' })
}

export const postReg = (data: object) => {
  return request({
    url: '/user/reg', method: 'post', data: data
  })
}


export const loginMusic = (phone: number) => {
  return request({
    url: '/captcha/sent', method: 'get', params: { phone }
  })
}