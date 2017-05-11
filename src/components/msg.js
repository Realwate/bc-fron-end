import Vue from "vue"

function showMessage(content,type){
  Vue.prototype.$message({
    message:content,
    type:type,
    showClose: true,
    duration:2500
  })
}
function alertSuccess(msg){
  showMessage(msg,"success")
}

function alertError(msg){
  showMessage(msg,"error")
}

function confirm(msg){
  return Vue.prototype.$confirm(msg, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
}

export default  {
  alertSuccess,
  alertError,
  confirm
}
