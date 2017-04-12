import Vue from 'vue'
import Router from 'vue-router'

import middle from '@/components/menu/middle'
import productManage from '@/components/menu/productManage'
import mainProcess from '@/components/menu/mainProcess'
import testSystem from '@/components/menu/testSystem'
import userStory from '@/components/menu/userStory'


import commonWrapper from '@/components/index/commonWrapper'
import mainProduct from '@/components/index/mainProduct'
import businessDetail from '@/components/index/businessDetail'

import document from '@/components/document/document'
import viewDocument from '@/components/document/viewDocument'
import editDocumentDetail from '@/components/document/editDocument'


import store from "@/store"

import config from "@/config"

Vue.use(Router)

let routes = [
  {
    path: config.rootPath, redirect: config.rootPath+'/main',
    name:"home"
  },

  {
    path: config.rootPath+'/main',
    component:middle,
    children:[
      {
        path: "",
        component:productManage
      },
      {
        path: "user",
        component:userStory
      },
      {
        path: 'testSystem',
        component: testSystem,
        name:"testSystem"
      },
      {
        path: 'mainProcess',
        component: mainProcess,
        name:"mainProcess"
      },
    ]
  },
  {
    path:config.rootPath+"/index",
    component:commonWrapper,
    children:[
      {
        path: '',
        component: mainProduct,
        redirect:"product/1"
      },
      {
        path: 'product/:id',
        component: mainProduct,
        name:"product"
      },
      {
        path: 'businessDetail/:businessId',
        component: businessDetail,
      }
    ]

  },

  {
    path: config.rootPath+'/document/:documentId',
    component: document,
    children:[
      {
        path:"",
        component:viewDocument
      },
      {
        path:"edit",
        component:editDocumentDetail
      }
    ]
  },
]

const router = new Router({
  routes,
  mode:"history"
});

router.beforeEach((to, from, next) => {
  store.dispatch("changeDefaultActive",to.path);
  next(true) ;
})

export default router
