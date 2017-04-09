<template>
  <div class="w">

    <v-sidebar :styleObj="styleObj"></v-sidebar>

    <div class="main">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  import vSidebar from '@/components/sidebar'
  export default {
     data(){
         return {
           styleObj:{
             marginLeft:"0"
           }
         }
     },
    methods:{
      hidden(){
        if(this.isShow) {
          this.styleObj.marginLeft = "-220px";
        }
        else{
          this.styleObj.marginLeft = "0";
        }
        this.isShow = !this.isShow;
      }
    },
    components:{
      vSidebar
    }
  }
</script>

<style scoped lang="scss">
  @import "../sass/style.scss";
  @import "../sass/common.scss";
  .w{
    display: flex;
    min-height:calc(100vh - #{$app-header-height})
  }
  .main{
  @include clearfix();
    flex:1;
    background-color: #fff;
    display: flex;
    padding:5px;
    overflow: auto;
  }
</style>
