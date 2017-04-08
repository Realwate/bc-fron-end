import Vue from 'vue'
import Router from 'vue-router'

import mainProduct from '@/components/main'
import mainProcess from '@/components/mainProcess'
import testSystem from '@/components/testSystem'

Vue.use(Router)

let routes = [
  {
    path: '/', redirect: '/product/1'
  },
  {
    path: '/product/:id',
    component: mainProduct,
  },
  {
    path: '/mainProcess',
    component: mainProcess
  },
  {
    path: '/testSystem',
    component: testSystem
  },
]

export default new Router({
  routes,
  mode:"history"
})
