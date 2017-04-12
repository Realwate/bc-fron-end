<template>  <!-- middle侧边栏 -->
    <aside>
      <el-menu router :default-active="defaultActive" class="el-menu-vertical-demo">

        <el-menu-item :index="config.rootPath+'/main'">产品形态</el-menu-item>
        <el-menu-item :index="config.rootPath+'/main/mainProcess'">关键业务流程</el-menu-item>
        <el-menu-item :index="config.rootPath+'/main/user'">用户故事</el-menu-item>
        <el-menu-item :index="config.rootPath+'/main/testSystem'">测试系统</el-menu-item>
      </el-menu>
    </aside>
</template>

<script>
  import api from "@/api"
  import { mapState } from 'vuex'
  import config from "@/config"

  export default {

    data(){
        return {
            config:config
        }
    },
    computed:{
      defaultActive(){
          return this.$store.state.defaultActive;
      }
    },

    methods:{
    },
  }
</script>

<style scoped>
  aside{
    flex:0 0 220px;
    /*transition:all .3s linear;*/
  }

</style>
