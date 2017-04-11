<template>

  <div  v-loading="isLoading"
        element-loading-text="拼命加载中">
    <div class="doc-desc">
      <h3>
        描述
        <el-button @click="editDescription" class="fr" size="small">编辑</el-button>
      </h3>

      <el-form v-if="isEditing" ref="form" :model="toUpdateDocument" label-width="80px">
        <el-form-item label="修改描述">
          <el-input :rows="5" type="textarea" v-model="toUpdateDocument.overview"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="submitLoading" @click="updateDocument">提交</el-button>
          <el-button @click="isEditing=false">取消</el-button>
        </el-form-item>
      </el-form>
      <pre v-else>{{document.overview}}</pre>

    </div>


    <div class="imgs-show">
      <h3>详细需求</h3>
      <ul>
        <li class="img-item" v-for="(img,index) in detailImgList">
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
</div>

</template>

<script>
  import api from "@/api"
  import config from "@/config"
  import Msg from "./msg"

  export default {
    data(){
      return {
        isLoading:false,
        isEditing:false,
        detailImgList:[],
        document:{},
        submitLoading:false,
        toUpdateDocument:{},
        documentId:this.$route.params.documentId
      }
    },
    created(){
      this.isLoading = true;
//      console.log(this.documentId)
      api.getDocumentById(this.documentId)
        .then(({data:msg})=>{

          this.isLoading = false;
          this.detailImgList = msg.data.detailImgList;
        })
    },
    computed:{
      uploadPrototypeFileURL(){
        return api.uploadFileURL(this.documentId,2);
      }
    },

    methods:{
      updateDocument(){
        api.updateDocument(this.documentId,this.toUpdateDocument)
          .then(({data:msg})=>{
            this.isEditing = false;
            this.submitLoading = false;
            this.document.overview = msg.data.overview;
            this.document.detail = msg.data.detail;
          })
        this.submitLoading = true;
      },
      editDescription(){
        this.isEditing = !this.isEditing;
        this.toUpdateDocument.overview = this.document.overview;
      },
      deleteImg(index,imgId){
        Msg.confirm("确认删除吗?")
          .then(()=>{
            api.deleteFileById(this.documentId,imgId)
              .then(({data:msg})=>{
                Msg.alertSuccess("删除成功")
                this.detailImgList.splice(index,1);
              })
          })


      },
      handleSuccess(response, file, fileList){
        if(response.error){
          Msg.alertError("上传失败!");
        }
        else{
          this.detailImgList.push(response.data);
          Msg.alertSuccess("上传成功!");
        }
      },
      handleError(response, file, fileList){
        Msg.alertError("上传失败!请检查网络");
      },
    }
  }
</script>

<style scoped lang="scss">

 </style>
