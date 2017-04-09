<template>
  <div id="app">
    <v-header @click="hidden" :isShow="isShow"></v-header>
    <router-view>

    </router-view>
  </div>
</template>

<script>
  import '@/sass/style.scss'
  import 'nprogress/nprogress.css'
//  import NProgress from 'nprogress'
//  NProgress.configure({ showSpinner: false });

  import vHeader from './components/header'



export default {
  name: 'app',
  data(){
      return {
        isShow:true,

      }
  },
  methods:{
  hidden(){}
  },
  components:{
    vHeader,

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

</style>
