<template>
    <div>
123
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"   
// 获取 token  
var token = "你好我是token";  
  
// 动态创建一个不可见的iframe，在iframe中加载一个跨域HTML  
var iframe = document.createElement("iframe");  
iframe.src = "http://www.godsplan.top/apps/signcross";  
document.body.append(iframe);  
// 使用postMessage()方法将token传递给iframe  
setTimeout(function () {  
    iframe?.contentWindow?.postMessage(token, "http://www.godsplan.top");  
}, 4000);  
setTimeout(function () {  
    iframe.remove();  
}, 6000);  
</script>

<style lang="less" scoped>

</style>