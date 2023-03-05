<template>
  <div class="main-container">

    <main-header menuLink="Works" :menuItemsList="menuItemsList"></main-header>

    <div class="content-wrapper">
      <content-section v-for="(item, index) in menuItemsList" :key="index" :title="item.title" :slotName="item.slotName">
        <template #[item.slotName]>
          <div class="content-container" v-if="index === 0">
            <a class="card" href="https://www.700e.com/" target="_blank">
              <img src="@/assets/images/700eweb.png" alt="">
              <div class="mask"></div>
              <div class="font">汽灵灵工业互联网平台</div>
            </a>
            <a class="card" href="https://700e.com/new/industry" target="_blank">
              <img src="@/assets/images/700park.png" alt="">
              <div class="mask"></div>
              <div class="font">汽灵灵聚能智造园</div>
            </a>
            <a class="card" href="http://datascreen.700e.com/" target="_blank">
              <img class="datascreen" src="@/assets/images/700datascreen.png" alt="">
              <div class="mask"></div>
              <div class="font">汽灵灵工业互联网平台监控中心</div>
            </a>
            <a class="card" href="https://mes.700e.com/#/" target="_blank">
              <img src="@/assets/images/700mes.png" alt="">
              <div class="mask"></div>
              <div class="font">汽灵灵MES</div>
            </a>
            <a class="card" href="http://admin.700e.com/login" target="_blank">
              <img src="@/assets/images/700system.png" alt="">
              <div class="mask"></div>
              <div class="font">汽灵灵后台管理</div>
            </a>
            <a class="card" href="http://taober.cn/login" target="_blank">
              <img src="@/assets/images/700shop.png" alt="">
              <div class="mask"></div>
              <div class="font">汽灵灵商城管理系统</div>
            </a>
            <a class="card" href="https://www.nbmaxauto.com/" target="_blank">
              <img src="@/assets/images/max.png" alt="">
              <div class="mask"></div>
              <div class="font">max国际站门户</div>
            </a>
            <a class="card" href="https://www.steel-tubes.com/" target="_blank">
              <img src="@/assets/images/rich.png" alt="">
              <div class="mask"></div>
              <div class="font">rich国际站门户</div>
            </a>
            <a class="card" href="https://en.goodwe.com/presenting-clean-energy-solutions-through-pv-inverter-technology"
              target="_blank">
              <img src="@/assets/images/goodwe.png" alt="">
              <div class="mask"></div>
              <div class="font">goodwe国际站门户</div>
            </a>
            <a class="card" href="https://www.nbmaxauto.com/" target="_blank">
              <img src="@/assets/images/xyWMS.png" alt="">
              <div class="mask"></div>
              <div class="font">萧跃WMS系统</div>
            </a>
            <a class="card" href="https://github.com/flowers-10/gods_plan" target="_blank">
              <img src="@/assets/images/my.png" alt="">
              <div class="mask"></div>
              <div class="font">个人项目</div>
            </a>
          </div>
          <div class="content-container" v-if="index === 1">
            <div class="card mobile">
              <img src="@/assets/images/700app.jpg" alt="">
              <a class="mask"></a>
              <div class="font">汽灵灵app</div>
            </div>
            <div class="card mobile">
              <img src="@/assets/images/700parkMobile.png" alt="">
              <a class="mask"></a>
              <div class="font">汽灵灵聚能智造园小程序</div>
            </div>
            <div class="card mobile">
              <img src="@/assets/images/700mesMobile.png" alt="">
              <a class="mask"></a>
              <div class="font">汽灵灵MES小程序</div>
            </div>
            <div class="card mobile">
              <img src="@/assets/images/700destock.png" alt="">
              <a class="mask"></a>
              <div class="font">汽灵灵去库存小程序</div>
            </div>
            <div class="card mobile">
              <img src="@/assets/images/haishuyun.png" alt="">
              <a class="mask"></a>
              <div class="font">海数云小程序</div>
            </div>
            <div class="card mobile">
              <img src="@/assets/images/erp.png" alt="">
              <a class="mask"></a>
              <div class="font">ERP系统小程序</div>
            </div>
            <div class="card mobile">
              <img src="@/assets/images/wms.png" alt="">
              <a class="mask"></a>
              <div class="font">萧跃WMS系统小程序</div>
            </div>
            <a class="card mobile" href="https://github.com/flowers-10/gods_plan" target="_blank">
              <img src="@/assets/images/mym.png" alt="">
              <div class="mask"></div>
              <div class="font">个人项目h5</div>
            </a>
          </div>
          <div class="content-container" v-if="index === 2">
            <a class="card" href="https://github.com/flowers-10/gods_plan_electron" target="_blank">
              <img src="@/assets/images/electron.png" alt="">
              <div class="mask"></div>
              <div class="font">个人项目Election</div>
            </a>
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
      padding: 20px 10px 100px 10px;
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

  @media screen and (max-width: 1400px) {

    padding: 5px;
  }

  .mobile {
    width: 25% !important;
    height: auto !important;

    @media screen and (max-width: 1400px) {
      height: auto !important;
      width: 33.333% !important;
      padding: 10px !important;
    }
    @media screen and (max-width: 480px) {
      height: auto !important;
      width: 100% !important;
      padding: 0px;
    }
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

    @media screen and (max-width: 1400px) {
      height: auto;
      width: 100%;
      padding: 0px;
    }

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
      bottom: -300px;
      width: 100%;
      text-align: center;
      border-radius: 14px;
      position: absolute;
      left: 0;
      transition: 0.2s ease;
      font-size: 60px;
      padding: 20px;
      @media screen and (max-width: 1400px) {
        font-size: 40px;
      }

      @media screen and (max-width: 480px) {
        font-size: 18px;
      }
    }

    &:hover {
      transform: scale(1.02);
    }

    &:hover .font {
      transform: translateY(-500px);
    }

    &:hover .mask {
      display: block;
      transform: scale(1.02);
    }
  }
}</style>