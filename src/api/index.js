
import axios from 'axios';
import config from '../config'

//全局axios默认设置
axios.defaults.headers.post['Content-Type'] = 'application/json';

/* 身份验证设置 */
// const authAxios = axios.create();
// authAxios.defaults.headers.post['Content-Type'] = 'application/json';
//
// if(localStorage.getItem('jwt')){
//   //发送需要认证的请求 带上token 后台会校验后再返会
//   authAxios.defaults.headers.common['Authorization'] = "Bearer "+localStorage.getItem('jwt').replace(/(^\")|(\"$)/g,'')
// }


//前后端分离，调用后端服务
axios.defaults.baseURL = /*authAxios.defaults.baseURL =*/ config.baseUrl;


export default{
  uploadFileURL(documentId,type){
    return config.baseUrl+`/document/${documentId}/file?type=${type}`;
  },
  getAllProducts(){
    //return axios.put("/api/user",{id:1,name:"das"});
    return axios.get("/product");
  },

  /* node */
 getNodeByProductId(productId){
    return axios.get(`/node?productId=${productId}`)
 },
  addNode(node){
    return axios.post("/node",node);
  },
  updateNode(node){
    return axios.put("/node",node);
  },
  deleteNode(nodeId){
    return axios.delete(`/node/${nodeId}`)
  },

  /* nodeInfo */
  addNodeInfo(nodeInfo){
    return axios.post("/nodeInfo",nodeInfo);
  },
  deleteNodeInfo(id){
    return axios.delete(`/nodeInfo/${id}`)
  },
  updateNodeInfo(nodeInfo){
    return axios.put("/nodeInfo",nodeInfo);
  },
  // getAllNodeInfo(){
  //   return axios.get("/nodeInfo");
  // },
  getNodeInfoByProductId(productId){
    return axios.get(`/nodeInfo?productId=${productId}`);
  },

  /* document */
  getDocumentById(documentId){
    return axios.get(`/document/${documentId}`);
  },
  deleteFileById(documentId,fileId){
    return axios.delete(`/document/${documentId}/file/${fileId}`);
  },
  updateDocument(documentId,doc){
    return axios.put(`/document/${documentId}`,doc);
  }

  /* file */

}
