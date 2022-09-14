<template>
  <div class="chat">
    <div class="chat-box">
      <div class="chat-main">
        <div class="chat-info">
          <div class="info-detail" v-for="(item, k) in msgList" :key="k">
            <div :class="item.left ? 'head' : 'head-a'">
              <span class="name">{{ item.name }}</span>
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
import { ref, onMounted, reactive } from 'vue'
const ws = new WebSocket(import.meta.env.VITE_BASE_WS)
// 'ws://localhost:8000/talk'
// 'ws://124.223.168.27:8889/talk'

let msg = ref()
let msgList = reactive<any>([])
let names = ref()
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
  let msgs: any = JSON.stringify({
    msg: msg.value,
    name: name,
    date: date,
    left: false
  })
  ws.send(msgs)
  // 发送完清空聊天框
  msg.value = ''
}

// 收发消息
const handleWsMessage = (e: any) => {
  // console.log(e.data)
  const msg = JSON.parse(e.data)
  msgList.push(msg)
  console.log(msg.name);
}




onMounted(() => {
  ws.addEventListener('message', handleWsMessage, false)

  ws.addEventListener('open', openWs, false)

})
</script>

<style lang="less" scoped>
.chat {
  padding: 50px;
  display: flex;
  justify-content: center;
  width: 100%;

  .chat-box {
    padding: 20px;
    width: 100%;
    height: calc(100% - 58px);
    background-color: var(--theme-bg-color);
    border-radius: 10px;
    display: flex;
    height: 100%;

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

            .name {
              margin-left: 5px;
              color: rgb(240, 74, 74);
            }
          }

          .head-a {
            width: 100%;
            margin-bottom: 5px;

            .name {
              margin-right: 5px;
              color: rgb(22, 189, 240);

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
  }
}
</style>

