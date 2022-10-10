<template>
  <div>
    <el-button @click="getRouter">获取动态路由</el-button>
    <router-link to="/demo1">去demo1</router-link>
  </div>
</template>

<script lang="ts" setup>
import { getrouter } from '@/api/gsApi'
import { useRouter } from 'vue-router';
// import demo1 from '../views/SweetHome/do/demo1.vue'

const router = useRouter()
const getRouter = async () => {
  console.log(1);
  let a = await getrouter()
  console.log(a);
  a.data.forEach((v: any) => {
    console.log(v);
    
    router.addRoute({
      path:v.path,
      name:v.name,
      component:() => import(`../../demo/${v.component}`)
    })
  })
}



</script>

<style lang="less" scoped>

</style>