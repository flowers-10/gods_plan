import { request } from "../utils/request";

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
export const loginCellPhone = (phone: string | number, captcha: string | number, timestamp: number) => {
  return request({
    url: '/login/cellphone',
    method: 'post',
    data: {
      phone, captcha, timestamp
    }
  })
}
// 手机密码登录
export const loginPhonePassword = (phone: string | number, password: string | number, timestamp: number) => {
  return request({
    url: '/login/cellphone',
    method: 'post',
    data: {
      phone, password, timestamp
    }
  })
}

// 二维码登录
// 二维码 key 生成接口
export const getQrcodeKey = () => {
  return request({
    url: '/login/qr/key',
    method: 'get',
    params: { timestamp: Date.now() }
  })
}

// 二维码生成接口
export const createQrcode = (key: object) => {
  return request({
    url: '/login/qr/create',
    method: 'get',
    params: { key, qrimg: true, timestamp: Date.now() }
  })
}

// 二维码检测扫码状态接口
export const checkQrcode = (key: object) => {
  return request({
    url: '/login/qr/check',
    method: 'get',
    params: { key, timestamp: Date.now() }
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
export const playListDetail = (id: string | string[]) => {
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
      limit: 60,
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

// 获取每日推荐歌单 
export const recommendResource = () => {
  return request({
    url: '/recommend/resource',
    method: 'get',
  })
}

// 新专辑
export const albumNewest = () => {
  return request({
    url: '/album/newest',
    method: 'get'
  })
}

// 电台推荐
export const djRecommend = () => {
  return request({
    url: '/dj/recommend',
    method: 'get'
  })
}

// 推荐mv
export const personalizedMv = () => {
  return request({
    url: '/personalized/mv',
    method: 'get'
  })
}

// 热门歌手
export const topArtists = () => {
  return request({
    url: '/top/artists',
    method: 'get'
  })
}

// 歌手榜
export const topListArtist = (type?: object) => {
  return request({
    url: '/toplist/artist',
    method: 'get',
    params: {
      type
    }
  })
}

// 获取歌手单曲
export const getArtists = (id: string | string[]) => {
  return request({
    url: '/artists',
    method: 'get',
    params: {
      id
    }
  })
}

// 获取歌手mv
export const getArtistMV = (id: string | string[]) => {
  return request({
    url: '/artist/mv',
    method: 'get',
    params: {
      id
    }
  })
}

// 获取歌手专辑
export const getArtistAlbum = (id: string | string[]) => {
  return request({
    url: '/artist/album',
    method: 'get',
    params: {
      id
    }
  })
}

// 获取专辑详情
export const getAlbum = (id: string | string[]) => {
  return request({
    url: '/album',
    method: 'get',
    params: {
      id
    }
  })
}

// 获取mv播放地址
export const getMVUrl = (id: string | string[]) => {
  return request({
    url: '/mv/url',
    method: 'get',
    params: {
      id
    }
  })
}

// 获取mv详情
export const getMVDetail = (mvid: string | string[]) => {
  return request({
    url: '/mv/detail',
    method: 'get',
    params: {
      mvid
    }
  })
}

// 相似mv
export const getSimiMV = (mvid: string | string[]) => {
  return request({
    url: '/simi/mv',
    method: 'get',
    params: {
      mvid
    }
  })
}

