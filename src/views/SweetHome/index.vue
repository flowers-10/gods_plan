<template>
  <div class="app" @click="flag = false">
    <div class="header" :class="SearchFlag === true ? 'wide' : ''">
      <div class="menu-circle" @click="leftSideShow">
        <img src="../../assets/images/logoG.png" alt="">
      </div>
      <div class="header-menu">
        <router-link class="menu-link"
          :class="[tabSwith === index ? 'is-active' : '', (index + 1) % 2 === 0 ? 'notify' : '']" :to="item.path"
          @click="tabSwith = index" v-for="(item, index) in tabSwithList">
          {{ item.title }}
        </router-link>
      </div>
      <div class="search-bar">
        <input @focus="SearchFlag = true" @blur="SearchFlag = false" type="text" placeholder="Search">
      </div>
      <div class="header-profile">
        <div class="notification">
          <span class="notification-number">3</span>
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" class="feather feather-bell">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
          </svg>
        </div>
        <svg viewBox="0 0 512 512" fill="currentColor">
          <path
            d="M448.773 235.551A135.893 135.893 0 00451 211c0-74.443-60.557-135-135-135-47.52 0-91.567 25.313-115.766 65.537-32.666-10.59-66.182-6.049-93.794 12.979-27.612 19.013-44.092 49.116-45.425 82.031C24.716 253.788 0 290.497 0 331c0 7.031 1.703 13.887 3.006 20.537l.015.015C12.719 400.492 56.034 436 106 436h300c57.891 0 106-47.109 106-105 0-40.942-25.053-77.798-63.227-95.449z" />
        </svg>
        <img v-if="avatarUrl !== ''" class="profile-img" :src="avatarUrl" alt="" @click.stop="flag = true">
        <img v-else class="profile-img" src="../../assets/SPY×FAMILY/Anya1.png" alt="" @click.stop="flag = true">

        <div class="dropdown" :class="flag ? 'is-active' : ''">
          <ul>
            <li><a href="#">设置</a></li>
            <li><a href="#">Learn more</a></li>
            <li><a href="#" @click="loginOutNow">退出登录</a></li>
          </ul>
        </div>
      </div>
    </div>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <transition enter-active-class="animate__animated animate__slideInLeft"
      leave-active-class="animate__animated animate__slideOutLeft">
      <div class="left-side" v-if="status && sideShow">
        <div class="side-wrapper">
          <div class="side-title">App</div>
          <div class="side-menu">
            <router-link @click="sideShow = false" to="/apps">
              <svg viewBox="0 0 512 512">
                <g xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                  <path d="M0 0h128v128H0zm0 0M192 0h128v128H192zm0 0M384 0h128v128H384zm0 0M0 192h128v128H0zm0 0"
                    data-original="#bfc9d1" />
                </g>
                <path xmlns="http://www.w3.org/2000/svg" d="M192 192h128v128H192zm0 0" fill="currentColor"
                  data-original="#82b1ff" />
                <path xmlns="http://www.w3.org/2000/svg"
                  d="M384 192h128v128H384zm0 0M0 384h128v128H0zm0 0M192 384h128v128H192zm0 0M384 384h128v128H384zm0 0"
                  fill="currentColor" data-original="#bfc9d1" />
              </svg>
              All Apps
            </router-link>
            <router-link @click="sideShow = false" to="/apps/updates">
              <svg viewBox="0 0 488.932 488.932" fill="currentColor">
                <path
                  d="M243.158 61.361v-57.6c0-3.2 4-4.9 6.7-2.9l118.4 87c2 1.5 2 4.4 0 5.9l-118.4 87c-2.7 2-6.7.2-6.7-2.9v-57.5c-87.8 1.4-158.1 76-152.1 165.4 5.1 76.8 67.7 139.1 144.5 144 81.4 5.2 150.6-53 163-129.9 2.3-14.3 14.7-24.7 29.2-24.7 17.9 0 31.8 15.9 29 33.5-17.4 109.7-118.5 192-235.7 178.9-98-11-176.7-89.4-187.8-187.4-14.7-128.2 84.9-237.4 209.9-238.8z" />
              </svg>
              Updates
              <span class="notification-number updates">3</span>
            </router-link>
            <router-link @click="sideShow = false" to="/apps/games">
              <svg t="1669266744050" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="3287" fill="currentColor">
              <path
                d="M307.2 184.32h409.6c135.72096 0 245.76 110.03904 245.76 245.76v327.68a81.92 81.92 0 0 1-81.92 81.92h-136.704a122.88 122.88 0 0 1-104.20224-57.7536l-33.73056-53.98528a110.85824 110.85824 0 0 0-188.0064 0l-33.73056 53.98528A122.88 122.88 0 0 1 280.064 839.68H143.36a81.92 81.92 0 0 1-81.92-81.92V430.08C61.44 294.35904 171.47904 184.32 307.2 184.32z m-13.23008 187.392a50.42176 50.42176 0 0 1-45.13792 45.13792l-59.904 6.00064a27.8528 27.8528 0 0 0 0 55.41888l59.904 6.00064a50.42176 50.42176 0 0 1 45.13792 45.13792l6.00064 59.904a27.8528 27.8528 0 0 0 55.41888 0l6.00064-59.904a50.42176 50.42176 0 0 1 45.13792-45.13792l59.904-6.00064a27.8528 27.8528 0 0 0 0-55.41888l-59.904-6.00064a50.42176 50.42176 0 0 1-45.13792-45.13792l-6.00064-59.904a27.8528 27.8528 0 0 0-55.41888 0l-6.00064 59.904zM716.8 389.12a40.96 40.96 0 1 0 0-81.92 40.96 40.96 0 0 0 0 81.92z m0 204.8a40.96 40.96 0 1 0 0-81.92 40.96 40.96 0 0 0 0 81.92z m61.44-143.36a40.96 40.96 0 1 0 81.92 0 40.96 40.96 0 0 0-81.92 0z m-204.8 0a40.96 40.96 0 1 0 81.92 0 40.96 40.96 0 0 0-81.92 0z"
                p-id="3288"></path>
            </svg>
              Games
            </router-link>
            <router-link @click="sideShow = false" to="/apps/animegirl">
              <svg t="1662019099686" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="16242" fill="currentColor">
                <path
                  d="M725.507 669.185l-4.797 36.784h-25.587v-33.585l-52.775-7.997 4.799-20.788c22.39-15.992 115.145 17.589 182.313-78.367 67.168-95.954 12.993-157.595 0-167.905-16.793-13.326-105.551 1.597-105.551 1.597s51.178-44.592 63.968-92.757 0-123.138 0-123.138C740 102 648.742 96.668 648.742 96.668 552 160.667 519.205 326.959 519.205 326.959l-22.389-1.598c-17.591-70.366-73.566-148.729-174.319-175.918-100.752-27.189-139.134 89.559-139.134 89.559-3.2 150.33 126.341 239.885 126.341 239.885C61.822 515.68 68.217 632.404 68.217 632.404c79.961 134.337 319.852 87.959 319.852 87.959l4.797 73.563c148.729 9.597 217.496-39.98 217.496-39.98l6.398 68.766c-47.979 54.374-38.382 123.145-38.382 123.145 91.157-20.789 118.344-118.345 118.344-118.345l39.98-15.992 105.55-14.393c111.949-113.549 113.547-190.313 113.547-190.313-150.331-9.595-230.292 62.371-230.292 62.371zM519.205 530.051c-15.898 0-28.788-12.889-28.788-28.788 0-15.897 12.89-28.786 28.788-28.786 15.896 0 28.786 12.888 28.786 28.786 0 15.899-12.889 28.788-28.786 28.788z m187.11 239.887v-7.993s68.77-57.573 87.96-52.776c19.192 4.798-38.384 68.762-87.96 60.769z"
                  p-id="16243"></path>
              </svg>
              Anime Girl
            </router-link>
            <router-link @click="sideShow = false" to="/apps/echartmap">
              <svg t="1665393207399" fill="currentColor" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="8699">
                <path d="M87.45984 588.91264 827.262976 186.5728 491.702272 958.961664 416.700416 638.511104Z"
                  p-id="8700"></path>
              </svg>
              Echart Map
            </router-link>
            <router-link @click="sideShow = false" to="/apps/setup">
              <svg t="1662014382031" fill="currentColor" viewBox="0 0 1024 1024" version="1.1"
              xmlns="http://www.w3.org/2000/svg" p-id="3214">
              <path
                d="M940 596l-76-57.6c0.8-8 1.6-16.8 1.6-26.4s-0.8-18.4-1.6-26.4l76-57.6c20.8-16 26.4-44 12.8-68l-84.8-143.2c-9.6-16.8-28-27.2-47.2-27.2-6.4 0-12 0.8-18.4 3.2L712 228c-15.2-10.4-31.2-19.2-47.2-26.4l-13.6-92c-4-26.4-26.4-45.6-53.6-45.6H426.4c-27.2 0-49.6 19.2-53.6 44.8L360 201.6c-16 7.2-31.2 16-47.2 26.4l-90.4-35.2c-6.4-2.4-12.8-3.2-19.2-3.2-19.2 0-37.6 9.6-46.4 26.4L71.2 360c-13.6 22.4-8 52 12.8 68l76 57.6c-0.8 9.6-1.6 18.4-1.6 26.4s0 16.8 1.6 26.4l-76 57.6c-20.8 16-26.4 44-12.8 68l84.8 143.2c9.6 16.8 28 27.2 47.2 27.2 6.4 0 12-0.8 18.4-3.2L312 796c15.2 10.4 31.2 19.2 47.2 26.4l13.6 92c3.2 25.6 26.4 45.6 53.6 45.6h171.2c27.2 0 49.6-19.2 53.6-44.8l13.6-92.8c16-7.2 31.2-16 47.2-26.4l90.4 35.2c6.4 2.4 12.8 3.2 19.2 3.2 19.2 0 37.6-9.6 46.4-26.4l85.6-144.8c12.8-23.2 7.2-51.2-13.6-67.2zM704 512c0 105.6-86.4 192-192 192S320 617.6 320 512s86.4-192 192-192 192 86.4 192 192z"
                p-id="3215"></path>
            </svg>
              Setup
            </router-link>
          </div>
        </div>
        <div class="side-wrapper">
          <div class="side-title">Music</div>
          <div class="side-menu">
            <router-link @click="sideShow = false" to="/music/myhome">
              <svg viewBox="0 0 48 48" fill="currentColor" stroke="currentColor">
                <path d="M5 7L10 9V37L5 39V7Z" stroke="currentColor" stroke-width="4" stroke-linejoin="round" />
                <path d="M16 23L21 25V37L16 39V23Z" fill="currentColor" stroke="currentColor" stroke-width="4"
                  stroke-linejoin="round" />
                <path d="M27 21L32 19V35L27 33V21Z" fill="currentColor" stroke="currentColor" stroke-width="4"
                  stroke-linejoin="round" />
                <path d="M38 9L43 11V37L38 39V9Z" fill="currentColor" stroke="currentColor" stroke-width="4"
                  stroke-linejoin="round" />
              </svg>
              My Home
            </router-link>
            <router-link @click="sideShow = false" to="/music/playlistsquare">
              <svg viewBox="0 0 1117 1024" fill="currentColor">
                <path
                  d="M875.056498 1023.999379c-9.650418 0-19.300837-2.885816-27.554893-8.564358L558.547598 811.907387l-159.49566 137.246947c-13.09478 9.526297-20.479988 15.577203-32.892102 11.636356s-20.6972-18.276837-24.824227-34.071252L273.068984 581.135163 31.560281 519.446958A49.679485 49.679485 0 0 1 0.002482 473.398016a49.710515 49.710515 0 0 1 30.968224-46.514396L1048.764029 1.023999c5.151027-2.23418 29.106407-0.124121 31.092344 0 11.450175 0.682666 24.296713 9.77454 25.07247 10.736479 7.292117 8.409207 11.263993 18.618171 12.03975 29.106406a98.366001 98.366001 0 0 1-0.868848 13.560235L923.33962 983.66001c-3.103028 16.446051-14.118779 30.192467-29.41671 36.584705a48.314153 48.314153 0 0 1-18.835382 3.785695zM369.79038 533.720889c-21.410896 13.280962-29.168467 37.701795-22.217684 62.060568l40.33937 211.005933c4.31321 15.111748 19.64217 3.22715 21.721198-12.412114l8.874662-130.327194c2.978907-24.824227 13.436113-28.268589 29.633921-43.442398L943.323123 198.593819c8.626419-8.067874-2.358302-18.618171-12.412114-12.412114L369.759349 533.720889z"
                  p-id="5140"></path>
              </svg>
              Playlist Square
            </router-link>
            <router-link @click="sideShow = false" to="/music/topcharts">
              <svg viewBox="0 0 1024 1024" fill="currentColor">
                <path d="M432 112l160 0 0 800-160 0 0-800Z" p-id="4679"></path>
                <path d="M165.34 432.03l160 0 0 479.97-160 0 0-479.97Z" p-id="4680"></path>
                <path d="M698.66 538.71l160 0 0 373.29-160 0 0-373.29Z" p-id="4681"></path>
              </svg>
              TopCharts
            </router-link>
            <router-link @click="sideShow = false" to="/music/artists">
              <svg fill="currentColor" viewBox="0 0 1024 1024">
                <path
                  d="M399.232 313.677824 103.387136 798.600192c-6.754304 11.044864-39.25504 67.928064-17.055744 100.744192 0.09728 0.16384 0.391168 0.641024 0.886784 1.338368-6.554624 7.996416-33.731584 44.645376-18.886656 86.208512 2.224128 6.226944 8.08448 10.108928 14.339072 10.108928 1.698816 0 3.428352-0.28672 5.12-0.89088 7.918592-2.828288 12.045312-11.54048 9.217024-19.459072-10.25536-28.717056 13.794304-56.72448 14.267392-57.268224 0.477184-0.5376 0.892928-1.10592 1.28-1.687552 4.88448 1.391616 10.530816 2.274304 17.021952 2.274304 15.973376-0.021504 37.001216-5.312512 64.167936-21.285888L679.13728 569.18016C533.548032 567.26528 413.920256 455.892992 399.232 313.677824zM682.896384 20.911104c-145.171456 0-263.282688 118.089728-263.282688 263.26016s118.111232 263.282688 263.282688 263.282688 263.26016-118.111232 263.26016-263.282688S828.06784 20.911104 682.896384 20.911104z"
                  p-id="5523"></path>
              </svg>
              Artist
            </router-link>

            <router-link @click="sideShow = false" to="/music/mymusic">
              <svg t="1651369194282" class="icon" viewBox="0 0 1024 1024" version="1.1" fill="currentColor"
                xmlns="http://www.w3.org/2000/svg" p-id="2209">
                <path
                  d="M875.52 433.152q-7.168-1.024-12.8-10.24t-8.704-33.792q-5.12-39.936-26.112-58.88t-65.024-27.136q-46.08-9.216-81.408-37.376t-58.88-52.736q-22.528-21.504-34.816-15.36t-12.288 22.528l0 44.032 0 96.256q0 57.344-0.512 123.904t-0.512 125.952l0 104.448 0 58.368q1.024 24.576-7.68 54.784t-32.768 56.832-64 45.568-99.328 22.016q-60.416 3.072-109.056-21.504t-75.264-61.952-26.112-81.92 38.4-83.456 81.92-54.272 84.992-16.896 73.216 5.632 47.616 13.312l0-289.792q0-120.832 1.024-272.384 0-29.696 15.36-48.64t40.96-22.016q21.504-3.072 35.328 8.704t28.16 32.768 35.328 47.616 56.832 52.224q30.72 23.552 53.76 33.792t43.008 18.944 39.424 20.992 43.008 39.936q23.552 26.624 28.672 55.296t0.512 52.224-14.848 38.4-17.408 13.824z"
                  p-id="2210"></path>
              </svg>
              My Music
            </router-link>
            <a @click="getPlayListId">
              <svg t="1652001031085" fill="currentColor" class="icon" viewBox="0 0 1024 1024">
                <path
                  d="M383.104 802.133333C375.466667 855.04 321.493333 896 256 896c-70.698667 0-128-47.786667-128-106.666667S185.301333 682.666667 256 682.666667c14.933333 0 29.312 2.133333 42.666667 6.058666V253.098667c0-21.888 13.653333-41.216 33.706666-47.786667l245.333334-75.008c30.890667-10.069333 62.293333 13.994667 62.293333 47.786667v75.008c0 25.002667-23.424 40.96-42.666667 45.568-27.733333 6.613333-98.816 20.821333-213.333333 42.666666v450.176c0 3.84-0.298667 7.381333-0.896 10.666667z"
                  p-id="4252"></path>
                <path
                  d="M682.666667 384h170.666666a42.666667 42.666667 0 0 1 0 85.333333h-170.666666a42.666667 42.666667 0 0 1 0-85.333333z m-85.333334 170.666667h256a42.666667 42.666667 0 0 1 0 85.333333h-256a42.666667 42.666667 0 0 1 0-85.333333z m0 170.666666h256a42.666667 42.666667 0 0 1 0 85.333334h-256a42.666667 42.666667 0 0 1 0-85.333334z"
                  opacity=".3" p-id="4253"></path>
              </svg>
              Playlist Detail
            </a>
            <router-link @click="sideShow = false" to="/music/audiolist">
              <svg viewBox="0 0 1024 1024">
                <path
                  d="M113.7664 540.4672c0-219.9552 178.2784-398.2336 398.2336-398.2336S910.2336 320.512 910.2336 540.4672v284.4672c0 31.4368-25.4976 56.9344-56.9344 56.9344h-56.9344c-31.4368 0-56.9344-25.4976-56.9344-56.9344V597.2992c0-31.4368 25.4976-56.9344 56.9344-56.9344h56.9344c0-188.5184-152.7808-341.2992-341.2992-341.2992S170.7008 351.9488 170.7008 540.4672h56.9344c31.4368 0 56.9344 25.4976 56.9344 56.9344v227.5328c0 31.4368-25.4976 56.9344-56.9344 56.9344h-56.9344c-31.4368 0-56.9344-25.4976-56.9344-56.9344V540.4672z"
                  fill="currentColor" p-id="2403"></path>
              </svg>
              Audio List
            </router-link>
          </div>
        </div>
        <div class="side-wrapper">
          <div class="side-title">Discover</div>
          <div class="side-menu">
            <router-link @click="sideShow = false" to="/discover">
              <svg viewBox="0 0 1024 1024" fill="currentColor">
                <path
                  d="M638.521 764.317c-10.333-24.883-44.436-67.424-101.372-126.45-15.196-15.782-14.218-27.892-8.789-63.869l0.625-4.064c3.69-24.648 9.882-39.22 93.813-52.384 42.638-6.679 53.85 10.158 69.395 33.478 1.72 2.58 3.44 5.117 5.197 7.656 14.766 21.331 25.704 26.212 42.23 33.634 7.402 3.32 16.64 7.502 29.022 14.453 29.339 16.566 29.339 35.276 29.339 76.293v4.648c0 65.552-24.415 101.023-33.947 112.389-36.369 30.98-78.578 55.392-124.83 71.408 22.93-42.306 5.39-92.54-0.683-107.192zM511.993 130.933c59.846 0 116.528 13.477 167.156 37.581-27.815 17.384-67.776 44.573-84.223 66.838-6.094 8.243-11.328 16.055-16.173 23.244-16.055 23.907-23.789 34.572-38.596 36.408-7.342 0.897-17.188 0.272-27.617-0.391-27.97-1.796-66.233-4.22-78.48 28.634-7.775 20.82-9.142 77.346 16.016 106.684 4.025 4.688 4.805 13.36 2.07 23.088-3.595 12.774-10.859 20.548-13.125 22.15-4.337-2.462-12.99-12.385-18.849-19.143-14.123-16.212-31.74-36.408-54.513-42.658-8.281-2.265-17.384-4.14-26.212-5.977-24.71-5.117-52.698-10.939-59.2-24.648-4.748-10.04-4.727-23.868-4.709-38.478 0-18.517 0-39.456-9.18-59.808-7.969-17.695-22.012-27.267-36.758-31.954 70.548-74.732 171.002-121.57 282.393-121.57zM92.348 511.885c0 228.723 187.879 414.12 419.645 414.12 231.768 0 419.645-185.397 419.645-414.12 0-228.719-187.877-414.116-419.645-414.116-231.767 0-419.645 185.397-419.645 414.116z"
                  p-id="4856"></path>
              </svg>
              Explore
            </router-link>
          </div>
        </div>
        <div class="side-wrapper">
          <div class="side-title">Knowledge</div>
          <div class="side-menu">
            <router-link @click="sideShow = false" to="/knowledge">
              <svg fill="currentColor" viewBox="0 0 1024 1024">
                <path
                  d="M778.4 100.2c8.6 0 17.2 0.4 25.8 1.2 27 2.5 47.7 25.2 47.6 52.3v589.7c0 28.3-22.4 51.4-50.6 52.4-50.9 1.9-94.1 8.7-129.4 20.5-46.3 15.5-91.4 43.6-135 84.2V241.1c32.2-55.4 77.3-95.1 135-119.2 33.8-14.2 70-21.6 106.6-21.7z m126 655.6V217.7c13.9 0 27.3 5.5 37.1 15.4s15.4 23.2 15.4 37.1v533.9c0 41.7-26.1 109.2-105 102.4-55.6-4.7-59.2-6.7-106.1-5.9-45.9 0.8-110.2-0.8-167.7 12.7 32.2-26.9 79.3-45.9 110.5-52.5 31.1-6.7 70-9.6 115.7-11.3 58-2.1 100.1-45.7 100.1-93.7zM242.7 100.2c36.3 0 71.8 7.3 106.6 21.7 57.7 24 102.8 63.8 135 119.2v659.5c-43.6-40.7-88.7-68.8-135-84.2-35.3-11.7-78.4-18.6-129.4-20.4-28.2-1-50.6-24.2-50.5-52.5V153.7c0-27.1 20.6-49.7 47.6-52.2 8.5-0.9 17.1-1.3 25.7-1.3z m-126 655.6c0 43.3 32 91.2 101.2 93.7 45.8 1.7 74.4 6.7 114.7 11.3 40.3 4.5 79.1 25.7 111.3 52.5-57.5-13.5-117-12.7-168.6-12.7-40.6 0-47.7 5.9-106.1 5.9-68.9 0-105.1-62.3-105.1-102.4v-534c0-29 23.5-52.5 52.5-52.5v538.2h0.1z m0 0"
                  p-id="4593"></path>
              </svg>
              Article
            </router-link>
          </div>
        </div>

      </div>
    </transition>

    <div v-if="status" class="overlay-app" :class="sideShow ? 'is-active' : ''" @click="sideShow = false"></div>
  </div>
  <a-player v-if="store.AplayFlag" :key="timer" :fixed="store.AplayFixedMode"></a-player>

</template>

<script lang="ts" setup>
// 引入工具
import { ref, reactive, onMounted, watchEffect, toRaw } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/stores';
import { loginOut } from '@/api/api';
import 'animate.css'
import APlayer from '@/components/APlayer/index.vue'

// 路由
const route = useRoute()
// 使用路由
const router = useRouter()
// pinia
const store = useStore()
// 获得头像(ts报错因为没有整合类型)
const avatarUrl = ref<string>(toRaw(store.$state.userinfo.profile.avatarUrl))
// 控制头像详情信息展示
const flag = ref(false)
// 导航栏的数据
const tabSwithList = reactive([{
  title: 'Apps',
  path: '/apps'
}, {
  title: 'Music',
  path: '/music'
}, {
  title: 'Discover',
  path: '/discover'
}, {
  title: 'Knowledge',
  path: '/knowledge'
}])

// 控制tab栏的动态样式
const tabSwith = ref(0)
// 控制搜索框的动态样式
const SearchFlag = ref(false)
// 控制侧边栏的显示
const sideShow = ref<boolean>(false)

// 识别用户是否是移动端，如果移动端，就让 video 标签失效
const IsPc = () => {
  let userAgent = navigator.userAgent, Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  return Agents.some((i) => {
    return userAgent.includes(i)
  })
}
let status = IsPc()
// 左侧边栏的显示
const leftSideShow = () => {
  sideShow.value = true
}

// 退出登录
const loginOutNow = () => {
  loginOut()
  localStorage.removeItem('pinia-CloudMusic')
  localStorage.removeItem('token')
  localStorage.removeItem('phone')
  location.reload()
}

// 获得用户的歌单列表
const getPlayListId = () => {
  sideShow.value = false
  const id = store.$state.playListId
  // console.log('我是pinia中的id', id);
  router.push({
    name: 'PlayListDetail',
    params: {
      id
    }
  })
}

const timer = ref()
watchEffect(() => {
  store.AplayFixedMode
  timer.value=new Date().getTime()
})

onMounted(() => {
  // 根据路由高亮当前的头部导航栏样式
  let tab = route.path.split('/')
  // console.log(tab[1]);
  switch (tab[1]) {
    case 'apps':
      tabSwith.value = 0;
      break;
    case 'music':
      tabSwith.value = 1;
      break;
    case 'discover':
      tabSwith.value = 2;
      break;
    case 'knowledge':
      tabSwith.value = 3;
      break;
  }

})

</script>

<style lang="less" scoped>
/deep/ .md {
  --md-bk-color: transparent;
  --md-border-color: var(--border-color);
  color: var(--theme-color);
  --md-scrollbar-bg-color: var(--scrollbar-bg);

  .default-theme {
    color: var(--theme-color);
  }
}

img {
  max-width: 100%;
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
  z-index: 10;

  &.is-active {
    visibility: visible;
    opacity: 1;
  }
}

.app {
  background-color: var(--theme-bg-color);
  // max-width: 1500px;
  // max-height: 880px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  // border-radius: 14px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  font-size: 15px;
  font-weight: 500;
  margin: auto;

  @media screen and (max-width: 480px) {
    border-radius: 0px;
  }

  .header {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    height: 58px;
    width: 100%;
    border-bottom: 1px solid var(--border-color);
    padding: 0 30px;
    white-space: nowrap;
    user-select: none;

    @media screen and (max-width: 480px) {
      padding: 0 16px;
    }

    &-menu {
      display: flex;
      align-items: center;

      a {
        padding: 20px 30px;
        text-decoration: none;
        color: var(--inactive-color);
        border-bottom: 2px solid transparent;
        transition: 0.3s;

        @media screen and (max-width: 610px) {
          &:not(.main-header-link) {
            display: none;
          }
        }

        &.is-active,
        &:hover {
          color: var(--theme-color);
          border-bottom: 2px solid var(--theme-color);
        }
      }
    }

    .search-bar {
      height: 40px;
      display: flex;
      width: 100%;
      max-width: 400px;
      padding-left: 16px;
      border-radius: 4px;

      input {
        width: 100%;
        height: 100%;
        border: none;
        background-color: var(--search-bg);
        border-radius: 4px;
        font-family: var(--body-font);
        font-size: 15px;
        font-weight: 500;
        padding: 0 20px 0 40px;
        box-shadow: 0 0 0 2px rgb(134 140 160 / 2%);
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56.966 56.966' fill='%23717790c7'%3e%3cpath d='M55.146 51.887L41.588 37.786A22.926 22.926 0 0046.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 00.083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z'/%3e%3c/svg%3e");
        background-size: 14px;
        background-repeat: no-repeat;
        background-position: 16px 48%;
        color: var(--theme-color);

        &::placeholder {
          font-family: var(--body-font);
          color: var(--inactive-color);
          font-size: 15px;
          font-weight: 500;
        }
      }
    }

    .menu-circle {
      width: 29px;
      height: 100%;
      padding: 10px 0;
      // background-color: #f96057;
      // border-radius: 50%;
      // box-shadow: 24px 0 0 0 #f8ce52, 48px 0 0 0 #5fcf65;
      margin-right: 181px;
      flex-shrink: 0;

      img {
        cursor: pointer;
        -webkit-user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;
        -khtml-user-select: none;
        user-select: none;
        border-radius: 5px;
        width: 29px;
        height: 31px;
      }

      @media screen and (max-width: 945px) {
        margin-right: 20px;
      }
    }

    .header-profile {
      display: flex;
      align-items: center;
      padding: 0 16px 0 40px;
      margin-left: auto;
      flex-shrink: 0;


      svg {
        width: 22px;
        color: #f9fafb;
        flex-shrink: 0;
      }

    }

  }

  .wide {

    .menu-circle,
    .header-menu,
    .header-profile {
      display: none;
    }

    .search-bar {
      max-width: 600px;
      margin: auto;
      transition: 0.4s;
      box-shadow: 0 0 0 1px var(--border-color);
      padding-left: 0;
    }

    .menu-circle {
      margin-right: 0;
    }
  }
}

.notify {
  position: relative;

  &:before {
    content: "";
    position: absolute;
    background-color: #3a6df0;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    right: 20px;
    top: 16px;
  }

  @media screen and (max-width: 1055px) {
    display: none;
  }
}

.notification {
  position: relative;

  &-number {
    position: absolute;
    background-color: #3a6df0;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    right: -6px;
    top: -6px;
  }

  &+svg {
    margin-left: 22px;

    @media screen and (max-width: 945px) {
      display: none;
    }
  }
}

.profile-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--theme-color);
  margin-left: 22px;
  cursor: pointer;
}

.dropdown {

  ul {
    position: absolute;
    background: var(--dropdown-bg);
    height: 110px;
    width: 120px;
    right: 10px;
    top: 24px;
    pointer-events: none;
    opacity: 0;
    transform: translatey(10px);
    transition: all 0.4s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 0;
    margin: 0;
    border-radius: 14px;
    border: 1px solid var(--theme-bg-color);
    cursor: pointer;
    z-index: 99999;

    li {
      width: 100%;
      height: 100%;
      background-color: var(--content-bg);
      display: flex;
      align-items: center;
      border: 1px solid var(--theme-bg-color);
      cursor: pointer;

      &:first-child {
        border-radius: 13px 13px 0 0;
      }

      &:last-child {
        border-radius: 0 0 13px 13px;
      }

      a {
        margin-left: 5px;
        text-decoration: none;
        color: var(--theme-color);
        font-size: 12px;
      }
    }

  }
}

.dropdown.is-active {
  ul {
    opacity: 1;
    pointer-events: all;
    transform: translatey(25px);

    li:hover {
      background-color: var(--dropdown-hover);

    }
  }
}


.left-side {
  position: absolute;
  width: 80%;
  height: 100%;
  background-color: var(--popup-bg);
  z-index: 99;
  // padding: 20px;
  flex-basis: 240px;
  border-right: 1px solid var(--border-color);
  padding: 26px 26px 90px 26px;
  overflow: auto;
  flex-shrink: 0;

  .side-wrapper+.side-wrapper {
    margin-top: 20px;
  }

  .side-title {
    color: var(--inactive-color);
    margin-bottom: 14px;
  }

  .side-menu {
    display: flex;
    flex-direction: column;
    white-space: nowrap;

    a {
      text-decoration: none;
      color: var(--theme-color);
      display: flex;
      align-items: center;
      font-weight: 400;
      padding: 10px;
      font-size: 14px;
      border-radius: 6px;
      transition: 0.3s;
      position: relative;

      &:hover {
        background-color: var(--hover-menu-bg);
      }
    }

    svg {
      width: 16px;
      margin-right: 8px;
    }
  }

}
</style>