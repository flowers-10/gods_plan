<template>
  <div class="main-container">
    <main-header :menuLink="menuLink" :menuItemsList="menuItemsList"></main-header>
    <div class="content-wrapper">
      <slot>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
type menu = {
  title: string, path?: string, slotName: string
}
const props = defineProps<{
  menuLink: string,
  menuItemsList: menu[]
}>()
</script>

<style lang="less" scoped>
.main-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-bottom: 90px;
  }


.content-wrapper {
  display: flex;
  flex-direction: column;
  color: var(--theme-color);
  padding: 20px 40px;
  height: 100%;
  overflow: auto;
  background-color: var(--theme-bg-color);
  background-size: 100% 100%;
  background-position: center center;

  @media screen and (max-width: 510px) {
    padding: 20px 20px 100px 20px;
  }

  &-header {
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: 14px;
    padding: 20px 40px;
    background-color: var(--content-bg);

    @media screen and (max-width: 415px) {
      padding: 20px;
    }
  }

  &.overlay {
    pointer-events: none;
    transition: 0.3s;
    background-color: var(--overlay-bg);
  }
}
</style>