<template>
<div>
  <header>
    <h1 @click="backHome">业务合并</h1>
    <p>(Business Consolidation:BC)</p>
    <!--<span @click="hidden">-->
      <!--<i :class="[isShow?'el-icon-d-arrow-left':'el-icon-d-arrow-right']" class="icon-toggle" ></i>-->
    <!--</span>-->
  </header>
</div>
</template>

<script>

  export default {
      methods:{
        backHome(){
            this.$router.push({
                name:"home"
            })
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
    height: $app-header-height;
    h1{
      font-weight:normal;
      display: inline-block;
      cursor: pointer;
    }
    p{
      margin:0;
    }
    .icon-toggle{
      position: absolute;
      left: 10px;
      bottom: 10px;
      cursor: pointer;
    }
  }
</style>
