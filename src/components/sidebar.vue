<template>
    <aside :style="styleObj">
      <el-menu router @select="menuSelect" default-active="/main/product/1" class="el-menu-vertical-demo">
        <el-submenu index="product">
          <template slot="title">产品形态</template>
          <el-menu-item index="/main/product/1">动态建模平台</el-menu-item>
          <el-menu-item index="/main/product/2">EPM平台</el-menu-item>
          <el-menu-item index="/main/product/3">外系统数据</el-menu-item>
          <el-menu-item index="/main/product/4">业务合并(Excel端)</el-menu-item>
          <el-menu-item index="/main/product/5">业务合并(WEB端)</el-menu-item>
          <el-menu-item index="/main/product/6">EXCEL客户端</el-menu-item>
        </el-submenu>
        <el-menu-item index="/main/mainProcess">关键业务流程</el-menu-item>
        <el-menu-item index="/main/testSystem">测试系统</el-menu-item>
      </el-menu>
    </aside>
</template>

<script>
  import api from "@/api"
  import { mapState } from 'vuex'
  export default {

    data(){
        return {

        }
    },
    created(){
        //默认productId = 1
      this.$store.dispatch("changeProductId",1);
//      api.getNodeByProductId(1)
//        .then(({data})=>{
//
//        })
    },
    methods:{
      menuSelect(index,path){
          if(path[0].endsWith("product")){
            //获取productId对应的node
            var productId = index.substr(index.lastIndexOf("/")+1);
            this.$store.dispatch("changeProductId",productId);

          }
      }
    },
    props:["styleObj"]
  }
</script>

<style scoped>
  aside{
    flex:0 0 220px;
    transition:all .3s linear;
  }

</style>
