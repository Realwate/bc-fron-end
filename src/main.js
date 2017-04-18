// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import ElementUI from "element-ui"
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI);
Vue.config.productionTip = false

import config from "@/config"

/* 图片地址增加baseurl */
Vue.filter('addBaseUrl', function (path) {
  return config.baseUrl+path;
})
/* 图片名字过滤 */
Vue.filter('imgNameFilter', function (fullName) {
  return fullName.substr(0,fullName.indexOf('.'));
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
