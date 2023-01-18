<template>
  <div class="Setup">
    <div class="content-section">

      <ul>
        <li class="adobe-product">
          <div class="products">
            <svg t="1671672789819" fill="currentColor" class="icon" viewBox="0 0 1024 1024" version="1.1"
              xmlns="http://www.w3.org/2000/svg" p-id="3546">
              <path
                d="M512 65.4c-327 0-448 285.2-448 445.1 0 159.9 116.3 448 438.5 448 0 0 80.1 1.4 80.1-70.6s-36-49-36-100.8c0-51.9 36-74.9 53.3-74.9 17.3 0 131.1 8.6 194.5-15.9C857.7 671.9 960 594.1 960 461.6c0-116.7-121-396.2-448-396.2zM238.9 512c-43 0-77.8-34.8-77.8-77.8s34.8-77.8 77.8-77.8 77.8 34.8 77.8 77.8c-0.1 43-34.9 77.8-77.8 77.8z m146.7-192.5c-43 0-77.8-34.8-77.8-77.8s34.8-77.8 77.8-77.8c42.9 0 77.8 34.8 77.8 77.8s-34.8 77.8-77.8 77.8z m249.5 0c-42.9 0-77.8-34.8-77.8-77.8s34.8-77.8 77.8-77.8c42.9 0 77.8 34.8 77.8 77.8s-34.8 77.8-77.8 77.8zM783.2 512c-42.9 0-77.8-34.8-77.8-77.8s34.8-77.8 77.8-77.8 77.8 34.8 77.8 77.8c0.1 43-34.8 77.8-77.8 77.8z"
                p-id="3547"></path>
            </svg>
            Theme
          </div>
          <span class="status">
            <span class="status-circle" :class="ThemeVal ? 'green' : ''"></span>
            {{ ThemeVal ? 'Light' : 'Dark' }}</span>
          <div class="operation">
            <el-switch v-model="ThemeVal" style="--el-switch-on-color: #13ce66" @change="switchChangeTheme" />
          </div>
        </li>

        <li class="adobe-product">
          <div class="products">
            <svg t="1671673865200" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="5269" fill="currentColor">
              <path
                d="M513.024 65.536q93.184 0 175.616 35.84t143.872 97.28 97.28 143.872 35.84 175.616q0 94.208-35.84 176.64t-97.28 143.872-143.872 97.28-175.616 35.84q-94.208 0-176.64-35.84t-143.872-97.28-97.28-143.872-35.84-176.64q0-93.184 35.84-175.616t97.28-143.872 143.872-97.28 176.64-35.84zM513.024 909.312q80.896 0 152.064-30.72t124.416-83.968 83.968-124.416 30.72-152.064-30.72-152.064-83.968-124.416-124.416-83.968-152.064-30.72q-81.92 0-153.088 30.72t-124.416 83.968-83.968 124.416-30.72 152.064 30.72 152.064 83.968 124.416 124.416 83.968 153.088 30.72zM513.024 190.464q66.56 0 124.928 25.088t102.4 69.12 69.12 102.4 25.088 124.928-25.088 125.44-69.12 102.912-102.4 69.12-124.928 25.088-125.44-25.088-102.912-69.12-69.12-102.912-25.088-125.44 25.088-124.928 69.12-102.4 102.912-69.12 125.44-25.088z"
                p-id="5270"></path>
            </svg>
            AssistiveTouch
          </div>
          <span class="status">
            <span class="status-circle" :class="AssistiveTouchVal ? 'green' : ''"></span>
            {{ AssistiveTouchVal ? 'on' : 'off' }}</span>
          <div class="operation">
            <el-switch v-model="AssistiveTouchVal" style="--el-switch-on-color: #13ce66"
              @change="switchChangeAssistiveTouch" />
          </div>
        </li>

        <li class="adobe-product">
          <div class="products">
            <svg t="1671678238033" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="8286" fill="currentColor">
              <path
                d="M814.242086 794.219739q0 31.463687-20.499069 52.916201t-60.543762 21.452514l-364.216015 0q-19.068901 0-34.324022-7.150838t-26.219739-18.592179-17.162011-26.219739-6.197393-30.03352l0-713.176909q0-32.417132 18.592179-52.916201t61.497207-20.499069l367.07635 0q44.811918 0 63.404097 19.545624t18.592179 59.590317l0 715.083799zM734.1527 78.182495l-369.936685 0.953445-0.953445 318.450652 371.843575 0.953445zM550.137803 466.234637q-33.370577 0-62.450652 12.394786t-51.009311 34.324022-34.324022 51.009311-12.394786 62.450652 12.394786 61.973929 34.324022 50.532588 51.009311 34.324022 62.450652 12.394786q32.417132 0 61.497207-12.394786t51.009311-34.324022 34.324022-50.532588 12.394786-61.973929-12.394786-62.450652-34.324022-51.009311-51.009311-34.324022-61.497207-12.394786zM632.134078 625.459963q0 17.162011-6.674115 31.94041t-17.638734 26.219739-25.743017 17.638734-31.94041 6.197393q-34.324022 0-58.160149-23.836127t-23.836127-58.160149q0-17.162011 6.197393-31.94041t17.638734-25.743017 26.219739-17.638734 31.94041-6.674115 31.94041 6.674115 25.743017 17.638734 17.638734 25.743017 6.674115 31.94041z"
                p-id="8287"></path>
            </svg>
            Aplayer
          </div>
          <span class="status">
            <span class="status-circle" :class="AplayerVal ? 'green' : ''"></span>
            {{ AplayerVal ? 'on' : 'off' }}</span>
          <div class="operation">
            <el-switch v-model="AplayerVal" style="--el-switch-on-color: #13ce66" @change="switchChangeAplayer" />
          </div>
        </li>

        <li class="adobe-product">
          <div class="products">
            <svg t="1671679323958" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11873" fill="currentColor"><path d="M73.124573 0h877.779296a73.124573 73.124573 0 0 1 73.124573 73.124573v877.779296a73.124573 73.124573 0 0 1-73.124573 73.124573H73.124573A73.124573 73.124573 0 0 1 0 950.903869V73.124573A73.124573 73.124573 0 0 1 73.124573 0z m73.124573 146.277588l146.277588 366.419243-146.277588 364.940255h219.402161l146.277588-363.119962-146.277588-368.239536H146.277588z m365.679749 0l146.277588 366.419243-146.277588 364.940255h219.402161l146.277588-363.119962-146.277588-368.239536h-219.402161z" p-id="11874"></path></svg>
            Aplayer Mode
          </div>
          <span class="status">
            <span class="status-circle" :class="AplayerModeVal ? 'green' : ''"></span>
            {{ AplayerModeVal ? 'default' : 'fixed' }}</span>
          <div class="operation">
            <el-switch v-model="AplayerModeVal" style="--el-switch-on-color: #13ce66" @change="switchChangeAplayerMode" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useStore } from '@/stores';

const store = useStore()

const ThemeVal = ref(true)
const AssistiveTouchVal = ref(true)
const AplayerVal = ref(true)
const AplayerModeVal = ref(true)
watchEffect(() => {
  AssistiveTouchVal.value = store.AssistiveTouchFlag
  AplayerVal.value = store.AplayFlag
  AplayerModeVal.value = store.AplayFixedMode
})
const switchChangeTheme = (val: boolean) => {
  console.log(val);
  let status = localStorage.getItem('dark-light')
  if (status === 'dark') {
    localStorage.setItem('dark-light', 'light')
    document.body.classList.add('light-mode')
    document.querySelector('.TopButton')?.classList.remove('black')
    document.querySelector('.TopButton')?.classList.add('white')
  } else if (status === 'light') {
    localStorage.setItem('dark-light', 'dark')
    document.body.classList.remove('light-mode')
    document.querySelector('.TopButton')?.classList.remove('white')
    document.querySelector('.TopButton')?.classList.add('black')
  }
}

const switchChangeAssistiveTouch = (val: boolean) => {
  store.setAssistiveTouch(val)
}

const switchChangeAplayer = (val: boolean) => {
  store.setAplayFlag(val)
}

const switchChangeAplayerMode = (val: boolean) => {
  store.setAplayFixedMode(val)
}



onMounted(() => {
  let status = localStorage.getItem('dark-light')
  if (status === 'light') {
    // 如果是 light ，就向 body 添加全局 class：light-mode
    document.body.classList.add('light-mode')
    document.querySelector('.TopButton')?.classList.remove('white')
    document.querySelector('.TopButton')?.classList.add('black')
    ThemeVal.value = true
  } else if (status === 'dark') {
    // 如果是 dark ，就向 body 删除全局 class：light-mode
    document.body.classList.remove('light-mode')
    document.querySelector('.TopButton')?.classList.remove('black')
    document.querySelector('.TopButton')?.classList.add('white')
    ThemeVal.value = false
  } else {
    // 如果不存在，就向用户存储默认dark
    localStorage.setItem('dark-light', 'dark')
    ThemeVal.value = false
  }
})
</script>

<style lang="less" scoped>
.Setup {
  width: 100%;
  padding: 20px 40px;
}

.content-section {
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  max-width: 1280px;

  &-title {
    color: var(--content-title-color);
    margin-bottom: 14px;
  }

  ul {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: space-around;
    background-color: var(--content-bg);
    padding-left: 0;
    margin: 0;
    border-radius: 14px;
    border: 1px solid var(--theme-bg-color);
    cursor: pointer;
    color: var(--theme-color);

    li {
      list-style: none;
      padding: 10px 18px;
      display: flex;
      align-items: center;
      font-size: 16px;
      width: 100%;
      height: 100%;
      white-space: nowrap;
      transition: 0.3s;

      &:hover {
        background-color: var(--theme-bg-color);

        &:first-child {
          border-radius: 13px 13px 0 0;
        }

        &:last-child {
          border-radius: 0 0 13px 13px;
        }
      }

      &+li {
        border-top: 1px solid var(--border-color);
      }

      .products {
        display: flex;
        align-items: center;
        width: 150px;

        @media screen and (max-width: 480px) {
          width: 120px;
        }
      }

    }

    svg {
      width: 28px;
      border-radius: 6px;
      margin-right: 16px;
      flex-shrink: 0;
    }
  }

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
    background-color: #ccc;
    position: absolute;
    border-radius: 50%;
    top: 9px;
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

.operation {
  margin-left: auto;
}

@media screen and (max-width: 415px) {
  .adobe-product .menu {
    display: none;
  }
}

.content-section .close {
  margin-right: 0;
  width: 24px;
}
</style>