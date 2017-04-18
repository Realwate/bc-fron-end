<template>
<div>
  <header>
    <h1 @click="backHome">业务合并</h1>
    <p>(Business Consolidation:BC)</p>
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
      }
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
  }
</style>
