<template>
  <div class="w">

    <v-sidebar></v-sidebar>

    <div class="main">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  import vSidebar from './sidebar'
  export default {
     data(){
         return {
         }
     },
    methods:{
    },
    components:{
      vSidebar
    }
  }
</script>

<style scoped lang="scss">
  @import "../../sass/style.scss";
  @import "../../sass/common.scss";
  .w{
    display: flex;
    min-height:calc(100vh - #{$app-header-height})
  }
  .main{
  @include clearfix();
    flex:1;
    background-color: #fff;
    display: flex;
    padding:13px;
    overflow: auto;
  }
</style>
