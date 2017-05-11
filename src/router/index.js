import Vue from 'vue'
import Router from 'vue-router'

import main from '@/components/main'

import middle from '@/components/menu/middle'
import productManage from '@/components/menu/productManage'
import mainProcess from '@/components/menu/mainProcess'
import testSystem from '@/components/menu/testSystem'
import userStory from '@/components/menu/userStory'

import demoIndex from '@/components/demo/demoIndex'

import commonWrapper from '@/components/index/commonWrapper'
import mainProduct from '@/components/index/mainProduct'
import businessDetail from '@/components/index/businessDetail'
import userStoryIndex from '@/components/index/userStoryIndex'

import document from '@/components/document/document'
import viewDocument from '@/components/document/viewDocument'
import editDocumentDetail from '@/components/document/editDocument'


import store from "@/store"

import config from "@/config"

Vue.use(Router)

let routes = [
  {//部分示例
    path: config.rootPath+'/demo',
    component:demoIndex
  },
  {
    path: config.rootPath,
    component:main,
    children:[
      {
        path:"",
        redirect:config.rootPath+'/main/'
      },
      { //首页
        path: 'main',
        component:middle,
        children:[
          {
            path: "",
            component:productManage,
            name:"home"
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
      { //统一导航样式
        path:config.rootPath+"/index",
        component:commonWrapper,
        children:[
          {
            path: '',
            component: mainProduct,
            redirect:"product/1"
          },
          {
            path: 'product/:id', //产品形态具体
            component: mainProduct,
            name:"product"
          },
          {
            path: 'businessDetail/:businessId',
            component: businessDetail,
          },
          {
            path: 'userStory',
            component: userStoryIndex,
          }
        ]

      },

      { //文档相关
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
  },

]

const router = new Router({
  routes,
  mode:"history",
  scrollBehavior (to, from, savedPosition) {
    // console.log("savedPosition",savedPosition);
    if (savedPosition) {
      return savedPosition; /* 默认记录了滚动的状态 */
    } else {
      return { x: 0, y: 0 }
    }
  }
});

router.beforeEach((to, from, next) => {
  store.dispatch("changeDefaultActive",to.path);
  next(true) ;
})

export default router
