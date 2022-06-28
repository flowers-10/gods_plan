<template>
    <div class="content-section">
      <div class="content-section-title">{{title}}</div>
        <slot :name="slotName"></slot>
    </div>
</template>

<script lang="ts" setup>
// 接收父组件传参
const props = defineProps<{
 title:string,
 slotName:string
}>()

</script>

<style lang="less" scoped>


.content-section {
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  width: 100%;

  &-title {
    color: var(--content-title-color);
    margin-bottom: 14px;
  }


}
</style>