import Vue from 'vue'
import Router from 'vue-router'

import middle from '@/components/middle'

import mainProduct from '@/components/main'
import mainProcess from '@/components/mainProcess'
import testSystem from '@/components/testSystem'
import viewDocument from '@/components/viewDocument'


Vue.use(Router)

let routes = [
  {
    path: '/', redirect: '/main'
  },
  {
    path: '/main',
    component:middle,
    children:[
      {
        path: "",
        redirect:"product/1"
      },
      {
        path: 'product/:id',
        component: mainProduct,
      },
      {
        path: 'mainProcess',
        component: mainProcess
      },
      {
        path: 'testSystem',
        component: testSystem
      }
    ]
  },

  {
    path: '/document/:documentId',
    component: viewDocument,
  },
]

export default new Router({
  routes,
  mode:"history"
})
