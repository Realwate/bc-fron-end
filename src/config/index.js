
var config = {
  baseUrl:"http://localhost:8082/BC-backend/api",
  rootPath:"",

};
if(process.env.NODE_ENV == 'production'){
  config = {
    baseUrl:"/BC-backend/api", /* api地址 */
    rootPath:"/BC-backend",   /* 前端路由 根地址 */
  }
}



export default config
