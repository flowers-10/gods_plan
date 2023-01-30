<template>
  <div class="exit" @click="router.push('/apps/games')">退出</div>
  <div class="box">
    <div class="titleBox">{{ infor.flopStutas == 'blue' ? '蓝方行动' : '红方行动' }}<span class="message" v-if="infor.shows">:
        {{
          infor.message
        }}</span></div>
    <div class="eatList">
      <div class="eatListTitle">阵亡棋子</div>
      <div class="eatListImg" v-for="item in infor.redList">
        <img class="eatListImgItem" :src='item.brandInfor.url' />
      </div>
    </div>
    <div class="eatListbule">
      <div class="eatListTitle">阵亡棋子</div>
      <div class="eatListImg" v-for="item in infor.blueList">
        <img class="eatListImgItem" :src='item.brandInfor.url' />
      </div>
    </div>
    <div class="victory" v-if="infor.victory">
      <div class="victoryTitle">{{ infor.victoryMan }}</div>
      <div class="victoryBotton" @click="init()">我不服，再来一局！</div>
    </div>
    <div class="tugbox">
      <div class="imgItemBox" v-for="item in infor.dataList" @click="clickItem(item)">
        <div class="imgItemBoxs"
          :class="item.brandInfor ? item.brandInfor.colorStutas ? item.brandInfor.Belonging == 'blue' ? 'imgItemBoxbeforBlue' : 'imgItemBoxbeforRed' : '' : ''">
          <img class="imgItem itemPros" v-if="item.carStutas" :class="item.brandInfor.rote ? 'icon' : ''"
            src='http://www.jmyuyu.cn/demo/img/cons.png' />
          <img class="imgItem itemCons" v-if="item.carStutas" :class="item.brandInfor.rote?'icon1':''"
            :src='item.brandInfor.url' />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()

type InforType = {
  dataList: DataListType[],
  brandlist: BrandListType[],
  farstValue: number,
  manStutas: string,//第一次翻拍的颜色
  oldValue: boolean,//第一次翻牌的数据
  flopStutas: string,//每次翻的人,
  message: string,
  redList: [],
  blueList: [],
  victory: boolean,
  victoryMan: string,
  shows: boolean,
}
type DataListType = {
  index: number
  ruleval: number[]
  carStutas: boolean
  brandInfor: BrandListType
}
type BrandListType = {
  Belonging: string
  Ranking: number
  colorStutas: boolean
  id: number
  rote: boolean
  url: string
}

const infor = reactive<any>({
  dataList: [
    {
      index: 0,
      ruleval: [1, 4],
      carStutas: false,//当前位有牌
    }, {
      index: 1,
      ruleval: [0, 2, 5],
      carStutas: false,//当前位有牌
    },
    {
      index: 2,
      ruleval: [1, 3, 6],
      carStutas: false,//当前位有牌
    },
    {
      index: 3,
      ruleval: [2, 7],
      carStutas: false,//当前位有牌
    }, {
      index: 4,
      ruleval: [0, 5, 8],
      carStutas: false,//当前位有牌
    }, {
      index: 5,
      ruleval: [1, 4, 6, 9],
      carStutas: false,//当前位有牌
    },
    {
      index: 6,
      ruleval: [2, 5, 7, 10],
      carStutas: false,//当前位有牌
    },
    {
      index: 7,
      ruleval: [3, 6, 11],
      carStutas: false,//当前位有牌
    },
    {
      index: 8,
      ruleval: [4, 9, 12],
      carStutas: false,//当前位有牌
    },
    {
      index: 9,
      ruleval: [5, 8, 10, 13],
      carStutas: false,//当前位有牌
    },
    {
      index: 10,
      ruleval: [6, 9, 11, 14],
      carStutas: false,//当前位有牌
    },
    {
      index: 11,
      ruleval: [7, 10, 15],
      carStutas: false,//当前位有牌
    },
    {
      index: 12,
      ruleval: [8, 13],
      carStutas: false,//当前位有牌
    },
    {
      index: 13,
      ruleval: [12, 14, 9],
      carStutas: false,//当前位有牌
    },
    {
      index: 14,
      ruleval: [13, 10, 15],
      carStutas: false,//当前位有牌
    },
    {
      index: 15,
      ruleval: [14, 11],
      carStutas: false,//当前位有牌
    },
  ],
  brandlist: [],
  farstValue: 0,
  manStutas: '',//第一次翻拍的颜色
  oldValue: false,//第一次翻牌的数据
  flopStutas: '',//每次翻的人,
  message: '',
  redList: [],
  blueList: [],
  victory: true,
  victoryMan: '',
  shows: false,
})


watch(infor, (oldValue, newValue) => {
  console.log(newValue);
})
// 点击牌
const clickItem = (item: DataListType) => {
  // 如果当前位置上有牌存在
  if (item.carStutas) {
    // 如果当前牌已经翻开
    if (item.brandInfor.rote) {
      // 如果当前行动的颜色不等于点击牌的颜色
      if (infor.flopStutas != item.brandInfor.Belonging) {
        // 移动牌
        movebrand(infor.oldValue, item)
      } else {
        // 如果当前行动的颜色等于点击牌的颜色
        clickHoverStutas(item)
      }
      // 没翻开牌就翻
    } else {
      flop(item)
    }
    // 如果当前位置上牌不存在
  } else {
    // 如果当前位置上没有牌，移动到空位上
    if (infor.oldValue) {
      // console.log(infor.oldValue)
      // 挪牌
      movebrand(infor.oldValue, item)
    }
  }
}


// 挪牌
const movebrand = (oldValue: DataListType, newValue: DataListType) => {
  // 如果选中的当前牌跳转规则包含这些跳转的位置
  if (oldValue.ruleval.includes(newValue.index)) {
    // 要移动到新位置上存在牌时
    if (newValue.carStutas) {
      // 如果旧的牌比要移动到的牌强
      if (oldValue.brandInfor.Ranking < newValue.brandInfor.Ranking) {
        // 吃牌
        // 如果大象想吃老鼠
        if (oldValue.brandInfor.Ranking == 1 && newValue.brandInfor.Ranking == 8) {
          shows('你在想屁吃！')
        } else {
          // 吃掉对方的牌
          shows('宰杀！')
          eatBrand(oldValue, newValue)
        }
      }
      // 如果老的牌等于新牌的
      if (oldValue.brandInfor.Ranking == newValue.brandInfor.Ranking) {
        // 平
        eatBrand(oldValue, newValue, true)
      }
      // 如果老的牌打不过新的牌
      if (oldValue.brandInfor.Ranking > newValue.brandInfor.Ranking) {
        // 不能吃啥也不用动，但是旧牌是老鼠就可以吃大象
        if (oldValue.brandInfor.Ranking == 8 && newValue.brandInfor.Ranking == 1) {
          eatBrand(oldValue, newValue)
          shows('宰杀！')
        }
      }
    } else {
      // 不存在牌就直接移动上去
      eatBrand(oldValue, newValue)
    }
  } else {
    shows('不能移动到那里')
  }
}
// 更改信息
const shows = (message: string) => {
  infor.message = message
  infor.shows = true
  setTimeout(() => {
    infor.shows = false
  }, 2000);
}
//吃牌
const eatBrand = (oldValue: DataListType, newValue: DataListType, valstu?: boolean) => {
  let oldValues = JSON.stringify(oldValue)
  let newValues = JSON.stringify(newValue)
  // 便利所有位置信息
  infor.dataList.forEach((element: any) => {
    // 如果棋子移动到了格子里
    if (newValue.index == element.index) {
      // 如果原先格子里的颜色是红的
      if (element.brandInfor.Belonging == 'red') {
        // 阵亡了这个红色的棋子
        infor.redList.push(JSON.parse(newValues))
      }
      // 果原先格子里的颜色是蓝的
      if (element.brandInfor.Belonging == 'blue') {
        // 阵亡了这个蓝色的棋子
        infor.blueList.push(JSON.parse(newValues))
      }
      // 这一格的棋子变成了移动过来的棋子
      element.brandInfor = oldValue.brandInfor
      // 这里存在牌
      element.carStutas = true
      // 如果传了valstu，说明等级是一样的，拼掉
      if (valstu) {
        // 这个位置清空
        element.brandInfor = {}
        // 这个位置上没有牌
        element.carStutas = false
        // 把拼掉的红牌他推入
        if (JSON.parse(oldValues).brandInfor.Belonging == 'red') {
          infor.redList.push(JSON.parse(oldValues))
        }
        if (JSON.parse(oldValues).brandInfor.Belonging == 'blue') {
          infor.blueList.push(JSON.parse(oldValues))
        }

      }
    }
  });
  //只要吃牌了，那么老的牌肯定要变空
  infor.dataList[oldValue.index].brandInfor = {}
  // 老的格子上也没有牌了
  infor.dataList[oldValue.index].carStutas = false
  // 清空行动记录
  infor.oldValue = false
  // 下一个玩家行动
  infor.flopStutas = infor.flopStutas == 'red' ? 'blue' : 'red'
  // 并且重新获得指针样式
  hoverStutas(infor.flopStutas)

  // 根据阵亡的棋子判断谁赢
  if (infor.redList.length == 8) {
    if (infor.blueList.length == 8) {
      infor.victoryMan = '平局！'
    } else {
      infor.victoryMan = '蓝方胜利！'
    }
    infor.victory = true
  }

  if (infor.blueList.length == 8) {
    if (infor.redList.length == 8) {
      infor.victoryMan = '平局！'
    } else {
      infor.victoryMan = '红方胜利！'
    }
    infor.victory = true
  }

}

// 判断翻牌
const flop = (item: DataListType) => {
  // 如果从来没有翻过牌
  if (infor.farstValue == 0) {
    // 第一次翻牌的颜色等于翻开的这张牌的颜色
    infor.manStutas = item.brandInfor.Belonging
    // 记录翻牌了
    infor.farstValue++
    // 第一次翻牌的人，翻到什么颜色就是什么阵营
    infor.flopStutas = infor.manStutas
  }
  infor.dataList.forEach((element: DataListType) => {
    // 遍历所有位置，如果这个位置存在牌并且当前牌的id 等于点击牌的id
    if (element.brandInfor && element.brandInfor.id == item.brandInfor.id) {
      // 翻牌这张牌
      element.brandInfor.rote = true
    }
  });
  // 当前行动的人换成下一个阵营
  infor.flopStutas = infor.flopStutas == 'red' ? 'blue' : 'red'
  // 当前阵营的人可以行动的牌
  hoverStutas(infor.flopStutas)
}

// 给牌添加选中样式，当轮玩家点击牌后会有选中的样式
const hoverStutas = (val: string) => {
  // 遍历所有位置
  infor.dataList.forEach((element: DataListType) => {
    // 如果当前位置有牌
    if (element.brandInfor) {
      // 全部重置成未选中
      element.brandInfor.colorStutas = false
    }
  })
  let stutas = false
  // 遍历当前所有位置
  infor.dataList.forEach((element: DataListType) => {
    // 如果当前位置有牌，并且这张牌的阵营和当前行动的人阵营一样并且这张牌已经翻转了
    if (element.brandInfor && element.brandInfor.Belonging == val && element.brandInfor.rote) {
      if (!stutas) {
        // 那么这牌被选中
        element.brandInfor.colorStutas = true
        // 保存选中的牌数据
        infor.oldValue = element
        // 确保只能一张牌能选中
        stutas = true
      } else {
        element.brandInfor.colorStutas = false
      }
    }
  });
}

// 给牌添加选中样式，当轮玩家点击自己阵营的牌后会有选中的样式
const clickHoverStutas = (item: DataListType) => {
  // 遍历所有位置
  infor.dataList.forEach((element: DataListType) => {
    // 如果这张牌存在
    if (element.brandInfor) {
      // 清空所有选中的样式
      element.brandInfor.colorStutas = false
    }
  })
  let stutas = false
  infor.dataList.forEach((element: DataListType) => {
    if (element.brandInfor && element.brandInfor.id == item.brandInfor.id && element.brandInfor.rote) {
      if (!stutas) {
        element.brandInfor.colorStutas = true
        infor.oldValue = element
        stutas = true
      } else {
        element.brandInfor.colorStutas = false
      }
    }
  });
}
// 打乱数据
const shuffle = (arr: BrandListType[]) => {
  for (let i = 0; i < arr.length; i++) {
    const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]
  }
  return arr
};
const init = () => {
  // 判断第一次点击
  infor.farstValue = 0
  infor.brandlist = []
  infor.redList = []
  infor.blueList = []
  infor.victory = false
  for (let i = 1; i <= 8; i++) {
    let arr = {
      'id': i,
      'Ranking': i,
      'url': "http://www.jmyuyu.cn/demo/img/b" + i + ".png",
      'rote': false,
      'Belonging': 'blue',//所属蓝方
      'colorStutas': false,
    }
    infor.brandlist.push(arr)
  }
  for (let i = 1; i <= 8; i++) {
    let arr = {
      id: i,
      Ranking: i,
      url: "http://www.jmyuyu.cn/demo/img/r" + i + ".png",
      rote: false,
      Belonging: 'red',//所属蓝方
      colorStutas: false,
    }
    infor.brandlist.push(arr)
  }
  infor.brandlist.forEach((item: BrandListType, index: number) => {
    item.id = index
  })
  shuffle(infor.brandlist)
  infor.brandlist.forEach((item: BrandListType, index: number) => {
    infor.dataList[index].brandInfor = item
    infor.dataList[index].carStutas = true
  })
}

init()
</script>
<style scoped>
.tugbox {
  width: 530px;
  height: 570px;
  /* background: rgb(174, 237, 92); */
  background: url('http://www.jmyuyu.cn/demo/img/bj.jpg') center center;
  background-size: 530px 570px;
}

.box {
  margin: 0;
  display: flex;
  justify-content: center;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

.imgItemBox {
  width: 80px;
  height: 112px;
  margin: 10px 25px;
  float: left;
  position: relative;
  cursor: pointer;
}

.imgItemBoxs {
  width: 80px;
  height: 112px;
  position: relative;
  /* overflow: hidden; */
}

.imgItemBoxbeforRed::before {
  content: "";
  position: absolute;
  top: -5px;
  left: -5px;
  width: 20px;
  height: 20px;
  border-left: 3px solid #FF693F;
  border-top: 3px solid #FF693F;
  border-top-left-radius: 5px;
  z-index: 2;
  animation-name: animationframes;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-duration: 4s;
}

.imgItemBoxbeforRed::after {
  content: "";
  position: absolute;
  right: -5px;
  bottom: -5px;
  width: 20px;
  height: 20px;
  border-bottom: 3px solid #FF693F;
  border-right: 3px solid #FF693F;
  border-bottom-right-radius: 5px;
  z-index: 2;
  animation-name: animationframes;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-duration: 4s;
}

.imgItemBoxbeforBlue::before {
  content: "";
  position: absolute;
  top: -5px;
  left: -5px;
  width: 20px;
  height: 20px;
  border-left: 3px solid #407DE1;
  border-top: 3px solid #407DE1;
  border-top-left-radius: 5px;
  z-index: 2;
  animation-name: animationframes;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-duration: 4s;
}

@keyframes animationframes {
  0% {
    width: 20px;
    height: 20px;
  }

  25% {
    width: 25px;
    height: 25px;
  }

  50% {
    width: 30px;
    height: 30px;
  }

  75% {
    width: 25px;
    height: 25px;
  }

  100% {
    width: 20px;
    height: 20px;
  }
}

.imgItemBoxbeforBlue::after {
  content: "";
  position: absolute;
  right: -5px;
  bottom: -5px;
  width: 20px;
  height: 20px;
  border-bottom: 3px solid #407DE1;
  border-right: 3px solid #407DE1;
  border-bottom-right-radius: 5px;
  z-index: 2;
  animation-name: animationframes;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-duration: 4s;
}

.imgItem {
  width: 80px;
  height: 112px;
  transition: all 2s;
}

/* .imgItem:hover{
  width: 75px;
  height: 105px;
} */
.itemPros {
  position: absolute;
  left: 0;
  top: 0;
  backface-visibility: hidden;
  z-index: 1;
}

.itemCons {
  transform: rotateY(180deg);
}

.icon {
  transform: rotateY(180deg);
  transition: all 2s;

}

.icon1 {
  transform: rotateY(0deg);
  transition: all 2s;
}

.titleBox {
  width: 100%;
  height: 30px;
  position: absolute;
  text-align: center;
  font-size: 24px;
  left: 0;
  top: 10px;
}

.message {
  font-size: 40px;
}

.eatList {
  width: 180px;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #f2b19f;
}

.eatListImg {
  width: 80px;
  height: 100px;
  margin: 5px;
  background-color: #FF693F;
  float: left;
}

.eatListImgItem {
  width: 80px;
  height: 100px;
}

.eatListTitle {
  width: 100%;
  height: 30px;
  text-align: center;
  line-height: 30px;
}

.eatListbule {
  width: 180px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  background-color: #7ba5e9;
}

.victory {
  width: 400px;
  height: 200px;
  position: absolute;
  top: calc(50% - 100px);
  left: calc(50% - 200px);
  text-align: center;
  z-index: 9999;
  background-color: #e3977f;
}

.victoryTitle {
  height: 150px;
  width: 100%;
  text-align: center;
  line-height: 150px;
  font-size: 50px;
}

.victoryBotton {
  background-color: aquamarine;
  width: 160px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  margin-left: 120px;
  border-radius: 20px;
}

.exit {
  position: absolute;
  left: 10px;
  z-index: 999;
  border: 1px solid black;
  top: 10px;
  padding: 10px;
  cursor: pointer;
}
</style>
