import { request } from "../utils/request";

export const getTest = (url: string) => {
  return request({ url, method: 'get' })
}

export const postReg = (data: object) => {
  return request({
    url: '/user/reg', method: 'post', data: data
  })
}
/* 网易云接口 */

// 发送验证码
export const loginMusic = (phone: string | number) => {
  return request({
    url: '/captcha/sent', method: 'get', params: { phone }
  })
}

// 验证验证码
export const Mcaptcha = (phone: string | number, captcha: string | number) => {
  return request({
    url: '/captcha/verify',
    method: 'get',
    params: {
      phone, captcha
    }
  })
}

// 手机登录
export const loginCellPhone = (phone: string | number, captcha: string | number) => {
  return request({
    url: '/login/cellphone',
    method: 'post',
    data: {
      phone, captcha
    }
  })
}

// 登录状态
export const loginStatus = () => {
  return request({
    url: '/user/level',
    method: 'get'
  })
}

// 获取用户详情
export const userDetail = (uid: string | number) => {
  return request({
    url: '/user/detail',
    method: 'post',
    data: {
      uid
    }
  })
}

// 获取用户歌单
export const userPlaylist = (uid: string | number) => {
  return request({
    url: '/user/playlist',
    method: 'post',
    data: {
      uid,
      limit: 100
    }
  })
}

// 退出登录
export const loginOut = () => {
  return request({
    url: '/logout',
    method: 'get'
  })
}

// 获取歌单详情
export const playListDetail = (id: number | string) => {
  return request({
    url: '/playlist/detail',
    method: 'get',
    params: {
      id
    }
  })
}

// 获取歌曲详情
export const songDetail = (ids: number | string) => {
  return request({
    url: '/song/detail',
    method: 'get',
    params: { ids }
  })
}

// 获取音乐 url
export const songUrl = (id: number | string) => {
  return request({
    url: '/song/url',
    method: 'get',
    params: { id }
  })
}

// 获取歌词
export const lyric = (id: number | string) => {
  return request({
    url: '/lyric',
    method: 'get',
    params: { id }
  })
}