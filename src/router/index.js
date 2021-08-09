import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'views/Home'
import { isLogin } from '../utils'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      needLogin: false,
      keepAlive:true
    },
  },
  {
    path: '/cart',
    name: 'cart',
    meta: {
      needLogin: false,
    },
    component: ()=> import ('views/Cart')
  },
  {
    path: '/news',
    name: 'news',
    meta: {
      needLogin: false
    },
    component:()=> import ('views/News')
  },
  {
    path: '/classify',
    name: 'classify',
    meta: {
      needLogin: false,
      keepAlive:true
    },
    component:()=> import ('views/Classify')
  },
  {
    path: '/my',
    name: 'my',
    meta: {
      needLogin: false
    },
    component: ()=> import ('views/My')
  },
  {
    path: '/details',
    name: 'details',
    meta: {
      needLogin: false
    },
    component: ()=> import ('views/Details')
  },
  {
    path: '/itemList/a/:cateId/b/:cateName',
    name: 'itemList',
    meta: {
      needLogin: false
    },
    component: ()=> import ('views/ItemList')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      needLogin: false
    },
    component: ()=> import ('views/Login')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      needLogin: false
    },
    component: ()=> import ('views/Register')
  },
  {
    path: '/contactLists',
    name: '所有联系人',
    meta: {
      needLogin: true
    },
    component: ()=> import ('views/ContactLists')
  },
  {
    path: '/contactAdd',
    name: '添加联系人',
    meta: {
      needLogin: true
    },
    component: ()=> import ('views/ContactAdd')
  },
  {
    path: '/contactUpdate',
    name: '编辑联系人',
    meta: {
      needLogin: true
    },
    component: ()=> import ('views/ContactUpdate')
  },
  {
    path: '/order',
    name: '订单页',
    meta: {
      needLogin: true
    },
    component: ()=> import ('views/Order')
  },
  {
    path: '/seek',
    name: '搜索',
    meta: {
      needLogin:true
    },
    component: ()=> import ('views/Seek')
  },
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

//登录鉴权
router.beforeEach((to, from, next) => {
  // 当前路由是否需要登录
  if (!to.meta.needLogin) {
    next()
  } else {
    // 需要登录
    if (isLogin()) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          from: to.path,
        }
      })
    }
  }
})

export default router
