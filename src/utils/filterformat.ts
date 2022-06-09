export const  filterformat ={
  formatTime(data: number):string {
      // 过滤小于10的数字加0
      const complement = (value: number) => value < 10 ? `0${value}` : value
      const dt: Date = new Date(data)
      const y = dt.getFullYear()
      const m = complement((dt.getMonth() + 1))
      const day = complement(dt.getDate())
      return `${y}-${m}-${day}`
    }
}