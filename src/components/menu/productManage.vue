<template>
  <div class="product-list">

    <div class="group">
    <router-link :to="{path:`${config.rootPath}/index/product/1?navTitle=外系统数据采集`}" class="btn bg-blue">
      外系统数据采集
    </router-link>

    <router-link :to="{path:`${config.rootPath}/index/product/2?navTitle=EPM平台`}" class="btn bg-blue">
      EPM平台
    </router-link>
      <router-link :to="{path:`${config.rootPath}/index/product/3?navTitle=动态建模平台(UAP)`}" class="btn bg-blue">
        动态建模平台(UAP)
      </router-link>
    </div>

    <div class="group">
      <router-link :to="{path:`${config.rootPath}/index/product/11?navTitle= 业务合并(Web端)`}" class="btn bg-red">
        业务合并(Web端)
      </router-link>
      <router-link :to="{path:`${config.rootPath}/index/product/12?navTitle= NC-Web`}" class="btn bg-red">
        NC-Web
      </router-link>
      <router-link :to="{path:`${config.rootPath}/index/product/13?navTitle= IUAP`}" class="btn bg-red">
        IUAP
      </router-link>
    </div>

    <div class="group">
      <router-link :to="{path:`${config.rootPath}/index/product/21?product= EXCEL客户端`}" class="btn bg-green">
        EXCEL客户端
      </router-link>
      <router-link :to="{path:`${config.rootPath}/index/product/22?product= 业务合并EXCEL端`}" class="btn bg-green">
        业务合并EXCEL端
      </router-link>

    </div>


    <icon-desc class="icons" :settings="iconSettings"></icon-desc>
  </div>
</template>

<script>
  import config from '@/config'
  import iconDesc from "@/components/icondesc"
  export default {
    data(){
      return {
          config:config,
        iconSettings:[
        {classNames:["icon","bg-blue"],label:"NC端"},
        {classNames:["icon","bg-red"],label:"Web端"},
        {classNames:["icon","bg-green"],label:"Excel端"},
      ]
      }
    },
    methods:{

    },
    components:{
      iconDesc
    }
  }
</script>

<style scoped lang="scss">
  @import "../../sass/common.scss";
.product-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
}
  .group{
    box-sizing: border-box;
    flex:0 0 20%;
  }
  .btn{
    margin-bottom: 20px;
    margin-left:30px;
    color: #f3f3f3;
  }
  .icons{
    flex:0 0 100%;
  }

</style>
