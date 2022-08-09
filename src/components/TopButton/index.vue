<template>
  <div ref="TopButton" @click="goTop" class="TopButton" :class="[status === 'dark' ? 'black' : 'white',flag ?'active':'']" alt=""></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
const TopButton = ref()
// 回到顶部
const goTop = (e: Event) => {
  let parent = (<HTMLElement>e.target).parentNode
  if (parent) {
    (<HTMLElement>parent).scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
}
const flag = ref<boolean>(false)

// 监听滚轮
const handleScroll = () => {
  let scrollTop:number = TopButton.value.parentNode.scrollTop
  if(scrollTop>100) {
    flag.value  = true
  }else {
    flag.value  = false
  }
}

let status = localStorage.getItem('dark-light')

onMounted(() => {
  window.addEventListener('scroll', handleScroll, true)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll, true)
})


</script>

<style lang="less" scoped>
.TopButton {
  width: 90px;
  height: 100px;
  position: fixed;
  bottom: -100px;
  left: 30px;
  cursor: pointer;
  background-position: center center;
  background-size: 100% 100%;
  transition: 0.35s;
  @media screen and (max-width:1050px) {
    width: 45px;
    height: 50px;
    left: 15px
  }

  @media screen and (max-width:480px) {
    width: 32px;
    height: 35px;
    left: 6px
  }


}
.active {
  bottom: 0px;
}

.black {
  background-image: url('../../assets/images/TopButtonB.png');

  &:hover {
    background-image: url('../../assets/images/TopButtonW.png');
  }
}

.white {
  background-image: url('../../assets/images/TopButtonW.png');

  &:hover {
    background-image: url('../../assets/images/TopButtonB.png');
  }
}
</style>