<template>
    <div class="update">
      123
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue" 
import { getVideo } from "@/api/gsApi";
const getVideos = async () => {
    let res = await getVideo()
    console.log(res);
}
onMounted(()=>{
  getVideos()
}) 
</script>

<style lang="less" scoped>
.update {
  width: 100%;
  height: 100%;
  background-color: #fff;
  cursor: pointer;
}
</style>
