<template>
<div>
  <v-header></v-header>
  <router-view>

  </router-view>
</div>
</template>

<script>
  import vHeader from '@/components/header'
  export default {
      methods:{
        backHome(){
            this.$router.push({
                name:"home"
            })
        }
      },
    components:{
          vHeader
    }
  }
</script>

<style scoped lang="scss">
  @import "../sass/common.scss";
  header{
    @include clearfix();
    position: relative;
    text-align: center;
    height: $app-header-height;
    h1{
      font-weight:normal;
      display: inline-block;
      cursor: pointer;
    }
    p{
      margin:0;
    }
  }
</style>
