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
    method: 'get',
  }, 'a')
}


// 查询文章
// 可传参数: id, typeId, limit, offset 
// id:根据文章id查询
// typeId:根据文章类型查询
// limit  offset  typeId:根据文章类型和 limit: 取出文章条数数量 offset: 偏移数量 , 用于分页查询
// 什么都不传：查询所有文章
export const getArticle = (data?: object) => {
  return request({
    url: '/article',
    method: 'get',
    params: data
  }, 'a')
}

// 保存文章
//必传参数
// articleTitle：文章标题
// typeId：文章类型
// articleContent：文章内容
// articleIMG：文章展示图片
// articleIntroduce：文章的介绍
export const saveArticle = (data: object) => {
  return request({
    url: '/saveArticle',
    method: 'post',
    data: data
  }, 'a')
}

// 查看所有文章类型
export const getArticleType = () => {
  return request({
    url: '/getArticleType',
    method: 'get',
  }, 'a')
}

// 添加文章类型
export const _addArticleType = (data: object) => {
  return request({
    url: '/addArticleType',
    method: 'post',
    data: data
  }, 'a')
}

// 删除文章
export const _deleteArticle = (data: object) => {
  return request({
    url: '/deleteArticle',
    method: 'get',
    params: data
  }, 'a')
}

// 编辑文章
export const _editArticle = (data:object) => {
  return request({
    url:'/editArticle',
    method: 'post',
    data:data
  },'a')
}

// 获得当前标签的总文章数

export const _getArticleTotal = (data:object) => {
  return request({
    url:'/getArticleTotal',
    method: 'get',
    params:data
  },'a')
}
