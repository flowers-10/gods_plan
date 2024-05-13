<script setup lang="ts">
import { World, Model,OrbitCamera } from "lingo3d-vue"
</script>

<template>
  <World>
    <Model
      
      :scale="5"
      toon
     
    ></Model>
    <!-- <OrbitCamera active enable-zoom ></OrbitCamera> -->
  </World>
</template>
