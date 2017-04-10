<template>
  <div v-loading="isLoading"
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

          <div class="prototype-imgs">
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
            <router-link to="/document/a87fb4b26f5e40ada2b3d994f05e89c5/edit">
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
        isEditing:false,
        isLoading:true,
        nodeLabel:"",
        document:{},
        toUpdateDocument:{},
        prototypeImgList:[],
        detailImgList:[],
        submitLoading:false
      }
    },
    computed:{
      uploadPrototypeFileURL(){
        return api.uploadFileURL(this.document.id,1);
      }
    },
    filters:{
      addBaseUrl(path){
        return config.baseUrl+path;
      },
      imgNameFilter(fullName){
        return fullName.substr(0,fullName.indexOf('.'));
      }
    },
    methods:{
      updateDocument(){
        api.updateDocument(this.document.id,this.toUpdateDocument)
          .then(({data:msg})=>{
            this.isEditing = false;
            this.submitLoading = false;
            this.document.overview = msg.data.overview;
            this.document.detail = msg.data.detail;
          })
        this.submitLoading = true;
      },
      editDescription(){
        this.isEditing = true;
        this.toUpdateDocument.overview = this.document.overview;
      },
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
          this.detailImgList = msg.data.detailImgList;
        })
    }
  }
</script>

<style scoped lang="scss">
  @import "../sass/common.scss";
  .prototype-imgs{
    @include clearfix();
  margin-top:20px;
  ul{
    display: flex;
    padding:0;
    justify-content: center;
    flex-wrap: wrap;
    list-style: none;
  }
  .img-item{
  @include clearfix();
    flex:0 0 auto;

    box-sizing: border-box;
    width: 80%;
    text-align:center;
    margin-bottom:30px;
    padding: 20px;
    border:1px dashed #ccc;
    .img-info{
      margin-top: 10px;
      font-weight:bold;
      font-size:18px;
    }
  img{
    width: 100%;
  &:hover{
     box-shadow: 0px 0px 20px 0px $light-blue;
   }
  }
  }
  }
  .upload-box{
    text-align: center;
    margin-top: 50px;
  }
  .upload-component{
    width: 360px;
    height: 180px;
    display: inline-block;
  }

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
