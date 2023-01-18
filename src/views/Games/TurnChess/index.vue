<template>
  <div class="Game-turnChess">
    <div class="button-back">返回大厅</div>
    <div class="chessboard">

      <div class="chessboard-grid" v-for="(item, index) in 32">
        {{ index }}
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watch } from "vue"
// import { getTargetArr } from '@/utils/gameMoveRule'

// 位置信息
const dataList = ref<any>(
  [{ "index": 0, "ruleval": [1, 8], "carStutas": false }, { "index": 1, "ruleval": [0, 2, 9], "carStutas": false }, { "index": 2, "ruleval": [1, 3, 10], "carStutas": false }, { "index": 3, "ruleval": [2, 4, 11], "carStutas": false }, { "index": 4, "ruleval": [3, 5, 12], "carStutas": false }, { "index": 5, "ruleval": [4, 6, 13], "carStutas": false }, { "index": 6, "ruleval": [5, 7, 14], "carStutas": false }, { "index": 7, "ruleval": [6, 15], "carStutas": false }, { "index": 8, "ruleval": [0, 9, 16], "carStutas": false }, { "index": 9, "ruleval": [1, 8, 10, 17], "carStutas": false }, { "index": 10, "ruleval": [2, 9, 11, 18], "carStutas": false }, { "index": 11, "ruleval": [3, 10, 12, 19], "carStutas": false }, { "index": 12, "ruleval": [4, 11, 13, 20], "carStutas": false }, { "index": 13, "ruleval": [5, 12, 14, 21], "carStutas": false }, { "index": 14, "ruleval": [6, 13, 15, 22], "carStutas": false }, { "index": 15, "ruleval": [7, 14, 23], "carStutas": false }, { "index": 16, "ruleval": [8, 17, 24], "carStutas": false }, { "index": 17, "ruleval": [9, 16, 18, 25], "carStutas": false }, { "index": 18, "ruleval": [10, 17, 19, 26], "carStutas": false }, { "index": 19, "ruleval": [11, 18, 20, 27], "carStutas": false }, { "index": 20, "ruleval": [12, 19, 21, 28], "carStutas": false }, { "index": 21, "ruleval": [13, 20, 22, 29], "carStutas": false }, { "index": 22, "ruleval": [14, 21, 23, 30], "carStutas": false }, { "index": 23, "ruleval": [15, 22, 31], "carStutas": false }, { "index": 24, "ruleval": [16, 25], "carStutas": false }, { "index": 25, "ruleval": [17, 24, 26], "carStutas": false }, { "index": 26, "ruleval": [18, 25, 27], "carStutas": false }, { "index": 27, "ruleval": [19, 26, 28], "carStutas": false }, { "index": 28, "ruleval": [20, 27, 29], "carStutas": false }, { "index": 29, "ruleval": [21, 28, 30], "carStutas": false }, { "index": 30, "ruleval": [22, 29, 31], "carStutas": false }, { "index": 31, "ruleval": [23, 30], "carStutas": false }]
)
// 牌信息
const brandlist = ref<any>([])
// 是否第一次玩
const farstValue = ref<number>(0)
// 第一次翻拍的颜色
const manStutas = ref<string>('')
//第一次翻牌的数据
const oldValue = ref<boolean>(false)
//每次翻的人
const flopStutas = ref<string>('')
const message = ref<string>('')
// 阵亡的牌
const redList = ref<any>([])
const blueList = ref<any>([])
// 胜利
const victory = ref<boolean>(true)
const victoryMan = ref<string>('')
// 展示
const shows = ref<boolean>(false)
watch(brandlist.value, (oldValue, newValue) => {
  console.log(newValue)
})
const pnk = (name: string, Ranking: number, Belonging: string) => {
  return {
    name,
    Ranking,
    rote: false,
    Belonging,
    colorStutas: false,
  }
}

// 初始化游戏
const init = () => {
  // 判断第一次点击
  farstValue.value = 0
  brandlist.value = []
  redList.value = []
  blueList.value = []
  victory.value = false

  for (let i = 0; i < 7; i++) {
    if (i == 0) {
      brandlist.value.push(pnk('将',i,'black'))
      brandlist.value.push(pnk('帅',i,'red'))
    }else if(i == 6) {
      brandlist.value.push(pnk('卒',i,'black'))
      brandlist.value.push(pnk('卒',i,'black'))
      brandlist.value.push(pnk('卒',i,'black'))
      brandlist.value.push(pnk('卒',i,'black'))
      brandlist.value.push(pnk('卒',i,'black'))

      brandlist.value.push(pnk('兵',i,'red'))
      brandlist.value.push(pnk('兵',i,'red'))
      brandlist.value.push(pnk('兵',i,'red'))
      brandlist.value.push(pnk('兵',i,'red'))
      brandlist.value.push(pnk('兵',i,'red'))
    }else if(i ==2) {
      brandlist.value.push(pnk('象',i,'black'))
      brandlist.value.push(pnk('象',i,'black'))
      brandlist.value.push(pnk('象',i,'red'))
      brandlist.value.push(pnk('象',i,'red'))
    }else if(i == 1) {
      brandlist.value.push(pnk('士',i,'black'))
      brandlist.value.push(pnk('士',i,'black'))
      brandlist.value.push(pnk('士',i,'red'))
      brandlist.value.push(pnk('士',i,'red'))
    }else if(i == 3) {
      brandlist.value.push(pnk('马',i,'black'))
      brandlist.value.push(pnk('马',i,'black'))
      brandlist.value.push(pnk('马',i,'red'))
      brandlist.value.push(pnk('马',i,'red'))
    }else if(i == 4) {
      brandlist.value.push(pnk('车',i,'black'))
      brandlist.value.push(pnk('车',i,'black'))
      brandlist.value.push(pnk('车',i,'red'))
      brandlist.value.push(pnk('车',i,'red'))
    }else if(i == 5) {
      brandlist.value.push(pnk('炮',i,'black'))
      brandlist.value.push(pnk('炮',i,'black'))
      brandlist.value.push(pnk('炮',i,'red'))
      brandlist.value.push(pnk('炮',i,'red'))
    }
  }
  brandlist.value.map(
    (item :any,index:number) => {
      return item.id = index
    }
  )
  console.log(brandlist.value);
}

onMounted(() => {
  init()
})


</script>

<style lang="less" scoped>
.Game-turnChess {
  width: 100%;
  height: 100%;
  padding: 20px 50px 50px;

  .button-back {
    font-size: 18px;
    color: var(--color);
    cursor: pointer;
  }

  .chessboard {
    border: 2px solid white;
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    color: white;
    font-size: 20px;

    .chessboard-grid {
      width: 12.5%;
      height: 25%;
      font-size: 20px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid black;
    }
  }
}
</style>