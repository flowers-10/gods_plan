// 验证手机号码
export var checkPhones = (rule:any, value:string, cb:any) => {
  // 验证手机的正则
  const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

  if (regMobile.test(value)) {
    // 合法手机
    return cb()
  }

  cb(new Error('请输入合法手机号'))
}