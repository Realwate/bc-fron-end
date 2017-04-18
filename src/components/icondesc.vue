<template>
  <div class="icon-desc">
    <div class="icon-group" v-for="setting in settings">
      <span class="icon mr5" :class="setting.classNames"></span>{{setting.label}}
    </div>
  </div>
</template>

<script>
  export default {
      props:["settings"]
  }
</script>

<style scoped lang="scss">
  @import "../sass/common.scss";

  .icon-desc{
    margin-top: 5px;
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
