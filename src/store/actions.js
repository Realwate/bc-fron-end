
import api from "../api"
import router from '../router'/*用于路由跳转*/

export default {
  changeProductId({commit},productId){
    commit("UPDATE_TREE_DATA",productId);
  },
  changeDefaultActive({commit},active){
    commit("CHANGE_DEFAULT_ACTIVE",active);
  }
}
