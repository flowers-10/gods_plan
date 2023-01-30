<template>
  <div class="discover">
    <section class="main-structure" :class="!menuFlag ? 'main-structureActive' : ''">
      <header>
        <a href="#">
          <div class="logo">Travel</div>
        </a>
        <div class="menu-logo" @click="menuFlag = !menuFlag">
          <svg v-if="menuFlag" fill="currentColor" t="1657243695392" class="icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="2283" width="128" height="128">
            <path
              d="M916.238694 290.722314 138.030703 290.722314c-11.30344 0-20.466124-9.162684-20.466124-20.466124s9.162684-20.466124 20.466124-20.466124L916.238694 249.790066c11.30344 0 20.466124 9.162684 20.466124 20.466124S927.542134 290.722314 916.238694 290.722314z"
              p-id="2284"></path>
            <path
              d="M936.702772 495.52477c0 11.307533-9.15859 20.466124-20.466124 20.466124l-778.203898 0c-11.307533 0-20.466124-9.15859-20.466124-20.466124 0-11.2973 9.15859-20.466124 20.466124-20.466124l778.203898 0C927.544181 475.058646 936.702772 484.22747 936.702772 495.52477z"
              p-id="2285"></path>
            <path
              d="M916.238694 741.263567 138.030703 741.263567c-11.30344 0-20.466124-9.162684-20.466124-20.466124s9.162684-20.466124 20.466124-20.466124L916.238694 700.331319c11.30344 0 20.466124 9.162684 20.466124 20.466124S927.542134 741.263567 916.238694 741.263567z"
              p-id="2286"></path>
          </svg>

          <svg v-if="!menuFlag" fill="currentColor" t="1657250521247" class="icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="8695" width="128" height="128">
            <path
              d="M576 512l277.333333 277.333333-64 64-277.333333-277.333333L234.666667 853.333333 170.666667 789.333333l277.333333-277.333333L170.666667 234.666667 234.666667 170.666667l277.333333 277.333333L789.333333 170.666667 853.333333 234.666667 576 512z"
              fill="#2c2c2c" p-id="8696"></path>
          </svg>
        </div>
      </header>
      <div class="content">
        <video :src="item.video" autoplay muted loop v-for="(item, index) in videoList" :key="index"
          :class="index == activeIndex ? 'active' : ''"></video>

        <div class="video-overlay"></div>

        <section class="text-description">
          <h1>never stop</h1>
          <h2>explore the world</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta culpa
            dolore reiciendis ipsa ducimus impedit exercitationem incidunt
            sequi? Esse, laudantium. Fugiat aperiam numquam labore aliquam
            delectus tempora ad, accusantium assumenda.
          </p>
          <a href="#">Explore</a>
        </section>
      </div>
      <footer>
        <a href="https://gitee.com/flowers-11" target="_blank">
          <svg fill="currentColor" t="1661998174142" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2652"><path d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512-230.4 512-512 512z m259.2-569.6H480c-12.8 0-25.6 12.8-25.6 25.6v64c0 12.8 12.8 25.6 25.6 25.6h176c12.8 0 25.6 12.8 25.6 25.6v12.8c0 41.6-35.2 76.8-76.8 76.8h-240c-12.8 0-25.6-12.8-25.6-25.6V416c0-41.6 35.2-76.8 76.8-76.8h355.2c12.8 0 25.6-12.8 25.6-25.6v-64c0-12.8-12.8-25.6-25.6-25.6H416c-105.6 0-188.8 86.4-188.8 188.8V768c0 12.8 12.8 25.6 25.6 25.6h374.4c92.8 0 169.6-76.8 169.6-169.6v-144c0-12.8-12.8-25.6-25.6-25.6z" p-id="2653"></path></svg>
        </a>
        <a href="https://github.com/VIBom?tab=repositories" target="_blank"><svg t="1657245669246" class="icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="5928" fill="currentColor">
            <path
              d="M511.542857 14.057143C228.914286 13.942857 0 242.742857 0 525.142857 0 748.457143 143.2 938.285714 342.628571 1008c26.857143 6.742857 22.742857-12.342857 22.742858-25.371429v-88.571428c-155.085714 18.171429-161.371429-84.457143-171.771429-101.6C172.571429 756.571429 122.857143 747.428571 137.714286 730.285714c35.314286-18.171429 71.314286 4.571429 113.028571 66.171429 30.171429 44.685714 89.028571 37.142857 118.857143 29.714286 6.514286-26.857143 20.457143-50.857143 39.657143-69.485715-160.685714-28.8-227.657143-126.857143-227.657143-243.428571 0-56.571429 18.628571-108.571429 55.2-150.514286-23.314286-69.142857 2.171429-128.342857 5.6-137.142857 66.4-5.942857 135.428571 47.542857 140.8 51.771429 37.714286-10.171429 80.8-15.542857 129.028571-15.542858 48.457143 0 91.657143 5.6 129.714286 15.885715 12.914286-9.828571 76.914286-55.771429 138.628572-50.171429 3.314286 8.8 28.228571 66.628571 6.285714 134.857143 37.028571 42.057143 55.885714 94.514286 55.885714 151.2 0 116.8-67.428571 214.971429-228.571428 243.314286a145.714286 145.714286 0 0 1 43.542857 104v128.571428c0.914286 10.285714 0 20.457143 17.142857 20.457143 202.4-68.228571 348.114286-259.428571 348.114286-484.685714 0-282.514286-229.028571-511.2-511.428572-511.2z"
              p-id="5929"></path>
          </svg>
        </a>

        <a href="https://blog.csdn.net/m0_68324632?type=blog" target="_blank">
          <svg t="1661998225814" class="icon" viewBox="0 0 1024 1024" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2869" width="128" height="128"><path d="M512 1024C229.2224 1024 0 794.7776 0 512 0 229.2224 229.2224 0 512 0c282.7776 0 512 229.2224 512 512 0 282.7776-229.2224 512-512 512z m17.066667-413.525333c34.850133 4.352 68.778667 5.12 102.741333 2.0992 23.04-2.048 44.817067-8.362667 64.170667-21.9136 38.212267-26.794667 49.783467-85.1968 24.251733-123.050667-14.626133-21.7088-36.8128-30.344533-60.757333-35.498667-35.054933-7.543467-70.4512-5.751467-105.847467-3.413333-5.666133 0.3584-6.7584 3.072-7.236267 8.209067-3.072 32.682667-6.536533 65.314133-9.813333 97.962666-2.5088 24.814933-4.932267 49.629867-7.509333 75.605334z m53.4016-33.928534c1.962667-20.906667 3.6352-39.338667 5.4272-57.770666 1.553067-15.906133 3.413333-31.778133 4.727466-47.701334 0.3584-4.283733 1.553067-6.656 5.956267-6.382933 15.616 1.041067 31.709867 0.034133 46.728533 3.652267 36.488533 8.823467 48.725333 54.306133 23.3472 83.029333-15.8208 17.902933-36.7616 23.586133-59.255466 25.088-8.465067 0.546133-17.015467 0.085333-26.9312 0.085333zM512 434.295467c-2.184533-0.648533-3.5328-1.1776-4.932267-1.4336-37.717333-6.877867-75.690667-8.328533-113.646933-2.816-20.974933 3.037867-41.0112 9.489067-57.480533 23.330133-22.9888 19.319467-21.640533 46.848 4.4032 62.0032 13.056 7.594667 28.023467 12.509867 42.5984 17.288533 14.08 4.608 28.996267 6.826667 43.144533 11.264 12.5952 3.925333 14.011733 14.318933 3.584 22.306134-3.345067 2.56-7.441067 5.085867-11.537067 5.751466-11.195733 1.826133-22.698667 4.386133-33.826133 3.566934-24.098133-1.774933-48.042667-5.461333-72.5504-8.430934-1.365333 10.615467-2.935467 23.0912-4.5568 35.9424 4.181333 1.365333 7.68 2.730667 11.264 3.618134 33.9456 8.4992 68.386133 9.608533 102.912 5.12 20.087467-2.6112 39.4752-7.901867 56.695467-19.029334 28.603733-18.4832 36.693333-57.1904-4.676267-75.383466-14.506667-6.382933-30.190933-10.410667-45.482667-15.086934-11.4176-3.4816-23.313067-5.614933-34.525866-9.5232-9.7792-3.413333-11.144533-12.202667-3.037867-18.397866 4.6592-3.549867 10.717867-6.997333 16.384-7.3728a480.853333 480.853333 0 0 1 53.384533-0.853334c15.377067 0.699733 30.651733 3.549867 46.4896 5.5296L512 434.295467z m257.143467 2.048L750.933333 614.2976h54.152534c4.778667-45.636267 9.710933-90.7264 14.062933-135.8848 0.6144-6.365867 2.3552-8.840533 8.686933-9.0112 11.434667-0.273067 22.8864-1.979733 34.286934-1.570133 23.722667 0.853333 42.3936 9.728 38.4 43.264-2.901333 24.2688-5.597867 48.571733-8.2432 72.874666-1.092267 10.069333-1.826133 20.189867-2.730667 30.4128h55.330133c3.584-35.259733 7.9872-70.058667 10.496-104.994133 3.413333-47.4624-17.7664-73.3184-64.682666-80.213333-40.96-6.007467-81.339733-0.341333-121.5488 7.133866z m-483.498667 134.6048c-8.738133 1.297067-16.384 2.798933-24.098133 3.4816-25.6512 2.235733-51.319467 3.9424-76.305067-4.266667-13.909333-4.590933-24.6784-12.578133-29.7984-25.9584-7.901867-20.701867 0.887467-47.104 19.831467-60.3136 17.373867-12.117333 37.717333-15.9232 58.453333-15.9232 22.545067-0.017067 45.090133 2.423467 68.232533 3.84L307.2 432.298667c-15.069867-1.723733-29.4912-3.925333-43.997867-4.9152-41.0112-2.798933-80.64 2.6112-117.469866 20.462933-30.020267 14.557867-52.053333 36.010667-58.6752 68.130133-7.850667 38.144 11.537067 69.495467 51.7632 85.845334 19.1488 7.765333 39.287467 12.509867 60.0064 12.5952 24.746667 0.1024 49.493333-1.570133 74.205866-2.952534 3.106133-0.170667 8.311467-2.901333 8.669867-5.034666 1.979733-11.554133 2.730667-23.278933 3.9424-35.464534z"  p-id="2870"></path></svg>
        </a>
        <a href="https://juejin.cn/user/941654589047789" target="_blank">
          <svg  t="1675088544842" class="icon qq" fill="currentColor" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2892" width="200" height="200"><path d="M824.8 613.2c-16-51.4-34.4-94.6-62.7-165.3C766.5 262.2 689.3 112 511.5 112 331.7 112 256.2 265.2 261 447.9c-28.4 70.8-46.7 113.7-62.7 165.3-34 109.5-23 154.8-14.6 155.8 18 2.2 70.1-82.4 70.1-82.4 0 49 25.2 112.9 79.8 159-26.4 8.1-85.7 29.9-71.6 53.8 11.4 19.3 196.2 12.3 249.5 6.3 53.3 6 238.1 13 249.5-6.3 14.1-23.8-45.3-45.7-71.6-53.8 54.6-46.2 79.8-110.1 79.8-159 0 0 52.1 84.6 70.1 82.4 8.5-1.1 19.5-46.4-14.5-155.8z" p-id="2893"></path></svg>
          <div class="floatFrame">
            q群号：855139333
          </div>
        </a>

        
      </footer>
    </section>
    <section class="aside-menu">
      <a href="#" @click="activeIndex=index" v-for="(item, index) in contentList" :key="index"><span>{{ item.title
      }}</span></a>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getVideo } from '@/api/gsApi'
// 类型
type videoLists = {
  video: string;
};
// video列表
const videoList = ref<videoLists[]>();
// 获取video
const getVideos = async () => {
  const res: any = await getVideo()
  // console.log(res);
  let message = res.message
  videoList.value = message;

};
// 控制视频选择文本更换
let activeIndex = ref(2);
// 文字内容
const contentList = [
  {
    title: 'Island'
  },
  {
    title: 'Spring'
  },
  {
    title: 'Summer',
  },
  {
    title: 'Autumn',
  },
  {
    title: 'Winter',
  },
];
// 点击菜单
const menuFlag = ref(true);
onMounted(() => {
  getVideos();
});
</script>

<style lang="less" scoped>
@--main-desktop-font-size: 30px;
@--main-pad-font-size: calc(@--main-desktop-font-size * 4.8 / 6);
@--main-phone-font-size: calc(@--main-pad-font-size * 4.8 / 6);
@--main-border-color: #fff;
@--header-toggle-width: 30px;
@--main-background-color: #333;
@--main-text-color: #fff;
@--screen-desktop-padding-top-bottom: 50px;
@--screen-desktop-padding-left-right: 100px;
@--screen-pad-padding-top-bottom: 10px;
@--screen-pad-padding-left-right: 30px;
@--theme-color: #0080ff;
@--menu-width: 10em;
@--main-structure-left: 2em;
@--menu-margin-bottom: 1em;

.discover {
  -webkit-user-drag: none;
  display: flex;
  all: unset;
  font-size: @--main-desktop-font-size;
  font-family: "Poppins", sans-serif;
  color: var(--theme-color);
  background-color: @--main-background-color;
}


.main-structure,
.main-structure header,
.main-structure .content,
.main-structure footer {
  width: 100%;
  // border: 5px dashed @--main-border-color;
  user-select: none;
  // background-color: @--main-background-color;
  box-sizing: border-box;
}

.main-structure header,
.main-structure .content,
.main-structure footer {
  padding: @--screen-desktop-padding-top-bottom @--screen-desktop-padding-left-right;
  transition: 0.5s;
}

.main-structureActive {
  width: calc(100% - @--menu-width - @--main-structure-left) !important;
  height: calc(100vh - 2 * @--main-structure-left) !important;
  top: calc(@--main-structure-left + 29px) !important;
  right: @--menu-width  !important;
  left: @--main-structure-left  !important;
  bottom: @--main-structure-left  !important;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rabg(0, 0, 0, 0.5);
  transform: perspective(5000px) translateX(0px) translateY(0) translateZ(0) rotateX(0) rotateY(20deg) rotateZ(0);
}

.main-structure {
  box-sizing: border-box;
  position: absolute;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 61px);
  align-items: center;
  top: 61px;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  transition: 0.5s;

  svg {
    width: @--header-toggle-width;
    height: @--header-toggle-width;
    // filter: invert(1);
    cursor: pointer;
  }

  footer {
    svg {
      margin-right: 30px;
      transition: 0.5s;
      color: var(--theme-color);
      &:hover {
        transform: translateY(-5px);
      }
    }
  }
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    display: inline-block;
    text-decoration: none;
    color:  var(--theme-color);
    transition: 0.2s;

    &:hover {
      transform: scale(1.2);
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }
  }

  .menu-logo {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .menu-logo:hover {
    border: 3px solid var(--theme-color);
    border-radius: 50%;
    animation: menu_log ease-in 1s infinite;
  }

  @keyframes menu_log {

    from,
    to {
      transform: scale(1);
    }

    50% {
      transform: scale(1.2);
    }
  }
}

.content {

  video,
  .video-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    transition: 1s;
    mix-blend-mode: overlay;
  }

  video {
    object-fit: cover;
    clip-path: ellipse(0% 0% at 0% 50%);
    padding: 0;
    margin: 0;
  }

  .active {
    clip-path: ellipse(150% 70% at 0% 50%);
  }

  .text-description {

    h1,
    h2,
    p {
      margin: 0;
      padding: 0;
    }

    h1 {
      text-transform: uppercase;
      font-size: 3em;
      line-height: 1em;
    }

    h2 {
      text-transform: uppercase;
      font-size: 2em;
      line-height: 1em;
    }

    p {
      font-size: 0.6em;
      line-height: 1.5em;
      min-width: 220px;
      max-width: 700px;
      margin: 3em 0;
    }

    a {
      display: inline-block;
      text-decoration: none;
      border: 2px solid @--theme-color;
      color:  var(--theme-color);
      padding: 10px 30px;
      letter-spacing: 2px;
      border-radius: 30px;
      box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.5),
        -1px -1px 8px rgba(255, 255, 255, 0.5);
      transition: 0.3s;

      &:hover {
        color:  var(--theme-color);
        background-color: @--theme-color;
        letter-spacing: 5px;
      }
    }
  }
}

.aside-menu {
  font-size: @--main-desktop-font-size;
  position: absolute;
  top: 61px;
  right: 10px;
  bottom: 0;
  width: @--menu-width;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: calc (@--menu-width * 2 / 3);
  text-align: center;

  a {
    display: inline-block;
    text-decoration: none;
    border: 2px solid @--main-background-color;
    color:  var(--theme-color);
    border-color: @--theme-color ;
    text-transform: uppercase;
    padding: 10px 30px;
    letter-spacing: 2px;
    border-radius: 30px;
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.5),
      -1px -1px 8px rgba(255, 255, 255, 0.5);
    transition: 0.3s;

    &:hover {
      color: var(--theme-color);
      background-color: @--theme-color;
      letter-spacing: 5px;
    }

    &:not(:last-child) {
      margin-bottom: 30px;
    }
  }

}

@media (max-width: 1280px) {

  .aside-menu,
  .main-structure {
    font-size: @--main-pad-font-size;

    svg {
      width: 24px;
      height: 24px;
      // filter: invert(1);
    }
  }

  .main-structure header,
  .main-structure .content,
  .main-structure footer {
    padding: @--screen-pad-padding-top-bottom @--screen-pad-padding-left-right;
  }

  h1 {
    text-transform: uppercase;
    font-size: 2.5em;
    line-height: 1em;
  }

  h2 {
    text-transform: uppercase;
    font-size: 2em;
    line-height: 1em;
  }

  p {
    font-size: 0.4em;
    line-height: 1.5em;
    min-width: 220px;
    max-width: 500px;
  }

}

@media (max-width:480px) {

  .aside-menu,
  .main-structure {
    font-size: @--main-phone-font-size;

    svg {
      width: 18px;
      height: 18px;
      // filter: invert(1);
    }
    img {
      width: 18px;
      height: 18px;
      // filter: invert(1);
    }
  }

  .main-structure header,
  .main-structure .content,
  .main-structure footer {
    padding: @--screen-pad-padding-top-bottom @--screen-pad-padding-left-right;
  }

  h1 {
    text-transform: uppercase;
    font-size: 1.8em !important;

  }

  h2 {
    text-transform: uppercase;
    font-size: 1.4em !important;
    line-height: 1.2em !important;
  }

  p {
    font-size: 0.7em !important;
    line-height: 1.5em;
    min-width: 220px !important;
    max-width: 400px !important;
    text-align: justify;
    }

  .aside-menu {
    font-size: 12px;
    width: 80px;
    a {
      // margin-left: ;
      padding: 5px 12px;
      letter-spacing: 1px;
    
      &:not(:last-child) {
        margin-bottom: 20px;
      }
    }

  }
  .main-structureActive {
    min-width: calc(70%);
  }

  .text-description {
    p {
      margin: 3.5em 0 !important;
    }
    a {
      height: 40px;
      font-size: 1rem;
      padding: 5px 20px !important;
    }
  }
}

.wx-href {
  position: relative;
  .wx:hover~img {
    display: block;
  }
  img {
    width: 200px;
    height: 300px;
    top: -320px;
    left: -85px;
    position:absolute;
    display: none;
  }
}

.floatFrame {
  position: absolute;
  bottom: 15%;
  opacity: 0;
  transition: 1s;
  color: var(--theme-color);
}

.qq:hover+.floatFrame {
  opacity: 1;
}
</style>
