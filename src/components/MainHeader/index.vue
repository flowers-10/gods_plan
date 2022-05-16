<template>
  <div class="main-header">
    <div class="menu-link-main">{{menuLink}}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  menuLink:string
}>()
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  height: 58px;
  flex-shrink: 0;
  width: auto;
  .header-menu {
    margin-left: 150px;

    @media screen and (max-width: 1055px) {
      margin: auto;
    }

    a {
      padding: 20px 24px;
    }
  }
}


.menu-link-main {
  text-decoration: none;
  color: var(--theme-color);
  padding: 0 30px;
  @media screen and (max-width: 1055px) {
    display: none;
  }
}
</style>