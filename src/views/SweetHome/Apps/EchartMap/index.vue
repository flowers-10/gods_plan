<template>
    <div class="Echart-map">
      <HZmap></HZmap>
    </div>
</template>

<script lang="ts" setup>
import HZmap from '@/components/HZmap/index.vue'
import { ref } from "vue" 
var source=new EventSource("http://192.168.50.156:8000/sse/echarts");
	source.onmessage=function(event)
	{
		console.log(event.data)
	};
</script>

<style lang="less" scoped>
.Echart-map {
  width: 100%;
  height: 100%;
}
</style>