
import axios from 'axios';
import config from '../config'
import NProgress from "nprogress"

//全局axios默认设置
axios.defaults.headers.post['Content-Type'] = 'application/json';


const authAxios = axios.create();
authAxios.defaults.headers.post['Content-Type'] = 'application/json';

if(localStorage.getItem('jwt')){
  //发送需要认证的请求 带上token 后台会校验后再返会
  authAxios.defaults.headers.common['Authorization'] = "Bearer "+localStorage.getItem('jwt').replace(/(^\")|(\"$)/g,'')
}


authAxios.interceptors.request.use(config=>{
  NProgress.start();
  console.log("start")
  return config
},err=>{
  // store.dispatch('showProgress',100)
  return Promise.reject(err)
})
// axios拦截响应
authAxios.interceptors.response.use(response=>{
  NProgress.done();
  return response
},err=>{
  return Promise.reject(err)
});
//拦截请求，控制顶部进度条
axios.interceptors.request.use = authAxios.interceptors.request.use;

//前后端分离，调用后端服务
axios.defaults.baseURL = authAxios.defaults.baseURL = config.baseUrl;


export default{
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
  updateNodeInfo(nodeInfo){
    return axios.put("/nodeInfo",nodeInfo);
  },
  getAllNodeInfo(){
    return axios.get("/nodeInfo");
  },

  /* document */
  getDocumentById(documentId){
    return axios.get(`/document/${documentId}`);
  }
}
