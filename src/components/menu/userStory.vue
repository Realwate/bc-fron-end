<template>

  <div class="wrapper">
    <router-link style="flex:0 0 auto;" :to="{path:`${config.rootPath}/index/userStory?navTitle=用户故事`}" class="btn bg-red">
      用户故事
    </router-link>
  </div>
</template>

<script>
  import config from '@/config'
  export default {
    data(){
      return {
        config:config
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "../../sass/common.scss";
  .wrapper{
    display: flex;
    width: 100%;
    height: 100%;
    justify-content:center;
    align-items: center;
  }
</style>
