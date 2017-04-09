<template>
  <div class="middle-wrapper">
    <div class="middle" v-loading="isLoading"
         element-loading-text="拼命加载中">
      <div class="middle-top-banner">
        <h2>{{nodeLabel}}</h2>
      </div>

      <div class="middle-content">

        <div v-if="document.overview">
          {{document.overview}}
        </div>

        <div v-else>

          <div class="prompt">
            暂无相关文档，请先添加！
          </div>


          <el-button style="margin-left: 10px;" size="middle" icon="plus" type="primary">添加</el-button>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import api from "@/api"
  export default {
    data(){
      return {
        isLoading:true,
          nodeLabel:"",
         document:{}
      }
    },
    created(){
      let documentId = this.$route.params.documentId;
      api.getDocumentById(documentId)
        .then(({data:msg})=>{

          this.isLoading = false;
            this.nodeLabel = msg.data.node.label;
          this.document = msg.data.document;
        })
    }
  }
</script>

<style scoped lang="scss">
  @import "../sass/common.scss";
  .middle-wrapper{
    background-color: #f4f4f4;
    padding: 20px 40px;
    min-height:calc(100vh - #{$app-header-height});
  }
  .middle{
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
    padding: 20px;
     @include common-box-shadow();

    .prompt{
      margin-bottom: 20px;
      font-size: 18px;
    }
  }
</style>
