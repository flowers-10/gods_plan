<template>
  <div class="beian">
    <a class="beian-a" target="_blank"
      href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010902003246"><img
        src="@/assets/images/备案图标.png" style="float:left;margin-right: 5px;" />
      <span>浙公网安备 33010902003246号
      </span>
    </a>
    <a class="beian-a" target="_blank" href="https://beian.miit.gov.cn/#/Integrated/index">
      <span> 浙ICP备2022012289号
      </span>

    </a>
  </div>
</template>

<style lang="less" scoped>
.beian {
  width: 100%;
  margin: 0 auto;
  // left: 50%;

  // transform: translateX(-50%);
  display: flex;
  justify-content: center;

  &-a {
    color: var(--button-inactive);
    padding: 5px;
    font-size: 12px;
    display: flex;
    align-items: center;
  }
}
</style>