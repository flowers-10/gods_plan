import type { PiniaPluginContext } from 'pinia'
import { toRaw } from 'vue'
// pinia全局持久化插件
type Options = {
  key?: string
}

const __pinaiaKey__: string = 'unknown'
// 存键值对
const setStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value))
}
// 取键值对
const getStorage = (key: string) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {}
}

// 持久化插件
export const piniaPlugin = (options: Options) => {
  // console.log(options)

  return (context: PiniaPluginContext) => {
    const { store } = context
    const data = getStorage(`${options?.key ?? __pinaiaKey__}-${store.$id}`)
    // console.log(data);

    // 当store发生改变时，触发subscribe
    store.$subscribe(() => {
      // 把用户需要的key和内容存入到localStorage
      setStorage(`${options?.key ?? __pinaiaKey__}-${store.$id}`, toRaw(store.$state))
    })
    // console.log(context, 'context')
    return {
      ...data
    }
  }

}
