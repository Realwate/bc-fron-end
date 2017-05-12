<template>
  <div class="w">

    <header>
      <i @click="showMenu = !showMenu;" class="iconfont icon menu">&#xe639;</i>
    </header>

    <transition  name="slide-fade">
      <aside v-if="showMenu">
        <div class="back-home-wrapper">
          <i @click="backHome" class="iconfont icon back-home">&#xe602;</i>
          <i @click="showMenu = !showMenu;" class="iconfont icon menu">&#xe646;</i>
        </div>
        <div class="tree-wrapper">
          <el-tree class="tree" :data="data" :props="defaultProps"
                   :expand-on-click-node="false"
                   @node-click="handleNodeClick"
                   highlight-current
                   default-expand-all
          ></el-tree>
        </div>
      </aside>
    </transition>
    <div class="demo">
      <iframe ref="demo" name="demo" src="" frameborder="0">
      </iframe>
    </div>
  </div>
</template>

<script>
  import api from "@/api"
  import config from "@/config"
  import demoData from "./demoData"
  export default {
    data(){
      return {
        showMenu:true,
        data: demoData,
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods:{
      handleNodeClick(data) {
          if(data.src)
          {
            this.$refs.demo.src = data.src;
          }
      },
      backHome(){
          this.$router.push({
              name:"home"
          })
      }
    }

  }
</script>

<style scoped lang="scss">
  @import "../../sass/common.scss";
  $aside-width:180px;
  .w{
    background: #fff;
    height:100vh;
    box-sizing: border-box;
  }
  header{
    position: fixed;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
  }
  .tree-wrapper{
    padding-top: 30px;
    margin-top: -30px;
    height: 100%;
    box-sizing: border-box;
  }
  aside{
    width: $aside-width;
    position: fixed;
    left: 0;
    top: 0;
    float: left;
    padding: 10px;
    height: 100%;
    box-sizing: border-box;
    background: #fff;
  }
  .back-home-wrapper{
    height: 30px;
    line-height: 30px;
    text-align: center;
    padding:0 30px;
  }
  .icon{
    font-size: 22px;
    cursor: pointer;

    &:hover{
       font-size: 26px;
       font-weight:500;
       color: $dark-blue;
     }
  }
  .back-home{
    float: left;
  }
  .menu{
    float: right;
  }

  .tree{
    height: 100%;
  }
  .demo{
    overflow: hidden;
    height: 100%;
  }
  iframe{
    width: 100%;
    height: 100%;
  }

  .slide-fade-enter-active {
    transition: all .4s cubic-bezier(.69,.09,.42,1.15);
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-active {
    transform: translateX($aside-width * (-1));
  }

</style>
