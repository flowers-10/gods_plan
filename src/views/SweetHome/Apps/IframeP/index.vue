<template>
    <div class="iframeP">
        单点登录发送页面
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
    iframe?.contentWindow?.postMessage(token, "http://www.godsplan.top/apps/allapps");
}, 4000);
setTimeout(function () {
    iframe.remove();
}, 6000);  
</script>

<style lang="less" scoped>
.iframeP {
    color: var(--theme-color);
    font-size: 30px;
}
</style>