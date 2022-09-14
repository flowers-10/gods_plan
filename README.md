# gods_plan

[toc] 





## 🔥展示：

### Mobile

![请添加图片描述](https://img-blog.csdnimg.cn/edba4045c2f84d2795b3f3f61454257f.png)

### ipad
![请添加图片描述](https://img-blog.csdnimg.cn/3de710a3c6a04de891e9f353f79924ac.png)


### web
![请添加图片描述](https://img-blog.csdnimg.cn/626f5957b9c143a89416cac6f5fcaa42.gif)



---


## 一、⭐项目简介

热浪网是一个个人音乐博客，包含了音乐流媒体、发现浏览、app主页、博客浏览学习、聊天交流等功能

包含了 Apps 、Music 、 Discover 、 Knowledge 四大模块

具体页面结构：
![请添加图片描述](https://img-blog.csdnimg.cn/57948a03f0e14c3797717693e43ab468.png)

tips：手机版左上角G图标可以打开侧边栏

## 二、⭐功能简介
### ✨1.登录界面
主要使用了网易云音乐的接口进行登录（手机验证码 or 密码登陆）

🤏可拖拽弹框组件： vue自定义拖拽指令 + 封装组件 + 动态插槽 + 表单验证 + vue transiton动画组件

🔐 权限：动态路由  （update页面只有管理员才能进入）+ token + 路由拦截器（例：我的音乐界面需要登录才能访问，如果用户进入此路由会返回登录界面）

web效果

![请添加图片描述](https://img-blog.csdnimg.cn/b0c6f9c21a6049198d1cebdc31735a96.png)


### 🎹2.音乐主页展示
🖱️可根据滚轮滚动切换高亮标题的二级菜单

![请添加图片描述](https://img-blog.csdnimg.cn/6d8957c707644e6e92bf1f5d6450764c.png)


web 效果

![请添加图片描述](https://img-blog.csdnimg.cn/4db0b12a20bd449e973fc99e047b9083.png)
### 🕶️3. 主题切换
#### 🕶️ 主题切换：
切换根节点上的 css lightmodel or darkmodel + css 变量var()


#### 🤏封装可拖拽主题切换按钮：
检测用户是移动端还是pc端，移动端会隐藏按钮，自定义拖拽指令，双击切换全局css

web效果
![请添加图片描述](https://img-blog.csdnimg.cn/e4c9469ac78a47a1aace0c6c2f5b99ae.png)

#### 切换效果：

mobile效果

💡 light
![请添加图片描述](https://img-blog.csdnimg.cn/a3e44921d9fb4b73b5ada2bfbcca7f50.png)
🖤 dark
![请添加图片描述](https://img-blog.csdnimg.cn/5f8a527416ed43a19c06f5901fbce0d4.png)


### 📰 4、文章管理
富文本编辑器 添加图片：通过接口上传到node服务器，再返回url显示

#### 增加文章类型

![请添加图片描述](https://img-blog.csdnimg.cn/ceccf0ab4b664c03b52bbe7d572915fc.png)

#### 删除选中文章 ： 可多选

![请添加图片描述](https://img-blog.csdnimg.cn/e9dda6d8c0b1481780910f60cba873c6.png)


#### 修改文章：

web效果
![请添加图片描述](https://img-blog.csdnimg.cn/c038d345f2ce4c72848d07d261215539.png)

![请添加图片描述](https://img-blog.csdnimg.cn/85bf609b870041f497058b6b77b7852d.png)

#### 添加文章：
web效果

![请添加图片描述](https://img-blog.csdnimg.cn/7cc48151e7304a2fafd87303417109c2.png)
![请添加图片描述](https://img-blog.csdnimg.cn/f0d411e057a048578057b1c7f4744f98.png)


### ⭐5.博客分享和知识学习
跟随滚轮滚动响应的 TOP 按钮
响应式的文章列表

#### 文章列表展示：

mobile效果

![请添加图片描述](https://img-blog.csdnimg.cn/38e2ed519e2849898b13807cbda2ed97.png)

web效果

![请添加图片描述](https://img-blog.csdnimg.cn/a8aea409a317411c80a930156158c49a.png)

#### 文章内容：

iapd效果

![请添加图片描述](https://img-blog.csdnimg.cn/89f426dcb08f4392967dd511c24ade08.png)

### 🎶 6.歌单列表详情
mv入口
歌手界面入口
专辑页面
单机歌曲所在的行播放歌曲
播放全部歌曲（50首以内）
持久化处理，保存歌单的id，下次通过侧边栏入口进入时会记忆原id的歌单（默认歌单：猜你喜欢）
封装公共组件 歌曲列表组件 （歌曲列表、歌手最热50首歌曲、播放列表中使用）

ipad效果

![在这里插入图片描述](https://img-blog.csdnimg.cn/b14971e730494124b8f6879217d2e254.png)
### 🎶7.播放列表
删除播放列表中的歌曲
刷新歌曲（最多50首， 网易云的防盗链，歌曲url会过期，刷新歌曲后即可听歌）

ipad效果
![请添加图片描述](https://img-blog.csdnimg.cn/4dfb18f42a56403eb139ff47e53856c8.png)

### 📺8.mv播放

moblie效果

![在这里插入图片描述](https://img-blog.csdnimg.cn/674c0295a06046ea902065d06b167d6f.png)

---



## 开发日志

### 1.0.0

1. 引入了https://codepen.io/TurkAysenur/pen/ZEpxeYm的UI设计

2. 对UI结构进行拆分组件以至于更好的开发体验

3. 更改了网页标题名，index.html 中 <title>热浪</title>

4. 修改网页图标 :记住一定要找到路径为止，去掉原先的ico后，vite好像配置自动寻找ico根路径会失效，所以一定要配置好相对路径

   ```html
   <link rel="shortcut icon" href="/public/favicon.ico">
   ```

<<<<<<< HEAD
5. 在gitee上传新分支：basis 

   基础分支，可以直接和主分支合并，即可回退到纯净版本



### 1.0.1
1. 通过@media控制自适应的宽度

@media:如果文档宽度小于 945 像素则让这个元素消失

```css
@media screen and (max-width: 945px) {
    display: none;
  }
```

2. 抽离全局的less，放入assets/style中，并完成全局less引入

   通过vite.config.ts配置css文件

   新建一个css对象，在css对象中新建一个预处理器对象preprocessorOptions

   在预处理器对象中，新建less对象

   插入键值对

   charset: false,

   additionalData: '@import "./src/assets/style/global.less";',

   ``` ts
   css: {
       // css预处理器
       preprocessorOptions: {
         less: {
           charset: false,
           additionalData: '@import "./src/assets/style/global.less";',
         },
   
       },
   ```


### 1.0.2

1. 引入嵌套路由概念，目前的计划：由主页（欢迎）和app主要内容两级，app父级路由内包含4个子路由

   --/

   --/app

   ----/apps

   ----/work

   ----/discover

   ----/market

2. SweetHome/index.vue（头部菜单栏）组件对应/app路由，默认重定向/apps(Apps组件)

3. 开始SweetHome/index.vue（头部菜单栏）组件的开发:

   一、派生点击事件，根据数字动态切换class，使点击的tab栏高亮

   二、派生获取焦点和失去焦点事件，使input搜索框动态展示，当获取焦点时，隐藏头部tab栏内的所有选项和内容，只显示Search搜索框，失去焦点则返回

4. 在根目录SweetHome文件夹下新建 Apps 、Discover、Knowledge、Music文件夹,分别新建index.vue（应用组件，发现组件，知识组件，音乐组件）

5. 开始Apps（侧边栏left-side）组件开发，主要是抽离右侧的主要内容区域，并且给左侧的每一栏绑定相应的路由router-link

6. 开始container（内容区域）组件开发，主要分All pps,Updates...等组件内容（待完善）

7. 对全局组件DarkLight进行开发，主要功能切换背景色

   ```js
   import { onMounted } from 'vue'
   // 通过点击事件，用户可以手动切换亮色主题或者暗色主题
   const toggleButton = () => {
     let status = localStorage.getItem('dark-light')
     if (status === 'dark') {
       localStorage.setItem('dark-light', 'light')
       document.body.classList.add('light-mode')
     } else if (status === 'light') {
       localStorage.setItem('dark-light', 'dark')
       document.body.classList.remove('light-mode')
     }
   }
   
   onMounted(() => {
     // 因为换肤是永久性的，不能刷新就又变成黑色模式，所以在挂在阶段就通过 localStorge 浏览器缓存 light 与 dark 的状态键值对
     let status = localStorage.getItem('dark-light')
     // 如果是 light ，就向 body 添加全局 class：light-mode
     if (status === 'light') {
       document.body.classList.add('light-mode')
     // 如果是 dark ，就向 body 删除全局 class：light-mode
     } else if (status === 'dark') {
       document.body.classList.remove('light-mode')
     // 如果不存在，就向用户存储默认dark
     } else {
       localStorage.setItem('dark-light', 'dark')
     }
   })
   ```

8. 通过js判断移动端还是web端,如果是移动端就删除video

   ```js
   // 识别用户是否是移动端，如果移动端，就让 video 标签失效
   const IsPc = () => {
     let userAgent = navigator.userAgent, Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
     return Agents.some((i) => {
       return userAgent.includes(i)
     })
   }
   let status  = IsPc()
   ```

   

### 1.0.s3

1. 完成了dialog组件，通过父向子defineProps传参和子向父传参emit 来开启关闭对话框，父组件通过插槽绘制input，手机号和验证码，并实现其功能（未完成

1. 完成了项目打包上线，但是因为路由使用了history模式，vue的单页面应用都是假路由，所以Nginx服务器刷新，真路由路径找不到，页面会报404找不到资源错误 

   ==解决方案==：在宝塔站点中修改域名伪静态，统一指向默认地址
   
   ```nginx
   if (!-e $request_filename) {
       rewrite ^/(.*) /index.html last;
       break;
   }
   ```
   
1. 测试axios跨域设置，后端接口postman验证成功，引入api.ts中进行登录验证~新增接口

   /==发送验证码==/==验证验证码==/==手机登录==

   并且当登录验证成功后在 pinia 中存入 userlist 数组中，由于登录成功后pinia获得的是proxy代理的对象，所以在pinia中引入了 toRaw 解析对象

   ```ts
   // 用户信息
       userInfoActions(userinfo: any) {
         this.userStore.userinfo = userinfo
         this.userStore.online = true
         setSession('userStore',toRaw(this.userStore))
       }
   ```

   

   但是解析的对象还不能存入sessionStroge,因为sessionStroge存储只接收字符串，所以在utils中封装了session.ts 专门把对象转化成json数据存入到sessionStroge中

   ```ts
   export const setSession = (key: string, value: any) => {
     if (typeof value == "object" || 'array') {//如果要存储对象，则先转为json串
       value = window.JSON.stringify(value);
     }
     sessionStorage.setItem(key, value);
   }
   ```

1. 完成登录接口的调试！在main.ts中封装了pinia持久化插件，防止刷新后数据丢失

   ```ts
   // pinia全局持久化
   type Options = {
     key?: string
   }
   
   const __pinaiaKey__: string = 'unknown'
   
   const setStorage = (key: string, value: unknown) => {
     localStorage.setItem(key, JSON.stringify(value))
   }
   const getStorage = (key: string) => {
     return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {}
   }
   
   const piniaPlugin = (options: Options) => {
     // console.log(options)
   
     return (context: PiniaPluginContext) => {
       const { store } = context
       const data = getStorage(`${options?.key ?? __pinaiaKey__}-${store.$id}`)
       console.log(data);
       
       // 当store发生改变时，触发subscribe
       store.$subscribe(() => {
         // 把用户需要的key和内容存入到localStorage
         setStorage(`${options?.key ?? __pinaiaKey__}-${store.$id}`, toRaw(store.$state))
       })
       // console.log(context, 'context')
       return {
         ...data
       }
     }
   
   }
   
   const store = createPinia()
   store.use(piniaPlugin({
     key: 'pinia'
   }))
   
   ```
   
   
   
1. 新增路由导航功能，对没有登录的访问者弹出回到首页中

   ``` js
   // 路由导航
   router.beforeEach((to,from,next) => {
     let loginStatus = localStorage.getItem('pinia-CloudMusic')
     if(whileList.includes(to.path) || loginStatus) {
       next()
     }else {
       alert('请登录后访问~')
       next({
         path:'/'
       })
     }
   })
   ```
   
   
   
1. 完成My Music模块的基本功能全部歌单已经实现（未来也许会添加评论等内容扩展，并且子标题中也可以加入滚轮监听事件，吸顶导航~），通过动态路由传参给playlistDetail模块传一个id参数

1. playlistDetail模块基本功能完善中，通过pinia记录上次传参的歌单id，这样用户去别的页面回来后还是在上次听歌的歌单里哦~（待：渲染歌单的所有歌曲、渲染此歌单的评论数）

1. 完成了My Home 的功能退出登录（其他功能暂定）



### 1.0.4

1. 完成音乐播放器 APlayer插件，点击歌曲后页面会刷新然后添加歌曲（props没有响应式和vue3 中 aplayer的坑，所以退而求次选择刷新来实现歌单的刷新）
1. 完成了My Music中“喜欢的音乐“功能
1. 正式修复了添加歌曲没有响应的bug，现在点击歌曲会自动监测是否含有这首歌，没有就加入（点击播放列表后如果已存在此歌曲应该进行播放这首歌此功能还未完成）
1. 完成了 Discover Music 发现音乐的页面
1. 完成了 Top Charts 排行榜的页面



### 1.0.5

1. 完成发现音乐的滚动到底部加载功能

2. 修复了响应式中一些样式的bug

3. 发现node后台并不能同时在线2个及以上的用户(完蛋)

4. 配置了环境变量现在开发和部署版本已经分开了

5. 更新了路由守卫的逻辑

6. 抽离了main.ts中的函数方便浏览

7. 优化了dialog v-move自定义指令，现在它不会在拖动时选中文字了

8. 优化了 mainheader 现在他会跟随滚轮高亮样式了

   

### 1.0.6

1. 完成了音乐的首页
2. 完成Discover 页面
3. 更新了dialog组件
4. 开始APPS菜单绘制 updates内容引入了md-editor-v3 编辑器插件 （准备接口代码提交文章入数据库
5. 新增添加文章类型、删除文章、新增文章、保存文章功能
6. 绘制Knowledge第一版内容，实现基本功能待完善
7. 问题：由于数据库的内容还是开发版本的接口，所以到时候要修改数据库（及分开模拟开发
8. 修复数据库，把路由拦截器从main.ts中抽离
9. 新增编辑文章功能
10. 新增鉴权，进入updates页面进行鉴权



### 1.0.7

1. 更新了konwledge的文章页面
2. 加入了vue进度条组件
3. 新增konwledge的topbutton组件
4. 更新了 Artist 页面, 二级页面
5. 更新了 mv 页面
6. 更新了 palylistdetail 的歌手点击
7. 增加播放mv功能
8. 增加删除播放列表功能
9. 增加防盗链刷新歌曲功能
10. 完成聊天室开发初期



### 1.0.8

	1. 性能优化，加入v-lazy懒加载图片
 	2. 优化打包体积失败，优化pwa ，ws离线加载失败
 	3. 加入token失败



### 未来计划：

~~准备增加异步组件进行代码分包，并且使用loading组件去加载内容~~~ √

为了实现之前吹的牛批，准备去学习cocos做小游戏

再去学习docker部署，去部署二级域名的游戏等等

搜索功能完善

~~main-header组件可以做成拖动形式，待优化~~ √

~~增加全部播放按钮~~

~~增加播放mv功能~~

~~增加删除播放列表功能~~

~~增加防盗链刷新歌曲功能~~

增加删除歌单歌曲功能



咀 2022-04-25 10:22:19
未来开发日志：
~~1.鼠标滚轮上下移动，顶层出现动漫娃娃交互~~
2.websocket聊天室

咀 2022-04-25 10:22:37
3.聊天室基础上做你画我猜

咀 2022-04-25 10:24:37
4.怪物融合类游戏大纲（两只怪物公+母融合，成功率=90%，失败则随机退化成父亲或者母亲，性别随机，1%概率变异成随机，可以挂机升级）

咀 2022-04-25 10:28:32
5.galgame，点击出文字选分支进入剧情

咀 2022-04-25 10:28:39
6.文字挂机游戏



This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build


```
