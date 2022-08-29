import { toRaw } from 'vue'

export const filterformat = {
  // 过滤日期
  formatTime(data: number): string {
    // 过滤小于10的数字加0
    const complement = (value: number) => value < 10 ? `0${value}` : value
    const dt: Date = new Date(data)
    const y = dt.getFullYear()
    const m = complement((dt.getMonth() + 1))
    const day = complement(dt.getDate())
    return `${y}-${m}-${day}`
  },
  // 歌手名字
  filtersinger(item: any): string {
    const singer = toRaw(item)
    const newSinger = [...singer]
    if (singer.length > 1) {
      const newSingers = newSinger.map(item => `${item.name} /`)
      newSingers.slice(0, newSingers.length - 1)
      return newSingers.slice(0, newSingers.length - 1).join(' ') + ' ' + newSinger.pop().name
    } else {
      return newSinger[0].name
    }
  },
  // 过滤歌曲时间
  filterSongTime(item: number): string {
    let m: string | number = item / 1000 / 60
    let s: string | number = (item / 1000) % 60
    if (m < 10) {
      m = '0' + parseInt(m.toString())
    } else {
      m = parseInt(m.toString())
    }
    if (s < 10) {
      s = '0' + parseInt(s.toString())
    } else {
      s = parseInt(s.toString())
    }
    return `${m}:${s}`
  },

  // 把数字转换成万保留两位小数
  keepTwoDecimalFull(num:number):string {
    if (num > 10000) {
      let result = num / 10000;
      result = Math.floor(result * 100) / 100;
      var s_x = result.toString(); //将数字转换为字符串
      var pos_decimal = s_x.indexOf('.'); //小数点的索引值
      // 当整数时，pos_decimal=-1 自动补0
      if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
      }
      // 当数字的长度< 小数点索引+2时，补0
      while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
      }
      s_x += '万';
    } else {
      s_x = num+'';
    }
    return s_x
  }
}




