<template>
  <div class="adv-bar">
    <div class="img-content" v-for="item in 9" :key="`adv_${item}`">
      <div class="fake-img" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/style/_common.scss";
.adv-bar {
  position: absolute;
  width: 200px;
  height: calc(100vh - 195px);
  background-color: transparent;
  overflow-y: auto;
  overflow-x: hidden;
  transition: right 0.25s ease;

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 0px;
  }
}
@include mixin-phone {
  .adv-bar {
    right: -200px;
  }
}
@include mixin-pc {
  .adv-bar {
    right: 0;
  }
}
.img-content {
  padding: 10px 15px;
}
.fake-img {
  width: 170px;
  height: 140px;
  background-color: #c4c4c4;
}
</style>