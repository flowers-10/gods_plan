// 生成二维数组方便查看
export const getArr = (row: number, col: number): number[][] => {
  let arr = Array.from(Array(row * col), (_, k) => k)
  let newArr = []
  for (let i = 0; i < row; i++) {
    newArr.push(arr.splice(0, col))
  }
  return newArr
}
// 获得传入的数字的移动规则
export const getTargetArr = (target: number, row: number, col: number) => {
  let newArr: number[] = []
  if ((target - col) < 0) {
  } else {
    newArr.push(target - col)
  }
  if (![...Array(row).keys()].map(v => (v * col - 1)).includes(target - 1)) {
    newArr.push(target - 1)
  }
  if (![...Array(row).keys()].map(v => (v * col)).includes(target + 1) && target !== (row * col - 1)) {
    newArr.push(target + 1)
  }
  if ((target + col) > (row * col - 1)) {
  } else {
    newArr.push((target + col))
  }
  return newArr
}