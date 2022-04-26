export const setSession = (key: string, value: any) => {
  if (typeof value == "object" || 'array') {//如果要存储对象，则先转为json串
    value = window.JSON.stringify(value);
  }
  sessionStorage.setItem(key, value);
}
export const getSession = (key: string) => {
  let value: any = sessionStorage.getItem(key);//字符串或json串
  let json = window.JSON.parse(value);//json串转为js对象

  if (typeof json == "object" && json) {//利用了一点，当符合json格式，串会成功转为js对象，否则为null
    return json;
  }
  return value;
}
export const clearSession = () => {
  sessionStorage.clear();
}
export const hasKey = (key: any) => {//session中是否存在指定key
  if (getSession(key) == "")
    return false;
  return true;
}
