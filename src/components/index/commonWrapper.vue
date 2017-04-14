<template>
<div class="wrapper">
    <h2 class="nav-title">{{navTitle}}</h2>

  <div class="content">
      <router-view></router-view>
  </div>

</div>
</template>

<script>
export default {
    data(){
        return {
        }
    },
  created(){
        this.navTitle = this.$route.query.navTitle;
  }
}
</script>

<style scoped lang="scss">
  @import "../../sass/common.scss";


  .wrapper{
    background-color: $xlight-grey;
    padding: 20px 40px 30px;
  }
  .content{
    overflow: hidden;
    min-height:400px;
    background: #fff;
    padding: 20px 20px 40px;
  @include common-box-shadow();
  }



</style>
