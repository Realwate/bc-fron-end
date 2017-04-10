<template>
  <div class="middle-wrapper">
    <div class="middle" >
      <div class="middle-top-banner">
        <h2>{{nodeLabel}}</h2>
      </div>

      <div class="middle-content">
        <router-view></router-view>
      </div>

    </div>
  </div>
</template>

<script>
  import api from "@/api"
  import config from "@/config"
  import Msg from "./msg"


  export default {
    data(){
      return {
          nodeLabel:"",
      }
    },
    methods:{

    },

    created(){
      let documentId = this.$route.params.documentId;
      api.getDocumentById(documentId)
        .then(({data:msg})=>{
            this.nodeLabel = msg.data.node.label;
        })
    }
  }
</script>

<style scoped lang="scss">
  @import "../sass/common.scss";
  .middle-wrapper{
    background-color: #f4f4f4;
    padding: 20px 40px 40px;
    min-height:calc(100vh - #{$app-header-height});
  }

  .middle-top-banner{
    background-color: #fff;
    padding: 0 40px;
    height: 60px;
    h2{
      line-height: 60px;
    }

    @include common-box-shadow();
    border-left:5px solid $blue;
    margin-bottom: 20px;
  }
  .middle-content{
    background-color: #fff;
    padding: 20px 30px;
     @include common-box-shadow();
  }

</style>
