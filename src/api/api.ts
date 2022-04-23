import { request } from "../utils/request";

export const getTest = () => {
  return request({ url: '', method: 'get' })
}

export const postReg = (data:object) => {
  return request({
    url: '/user/reg', method: 'post',data:data
  })
}