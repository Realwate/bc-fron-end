<template>
  <div id="app">
    <v-header @click="hidden" :isShow="isShow"></v-header>
    <div class="w">
      <v-sidebar :styleObj="styleObj"></v-sidebar>

      <div class="main">
        <router-view></router-view>
      </div>

    </div>
  </div>
</template>

<script>
  import '@/sass/style.scss'
  import 'nprogress/nprogress.css'
  import NProgress from 'nprogress'
  NProgress.configure({ showSpinner: false });

  import vHeader from './components/header'
  import vSidebar from './components/sidebar'


export default {
  name: 'app',
  data(){
      return {
        isShow:true,
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
    vHeader,
    vSidebar
  }
}
</script>

<style lang="scss">
  @import "./sass/normalize.scss";
  @import "./sass/style.scss";
  body{
    background-color: $light-grey;
    color: #333;
  }
  .w{
    display: flex;
    min-height:calc(100vh - 120px);
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
