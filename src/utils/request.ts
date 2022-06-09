import axios from 'axios'
import { ElMessage } from 'element-plus'

export const request = (option: any) => {
  // console.log(import.meta.env.VITE_BASE_API);
  return new Promise((resolve, reject) => {
    // 创建一个axios实例
    const service = axios.create({
      baseURL: import.meta.env.VITE_BASE_API,
      timeout: 80000, //请求的时间
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    service.defaults.withCredentials = true;
    service.defaults.transformRequest = [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
      

    // 响应拦截器
    service.interceptors.response.use(
      response => response.data,
      error => {
        console.log('err:' + error) //错误打印
        if (error.response.status == 403) {
          ElMessage.error('资源不可用或者您没有权限')
        } else {
          ElMessage.error('服务器请求错误，请稍后再试')
        }
        return Promise.reject(error)
      }
    )
    // 请求业务逻辑
    service(option).then(res => resolve(res)).catch(error => reject(error))
  })
}
