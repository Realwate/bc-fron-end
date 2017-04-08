<template>
  <div class="icon-desc">
    <div class="icon-group">
      <span class="icon-unfinished mr5"></span>未开始
    </div>
    <div class="icon-group">
      <span class="icon-ing mr5"></span>进行中
    </div>
    <div class="icon-group">
      <span class="icon-finished mr5"></span>完成
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped lang="scss">
  @import "../sass/common.scss";

  .icon-desc{
    text-align: right;
    padding:10px 0;
    font-size: 14px;
  }
  .icon-group{
    display: inline-block;
  }
  .icon-group+.icon-group{
    margin-left: 10px;
  }
</style>
