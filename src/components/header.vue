<template>
<div>
  <header>
    <h1>业务合并</h1>
    <p>(Business Consolidation:BC)</p>
    <span @click="hidden">
      <i :class="[isShow?'el-icon-d-arrow-left':'el-icon-d-arrow-right']" class="icon-toggle" ></i>
    </span>
  </header>
</div>
</template>

<script>

  export default {
      methods:{
          hidden(){

              this.$emit("click");
          }
      },
    props:["isShow"]
  }
</script>

<style scoped lang="scss">
  @import "../sass/common.scss";
  header{
    @include clearfix();
    position: relative;
    text-align: center;
    height: 120px;
    h1{
      font-weight:normal;
    }
    .icon-toggle{
      position: absolute;
      left: 10px;
      bottom: 10px;
      cursor: pointer;
    }
  }
</style>
