<template>
  <div class="main-container">

    <main-header menuLink="Works" :menuItemsList="menuItemsList"></main-header>

    <div class="content-wrapper">
      <content-section v-for="(item, index) in menuItemsList" :key="index" :title="item.title" :slotName="item.slotName">
        <template #[item.slotName]>
          <div class="content-container" v-if="index === 0">
            <div class="card">
              <img src="@/assets/images/700eweb.png" alt="">
              <a class="mask" href="https://www.700e.com/" target="_blank"></a>
              <div class="font">汽灵灵工业互联网平台</div>
            </div>
            <div class="card">
              <img src="@/assets/images/700park.png" alt="">
              <a class="mask" href="https://700e.com/new/industry" target="_blank"></a>
              <div class="font">汽灵灵聚能智造园</div>
            </div>
            <div class="card">
              <img class="datascreen" src="@/assets/images/700datascreen.png" alt="">
              <a class="mask" href="http://datascreen.700e.com/" target="_blank"></a>
              <div class="font">汽灵灵工业互联网平台监控中心</div>
            </div>
            <div class="card">
              <img src="@/assets/images/700mes.png" alt="">
              <a class="mask" href="https://mes.700e.com/#/" target="_blank"></a>
              <div class="font">汽灵灵MES</div>
            </div>
            <div class="card">
              <img src="@/assets/images/700system.png" alt="">
              <a class="mask" href="http://admin.700e.com/login" target="_blank"></a>
              <div class="font">汽灵灵后台管理</div>
            </div>
            <div class="card">
              <img src="@/assets/images/700shop.png" alt="">
              <a class="mask" href="http://taober.cn/login" target="_blank"></a>
              <div class="font">汽灵灵商城管理系统</div>
            </div>
            <div class="card">
              <img src="@/assets/images/max.png" alt="">
              <a class="mask" href="https://www.nbmaxauto.com/" target="_blank"></a>
              <div class="font">国际站门户</div>
            </div>
            <div class="card">
              <img src="@/assets/images/my.png" alt="">
              <a class="mask" href="https://github.com/flowers-10/gods_plan" target="_blank"></a>
              <div class="font">个人项目</div>
            </div>
          </div>
          <div class="content-container" v-if="index === 1">
            <div class="card mobile">
              <img src="@/assets/images/mym.png" alt="">
              <a class="mask" href="https://github.com/flowers-10/gods_plan" target="_blank"></a>
              <div class="font">个人项目</div>
            </div>
          </div>
          <div class="content-container" v-if="index === 2">
            <div class="card">
              <img src="@/assets/images/electron.png" alt="">
              <a class="mask" href="https://github.com/flowers-10/gods_plan_electron" target="_blank"></a>
              <div class="font">个人项目</div>
            </div>
          </div>
        </template>
      </content-section>
    </div>


  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

window.addEventListener('message', function (event) {
  this.localStorage.setItem("token", event.data)
}, false)


const menuItemsList = ref([{ title: 'Web', slotName: 'me' }, { title: 'Mobile', slotName: 'music' }, { title: 'Desktop', slotName: 'music' }])

</script>

<style lang="less" scoped>
.main-container {
  width: 100vw;
  position: relative;
  overflow: hidden;

  .content-wrapper {
    display: flex;
    flex-direction: column;
    color: var(--theme-color);
    padding: 20px 40px 100px;
    height: 100%;
    overflow: auto;
    background-color: var(--theme-bg-color);
    background-size: 100% 100%;
    background-position: center center;

    @media screen and (max-width: 510px) {
      padding: 20px 20px 100px 20px;
    }



  }
}

.content-container {
  background-color: var(--content-bg);
  border-radius: 14px;
  border: 1px solid var(--theme-bg-color);
  padding: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  // justify-content: center;
  flex-wrap: wrap;

  .mobile {
    // width: 50% !important;
  }

  .card {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 450px;
    border-radius: 14px;
    padding: 20px;
    cursor: pointer;
    transition: all 1s ease;
    overflow: hidden !important;
    position: relative;
    margin-bottom: 20px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 14px;
      transition: all 1s ease;
      // object-fit: cover;
    }

    .datascreen {
      width: 200% !important;
      height: 100% !important;
    }

    &:hover .datascreen {
      transform: translateX(-50%);
    }

    .mask {
      top: 0;
      left: 0;
      border-radius: 14px;
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: rgba(0, 0, 0, 0.5);
      display: none;
    }

    .font {
      bottom: -200px;
      width: 100%;
      text-align: center;
      border-radius: 14px;
      position: absolute;
      transition: 0.2s ease;
      font-size: 60px;
    }

    &:hover {
      transform: scale(1.02);
    }

    &:hover .font {
      transform: translateY(-400px);
    }

    &:hover .mask {
      display: block;
      transform: scale(1.02);
    }
  }
}</style>