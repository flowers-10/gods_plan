import axios from 'axios'
import { ElMessage } from 'element-plus'

export const request = (option:any) => {
  // console.log(option);
  
  return new Promise((resolve,reject) => {
    // 创建一个axios实例
    const service = axios.create({
      // baseURL: 'http://localhost:3000',//开发版本
      baseURL: 'http://124.223.168.27:3000/',//发布版
      timeout:80000 //请求的时间
    })
    // 响应拦截器
    service.interceptors.response.use(
      response => response.data,
      error => {
        console.log('err:' + error) //错误打印
        if(error.response.status == 403) {
          ElMessage.error('资源不可用或者您没有权限')
        }else {
          ElMessage.error('服务器请求错误，请稍后再试')
        }
        return Promise.reject(error)
      }
    )
    // 请求业务逻辑
    service(option).then(res => resolve(res)).catch(error => reject(error))
  })
}
