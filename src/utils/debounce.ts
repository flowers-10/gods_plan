/* 封装防抖函数 */ 
export const debounce = (fun: any, delay: number = 500) => {
  let t: any = ''
  return (args: any) => {
    let that: any = this
    let _args = args
    clearTimeout(t)
    t = setTimeout(function () {
      fun.call(that, _args)
    }, delay)
  }
}