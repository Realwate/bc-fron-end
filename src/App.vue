<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import '@/sass/animate.css'
  import '@/sass/style.css'
  import '@/sass/style.scss'


export default {
  name: 'app',
  data(){
      return {
      }
  },
  methods:{
  },
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
