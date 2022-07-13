<template>
  <div class="discover">
    <section class="main-structure" :class="!menuFlag ? 'main-structureActive' : ''">
      <header>
        <a href="#">
          <div class="logo">Travel</div>
        </a>
        <div class="menu-logo" @click="menuFlag = !menuFlag">
          <svg v-if="menuFlag" t="1657243695392" class="icon" viewBox="0 0 1024 1024" version="1.1"
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

          <svg v-if="!menuFlag" t="1657250521247" class="icon" viewBox="0 0 1024 1024" version="1.1"
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
          <h2>explore th world</h2>
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
        <a href="#">
          <svg t="1657245626898" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="3979" width="128" height="128">
            <path
              d="M740.693333 539.306667l0-187.733333-157.013333 0L583.68 238.933333c0 0 0-51.2 58.026667-51.2 58.026667 0 153.6 0 153.6 0L795.306667 0 549.546667 0C378.88 0 365.226667 201.386667 365.226667 201.386667l0 146.773333-136.533333 0 0 187.733333 136.533333 0L365.226667 1024l215.04 0L580.266667 539.306667 740.693333 539.306667z"
              p-id="3980"></path>
          </svg>
        </a>
        <a href="#">
          <svg t="1657245648483" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="5010" width="128" height="128">
            <path
              d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3 645.3 585.4 645.3 512 585.4 378.7 512 378.7z"
              p-id="5011"></path>
            <path
              d="M911.8 512c0-55.2 0.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-0.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-0.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9 0.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9 717.1 398.5 717.1 512 625.5 717.1 512 717.1z m213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9 47.9 21.4 47.9 47.9c-0.1 26.6-21.4 47.9-47.9 47.9z"
              p-id="5012"></path>
          </svg>
        </a>
        <a href="#"><svg t="1657245669246" class="icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="5928" width="128" height="128">
            <path
              d="M511.542857 14.057143C228.914286 13.942857 0 242.742857 0 525.142857 0 748.457143 143.2 938.285714 342.628571 1008c26.857143 6.742857 22.742857-12.342857 22.742858-25.371429v-88.571428c-155.085714 18.171429-161.371429-84.457143-171.771429-101.6C172.571429 756.571429 122.857143 747.428571 137.714286 730.285714c35.314286-18.171429 71.314286 4.571429 113.028571 66.171429 30.171429 44.685714 89.028571 37.142857 118.857143 29.714286 6.514286-26.857143 20.457143-50.857143 39.657143-69.485715-160.685714-28.8-227.657143-126.857143-227.657143-243.428571 0-56.571429 18.628571-108.571429 55.2-150.514286-23.314286-69.142857 2.171429-128.342857 5.6-137.142857 66.4-5.942857 135.428571 47.542857 140.8 51.771429 37.714286-10.171429 80.8-15.542857 129.028571-15.542858 48.457143 0 91.657143 5.6 129.714286 15.885715 12.914286-9.828571 76.914286-55.771429 138.628572-50.171429 3.314286 8.8 28.228571 66.628571 6.285714 134.857143 37.028571 42.057143 55.885714 94.514286 55.885714 151.2 0 116.8-67.428571 214.971429-228.571428 243.314286a145.714286 145.714286 0 0 1 43.542857 104v128.571428c0.914286 10.285714 0 20.457143 17.142857 20.457143 202.4-68.228571 348.114286-259.428571 348.114286-484.685714 0-282.514286-229.028571-511.2-511.428572-511.2z"
              p-id="5929"></path>
          </svg>
        </a>
        <a href="#">
          <svg t="1657245700519" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="6849" width="128" height="128">
            <path
              d="M928 254.3c-30.6 13.2-63.9 22.7-98.2 26.4 35.4-21.1 62.3-54.4 75-94-32.7 19.5-69.7 33.8-108.2 41.2C765.4 194.6 721.1 174 672 174c-94.5 0-170.5 76.6-170.5 170.6 0 13.2 1.6 26.4 4.2 39.1-141.5-7.4-267.7-75-351.6-178.5-14.8 25.4-23.2 54.4-23.2 86.1 0 59.2 30.1 111.4 76 142.1-28-1.1-54.4-9-77.1-21.7v2.1c0 82.9 58.6 151.6 136.7 167.4-14.3 3.7-29.6 5.8-44.9 5.8-11.1 0-21.6-1.1-32.2-2.6C211 652 273.9 701.1 348.8 702.7c-58.6 45.9-132 72.9-211.7 72.9-14.3 0-27.5-0.5-41.2-2.1C171.5 822 261.2 850 357.8 850 671.4 850 843 590.2 843 364.7c0-7.4 0-14.8-0.5-22.2 33.2-24.3 62.3-54.4 85.5-88.2z"
              p-id="6850"></path>
          </svg>
        </a>
      </footer>
    </section>
    <section class="aside-menu">
      <a href="#" @click="activeIndex = index" v-for="(item, index) in contentList" :key="index"><span>{{ item.title
      }}</span></a>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { getVideo } from '@/api/gsApi'
// 类型
type videoLists = {
  video: string;
};
// video列表
const videoList = ref<videoLists[]>();
// 获取video
const getVideos = async () => {
  // axios.get("http://124.223.168.27:8889/video").then((res) => {
  //   console.log(res.data.message);
  //   videoList.value = res.data.message;
  // });
  const res: any = await getVideo()
  // console.log(res);
  let message = res.message
  videoList.value = message;

};
// 控制视频选择文本更换
let activeIndex = ref(1);
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
@--main-color: #0080ff;
@--menu-width: 10em;
@--main-structure-left: 2em;
@--menu-margin-bottom: 1em;

.discover {
  -webkit-user-drag: none;
  display: flex;
  all: unset;
  font-size: @--main-desktop-font-size;
  font-family: "Poppins", sans-serif;
  color: @--main-text-color;
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
    filter: invert(1);
    cursor: pointer;
  }

  footer {
    svg {
      margin-right: 30px;
      transition: 0.5s;

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
    color: @--main-text-color;
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
    border: 3px solid #fff;
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
      min-width: 400px;
      max-width: 700px;
      margin: 3em 0;
    }

    a {
      display: inline-block;
      text-decoration: none;
      border: 2px solid @--main-color;
      color: @--main-text-color;
      padding: 10px 30px;
      letter-spacing: 2px;
      border-radius: 30px;
      box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.5),
        -1px -1px 8px rgba(255, 255, 255, 0.5);
      transition: 0.3s;

      &:hover {
        color: @--main-text-color;
        background-color: @--main-color;
        letter-spacing: 5px;
      }
    }
  }
}

.aside-menu {
  font-size: @--main-desktop-font-size;
  position: absolute;
  top: 61px;
  right: 0;
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
    color: @--main-color;
    border-color: @--main-color ;
    text-transform: uppercase;
    padding: 10px 30px;
    letter-spacing: 2px;
    border-radius: 30px;
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.5),
      -1px -1px 8px rgba(255, 255, 255, 0.5);
    transition: 0.3s;

    &:hover {
      color: @--main-text-color;
      background-color: @--main-color;
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
      filter: invert(1);
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
    min-width: 300px;
    max-width: 500px;
  }

}

@media (max-width:480px) {

  .aside-menu,
  .main-structure {
    font-size: @--main-phone-font-size;

    svg {
      width: 24px;
      height: 24px;
      filter: invert(1);
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
    min-width: 300px !important;
    max-width: 400px !important;
    text-align: justify;
    }

  .aside-menu {
    font-size: 14px;
    width: 100px;
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
    min-width: calc(100% - @--menu-width/1.3);
  }
}
</style>
