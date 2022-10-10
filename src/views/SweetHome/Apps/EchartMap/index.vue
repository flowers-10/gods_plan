<template>
    <div class="Echart-map">
      <HZmap></HZmap>
    </div>
</template>

<script lang="ts" setup>
import HZmap from '@/components/HZmap/index.vue'
import { ref } from "vue" 

</script>

<style lang="less" scoped>
.Echart-map {
  width: 100%;
  height: 100%;
}
</style>