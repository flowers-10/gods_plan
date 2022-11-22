<template>
  <div class="chat">
    <div class="userRoom">
      <div v-for="(item, k) in msgList" :key="k">
        {{item.set}}
      </div>
    </div>
    <div class="draw" id="drawBox">
      <canvas id="canvas" style="border-radius: 10px;"></canvas>
    </div>
    <div class="chat-box">
      <div class="chat-main">
        <div class="chat-info" id="chartInfo">
          <div class="info-detail" v-for="(item, k) in msgList" :key="k">
            <div :class="item.left ? 'head' : 'head-a'">
              <span class="name" :class="item.name === '系统' ? 'systemName':''">{{ item.name }}</span>
              <span>{{ item.date }}</span>
            </div>
            <div :class="item.left ? 'info-main' : 'info-main-a'">
              <span>{{ item.msg }}</span>
            </div>
          </div>
        </div>
        <div class="chat-message">
          <el-input v-model="msg" placeholder="请输入内容" type="textarea" rows="6" @keyup.enter.native="sendMessage">
            <el-button slot="append" type="primary" @click="sendMessage">发送</el-button>
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, nextTick } from 'vue'
const ws = new WebSocket(import.meta.env.VITE_BASE_WS)
// 'ws://localhost:8000/talk'
// 'ws://124.223.168.27:8889/talk'

const msg = ref()
const msgList = reactive<any>([])
const setDraw = reactive<any>([])
const names = ref()
// 打开了ws
const openWs = (e: any) => {
  // console.log('打开了ws',e);
  names.value = `${Math.floor(Math.random() * 1000)}号用户`
}

// 发送消息
const sendMessage = () => {
  const currentY = new Date().getFullYear()
  let currentM: number | string = new Date().getMonth() + 1
  let currentD: number | string = new Date().getDate()
  let currentH: number | string = new Date().getHours()
  let currentMin: number | string = new Date().getMinutes()
  let currentS: number | string = new Date().getSeconds()
  if (currentM < 10) {
    currentM = `0${currentM}`
  }
  if (currentD < 10) {
    currentD = `0${currentD}`
  }
  if (currentH < 10) {
    currentH = `0${currentH}`
  }
  if (currentMin < 10) {
    currentMin = `0${currentMin}`
  }
  if (currentS < 10) {
    currentS = `0${currentS}`
  }
  const date = `${currentY}-${currentM}-${currentD} ${currentH}:${currentMin}:${currentS}`
  const name = names.value
  const msgValue = msg.value.replace(/\r|\n/ig, "")
  let msgs: any = JSON.stringify({
    msg: msgValue,
    name: name,
    date: date,
    left: false,
  })
  // console.log(msgs);

  ws.send(msgs)
  // 发送完清空聊天框
  msg.value = ''
  const chartDiv = (document.getElementById('chartInfo') as HTMLDivElement)
  setTimeout(() => {
    chartDiv.scrollTop = chartDiv.scrollHeight
  }, 10);
}

// 收发消息
const handleWsMessage = (e: any) => {
  // console.log(e.data)
  const msg = JSON.parse(e.data)
  if (msg.name) {
    msgList.push(msg)
  } else {
    const cvs = (document.getElementById('canvas') as HTMLCanvasElement)
    const ctx = cvs.getContext('2d')
    if (ctx) {
      ctx.lineWidth = 2
      ctx.strokeStyle = 'red'
      ctx.lineTo(msg.setX, msg.setY)
      ctx.stroke()
    }
  }
}

// 画布
const init = () => {
  const drawDiv = document.getElementById('drawBox')
  let height = (drawDiv as HTMLDivElement).clientHeight
  let width = (drawDiv as HTMLDivElement).clientWidth
  const cvs = (document.getElementById('canvas') as HTMLCanvasElement)
  if (cvs) {
    const ctx = cvs.getContext('2d')
    cvs.width = width
    cvs.height = height
    let isDrawing = false
    if (ctx) {
      cvs.addEventListener('mousedown', e => {
        isDrawing = true
        ctx.moveTo((e.pageX - 50), (e.pageY - 108))
      })
      cvs.addEventListener('mousemove', e => {
        if (isDrawing) {
          ctx.lineWidth = 2
          ctx.strokeStyle = 'red'
          // console.log(e.pageX);

          ctx.lineTo((e.pageX - 50), (e.pageY - 108))
          ws.send(JSON.stringify({ setX: (e.pageX - 50), setY: (e.pageY - 108), palyer: 1 }))
          // ws.send()
          ctx.stroke()
        }
      })
      cvs.addEventListener('mouseup', e => {
        isDrawing = false
      })
    }

  }


}

onMounted(() => {
  ws.addEventListener('message', handleWsMessage, false)
  ws.addEventListener('open', openWs, false)
  init()
})
</script>

<style lang="less" scoped>
.chat {
  padding: 50px;
  width: 100%;
  height: 100%;
  display: flex;

  .draw {
    margin-right: 20px;
    background-color: var(--theme-bg-color);
    border-radius: 10px;
    width: 80%;
    height: 82vh;
  }

  .chat-box {
    padding: 20px;
    width: 20%;
    background-color: var(--theme-bg-color);
    border-radius: 10px;
    height: 82vh;
    min-width: 400px;


    .chat-main {
      width: 100%;
      height: 100%;

      .chat-info {
        width: 100%;
        height: 75%;
        overflow: auto;

        .info-detail {
          margin-bottom: 5px;
          color: var(--theme-color);

          .head {
            width: 100%;
            margin-bottom: 5px;
            display: flex;
            flex-direction: row-reverse;


          }

          .head-a {
            width: 100%;
            margin-bottom: 5px;

            .name {
              margin-right: 5px;
              color: rgb(22, 189, 240);

            }

            .systemName {
              margin-left: 5px;
              color: rgb(240, 74, 74);
            }
          }

          .info-main-a {
            font-size: 18px;
            font-family: 楷体;

          }

          .info-main {
            font-size: 18px;
            font-family: 楷体;
            display: flex;
            flex-direction: row-reverse;
          }
        }
      }

      .chat-message {
        margin-top: 10px;
        height: 20%;
      }
    }



  }

}

@media screen and(max-width:580px) {
  .chat {
    padding: 0 !important;
    display: block;

    .draw {
      width: 100%;
      height: 70%;
    }

    .chat-box {
      width: 100%;
      height: 30%;
    }
  }
}
</style>

