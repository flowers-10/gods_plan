<template>
<div>
    <div class="dialog" v-move >
      <transition enter-active-class="animate__animated animate__flipInX"
        leave-active-class="animate__animated animate__flipOutX">
        <div v-show="flag" class="pop-up">
          <div class="pop-up__title">
            <slot name="Title"></slot>
            <svg @click="clickTap" class="close feather feather-x-circle" width="24" height="24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M15 9l-6 6M9 9l6 6" />
            </svg>
          </div>
          <slot :name="slotName"></slot>
          <slot></slot>
          <slot name="Footer"></slot>
        </div>
      </transition>
    </div>
    <div class="overlay-app" :class="flag ? 'is-active' : ''" @click="clickTap"></div>
</div>
</template>

<script setup lang="ts">
import 'animate.css'
import { ref } from 'vue'
// 拖动效果
import { vMove } from '@/utils/vMove';

// 接收父组件传参
const props = defineProps<{ flag: boolean, slotName?: string }>()

// 派发自定义的事件
const emit = defineEmits(['on-click'])
// 点击关闭对话框
const clickTap = () => {
  emit('on-click', false)
}

</script>

<style lang="less" scoped>
.dialog {
  visibility: visible;
  opacity: 1;
  position: absolute;
  z-index: 999;
  width: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
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

  svg {
    margin-left: auto;
  }

  &__title {
    padding-bottom: 20px;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    // justify-content: space-between;
    align-items: center;
    color: var(--theme-color);
    cursor: pointer;
  }


}

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
</style>