<template>
  <div class="testingSystem">
      <a target="_blank" class="btn bg-blue" href="http://172.16.72.79:9086">NC端</a>
      <a target="_blank" class="btn bg-red" href="http://172.16.72.79:9085/bmweb">WEB端</a>
      <a target="_blank" class="btn bg-green" href='cmd:///c start excel -"NCOBA://#&#ptl=http#&#ip=172.16.72.79:9086#&#user=nigy#&#pwd=U_U++--V7a1e8a945a34df2096ef9e0707736753#&#ds=nc65gold0214#&#busisys=TB#&#language=simpchn#&#action=openexcel#&#args="'>Excel端</a>

    <router-link :to="{path:`${config.rootPath}/demo`}" class="btn bg-blue">
      演示
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

  .testingSystem{
    flex:1;
    display: flex;
    justify-content:center;
    align-items:center;
    .btn{
      flex:0 0 auto;
      +.btn{
         margin-left: 20px;
       }
    }
  }


</style>
