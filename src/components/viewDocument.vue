<template>
  <div v-loading="isLoading"
       element-loading-text="拼命加载中">

          <div class="imgs-show">
            <h3>原型图</h3>
            <ul>
              <li class="img-item" v-for="(img,index) in prototypeImgList">
                <a target="_blank" :href="img.path|addBaseUrl">
                  <img  :src="img.path|addBaseUrl" :alt="img.alt">
                </a>
                <div class="img-info">
                  <span>{{img.alt | imgNameFilter}}</span>

                    <el-button class="fr" size="mini" icon="delete" type="danger" @click="deleteImg(index,img.id)">删除</el-button>
                </div>

              </li>
            </ul>
          </div>

        <!-- 始终显示上传组件 -->
        <div class="upload-box">
          <el-upload
            class="upload-component"
            drag
            :action="uploadPrototypeFileURL"
            :on-success="handleSuccess"
            :on-error="handleError"
            mutiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>

        <div class="middle-footer">
          <div class="detail">
            <router-link :to="editUrl">
              详细需求
        </router-link>
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
        isLoading:true,
        nodeLabel:"",
        document:{},
        prototypeImgList:[],
      }
    },
    computed:{
      uploadPrototypeFileURL(){
        return api.uploadFileURL(this.document.id,1);
      },
      editUrl(){
          return `/document/${this.document.id}/edit`
      }
    },
    methods:{

      deleteImg(index,imgId){
        Msg.confirm("确认删除吗?")
          .then(()=>{
            api.deleteFileById(this.document.id,imgId)
              .then(({data:msg})=>{
                Msg.alertSuccess("删除成功")
                this.prototypeImgList.splice(index,1);
              })
          })


      },
      handleSuccess(response, file, fileList){
        if(response.error){
          Msg.alertError("上传失败!");
        }
        else{
          this.prototypeImgList.push(response.data);
          Msg.alertSuccess("上传成功!");
        }
      },
      handleError(response, file, fileList){
        Msg.alertError("上传失败!请检查网络");
      },

    },

    created(){
      let documentId = this.$route.params.documentId;
      api.getDocumentById(documentId)
        .then(({data:msg})=>{

          this.isLoading = false;
          this.nodeLabel = msg.data.node.label;
          this.document = msg.data.document;
          this.prototypeImgList = msg.data.prototypeImgList;
        })
    }
  }
</script>

<style scoped lang="scss">
  @import "../sass/common.scss";



  .middle-footer{
  @include clearfix();
    .detail{
      float: right;
      a{
        @extend %common-a;
      }
    }
  }

</style>
