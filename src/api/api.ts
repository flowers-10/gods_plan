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
export const loginCellPhone = (phone: string | number, captcha: string | number, timestamp:number) => {
  return request({
    url: '/login/cellphone',
    method: 'post',
    data: {
      phone, captcha,timestamp
    }
  })
}
// 手机密码登录
export const loginPhonePassword = (phone: string | number, password: string | number, timestamp:number) => {
  return request({
    url: '/login/cellphone',
    method: 'post',
    data: {
      phone, password,timestamp
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

// 喜欢音乐列表
export const likeList = (id: number | string) => {
  return request({
    url: '/likelist',
    method: 'get',
    params: { id }
  })
}

// 歌单分类
export const catlist = () => {
  return request({
    url: '/playlist/catlist',
    method: 'get'
  })
}

// 歌单 ( 网友精选碟 )
export const topPlaylist = (cat: string, offset: string | number) => {
  return request({
    url: '/top/playlist',
    method: 'get',
    params: {
      cat,
      limit: 51,
      offset
    }
  })
}

// 所有榜单内容摘要
export const toplistDetail = () => {
  return request({
    url: '/toplist/detail',
    method: 'get',
  })
}
