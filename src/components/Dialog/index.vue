<template>
  <div class="dialog" v-move>
    <transition enter-active-class="animate__animated animate__flipInX"
      leave-active-class="animate__animated animate__flipOutX">
      <div v-show="flag" class="pop-up">
        <div class="pop-up__title"><span class="checkout" :class="loginName==='Login' ?'activeColor':''" @click="checkoutLogin('Login')">Login</span>
          <span>|</span>
          <span class="checkout" 
          :class="loginName==='Password' ?'activeColor':''"
          @click="checkoutLogin('Password')">Password</span>
          <svg @click="clickTap" class="close feather feather-x-circle" width="24" height="24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M15 9l-6 6M9 9l6 6" />
          </svg>
        </div>
        <slot :name="loginName"></slot>
        <!-- <slot name="Password"></slot> -->
        <div class="content-button-wrapper">
          <button class="content-button status-button open close" @click="clickTap">Cancel</button>
          <button class="content-button status-button" @click="clickContinue">Continue</button>
        </div>
      </div>
    </transition>
  </div>
  <div class="overlay-app" :class="flag ? 'is-active' : ''"></div>
</template>

<script setup lang="ts">
import 'animate.css'
import { ref } from 'vue'
import { vMove } from '@/utils/vMove';
// 拖动效果

// 接收父组件传参
const props = defineProps<{ flag: boolean, LoginForm: any, }>()
// 切换登录模式
let loginName = ref<string>('Login')

// 派发自定义的事件
const emit = defineEmits(['on-click', 'on-continue', 'on-checkout'])
// 点击关闭对话框
const clickTap = () => {
  emit('on-click', false)
}
// 点击继续按钮
const clickContinue = () => {
  // console.log(props.LoginForm);
  emit('on-continue')
}
// 点击切换登录模式
const checkoutLogin=(name:string)=>{
  loginName.value = name
  emit('on-checkout',name)
}
</script>

<style lang="less" scoped>
.overlay-app {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: all;
  background-color: rgba(36, 39, 59, 0.8);
  opacity: 0;
  visibility: hidden;
  transition: 0.3s;
  z-index: 99;

  &.is-active {
    visibility: visible;
    opacity: 1;
  }
}

.dialog {
  visibility: visible;
  opacity: 1;
  position: absolute;
  z-index: 999;
  
  // top: 30%;
  // left: 40%;
  // transform: (translate(-50%, -50%));
  width: 500px;

  @media screen and (max-width: 570px) {
    width: 100%;
    left: 0%;
  }
}

.pop-up {
  cursor: move;
  padding: 30px 40px;
  overflow-y: auto;
  box-shadow: 0px 6px 30px rgba(0, 0, 0, 0.4);
  background-color: var(--popup-bg);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  white-space: normal;
  visibility: visible;
  opacity: 1;

  &__title {
    padding-bottom: 20px;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    // justify-content: space-between;
    align-items: center;
    color: var(--theme-color);
    cursor: pointer;

    span {
      margin-right: 20px;
      color: var(--content-title-color);

    }
    .activeColor {
      color: var(--theme-color);
    }
    .checkout:hover {
      color: #3a6df0;

    }
    svg{
      margin-left: auto;
    }
  }

  &__subtitle {
    white-space: normal;
    margin: 20px 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.8em;
    color: var(--theme-color);

    a {
      color: var(--theme-color);
    }
  }
}

.content-button-wrapper .content-button.status-button.open.close {
  width: auto;
}

.status {
  margin-left: auto;
  width: 140px;
  font-size: 15px;
  position: relative;

  @media screen and (max-width: 700px) {
    display: none;
  }

  &-circle {
    width: 6px;
    height: 6px;
    background-color: #396df0;
    position: absolute;
    border-radius: 50%;
    top: 4px;
    left: -20px;

    &.green {
      background-color: #3bf083;
    }
  }

  &-button {
    font-size: 15px;
    margin-top: 0;
    padding: 6px 24px;

    @media screen and (max-width: 390px) {
      padding: 6px 14px;
    }

    &.open {
      background: none;
      color: var(--button-inactive);
      border: 1px solid var(--button-inactive);
    }

    &:not(.open):hover {
      color: #fff;
      border-color: #fff;
    }
  }
}

.content-button {
  background-color: #3a6df0;
  border: none;
  padding: 8px 26px;
  color: #fff;
  border-radius: 20px;
  margin-top: 16px;
  cursor: pointer;
  transition: 0.3s;
  white-space: nowrap;
}

.content-section .close {
  margin-right: 0;
  width: 24px;
}

.checkbox-wrapper {
  color: var(--theme-color);
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;

  &+.checkbox-wrapper {
    margin: 20px 0 40px;
  }
}

.checkbox {
  display: none;
}

.checkbox+label {
  display: flex;
  align-items: center;

  &:before {
    content: "";
    margin-right: 10px;
    width: 15px;
    height: 15px;
    border: 1px solid var(--theme-color);
    border-radius: 4px;
    cursor: pointer;
    flex-shrink: 0;
  }
}

.checkbox:checked+label:before {
  background-color: #3a6df0;
  border-color: #3a6df0;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='3' stroke-linecap='round' stroke-linejoin='round' class='feather feather-check'%3e%3cpath d='M20 6L9 17l-5-5'/%3e%3c/svg%3e");
  background-position: 50%;
  background-size: 12px;
  background-repeat: no-repeat;
}

.content-button-wrapper {
  margin-top: auto;
  margin-left: auto;

  .open {
    margin-right: 8px;
  }
}

.content-button:not(.open):hover {
  background: #1e59f1;
}
</style>