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

          <div class="upload-prototype-img">
            <div class="desc">
              原型图
            </div>

            <el-upload
              class="upload-demo"
              action="//jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>

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
         document:{},
        fileList:[]

      }
    },
    methods:{
      handleRemove(file, fileList) {
        console.log("remove",file, fileList);
      },
      handlePreview(file) {
        console.log("preview",file);
      },
      handleChange(file, fileList) {
        console.log("change",file,fileList)
      },
      submitUpload(){

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

  .upload-img{
    width: 500px;
    border:1px solid #333;
  }
    .prompt{
      margin-bottom: 20px;
      font-size: 18px;
    }
    .desc{
      margin-bottom: 20px;
    }
  }
</style>
