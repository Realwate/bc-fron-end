<template>
  <div class="w">

    <aside>
      <div class="back-home-wrapper">
        <el-tooltip content="回到首页" placement="left">
        <i @click="backHome" class="iconfont back-home">&#xe602;</i>
        </el-tooltip>
      </div>
      <div class="tree-wrapper">
        <el-tree class="tree" :data="data" :props="defaultProps"
                 :expand-on-click-node="false"
                 @node-click="handleNodeClick"></el-tree>
      </div>
    </aside>
    <div class="demo">
      <iframe ref="demo" name="demo" src="" frameborder="0">
      </iframe>
    </div>
  </div>
</template>

<script>
  import api from "@/api"
  import config from "@/config"

  export default {
    data(){
      return {
        data: [{
          label: '一级 1',
          src:'https://www.hao123.com/'
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1',
              src:'http://cn.bing.com/'
            }]
          }]
        }],
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
  .w{
    background: #fff;
    height:100vh;
    box-sizing: border-box;
  }
  .tree-wrapper{
    padding-top: 30px;
    margin-top: -30px;
    height: 100%;
    box-sizing: border-box;
  }
  aside{
    width: 180px;
    float: left;
    padding: 10px;
    height: 100%;
    box-sizing: border-box;
  }
  .back-home-wrapper{
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
  .back-home{
    font-size: 20px;
    cursor: pointer;
    &:hover{
       font-size: 24px;
       font-weight:500;
     }
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

</style>
