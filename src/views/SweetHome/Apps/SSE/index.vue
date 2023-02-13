<template>
    <div class="sse">
      {{ sseList }}
    </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue" 

const sseList = reactive<any>([])

var source=new EventSource("http://192.168.50.156:8000/sse/echarts");
	source.onmessage=function(event)
	{
		console.log(event.data)
    sseList.push(event.data)
	};

</script>

<style lang="less" scoped>
.sse {
  overflow: scroll;
  height: 100%;
  width: 100%;
  color: var(--theme-color);
}
</style>