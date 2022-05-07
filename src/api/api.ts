import { request } from "../utils/request";

export const getTest = (url:string) => {
  return request({ url, method: 'get' })
}

export const postReg = (data: object) => {
  return request({
    url: '/user/reg', method: 'post', data: data
  })
}
/* 网易云接口 */

// 发送验证码
export const loginMusic = (phone: string) => {
  return request({
    url: '/captcha/sent', method: 'get', params: { phone }
  })
}

// 验证验证码
export const Mcaptcha = (phone:string,captcha:string) => {
  return request({
    url:'/captcha/verify',method: 'get',params: {
      phone,captcha
    }
  })
}

// 手机登录
export const loginCellPhone = (phone:string,captcha:string) => {
  return request({
    url:'/login/cellphone',method:'post',data:{
      phone,captcha
    }
  })
}

// 登录状态
export const loginStatus = () => {
  return request({
    url:'/user/level',method:'get'
  })
}