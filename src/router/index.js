import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  },
  {
    path: '/user',
    component: () => import('@/views/User')
  },
  {
    name: 'article',
    path: '/article/:id',
    component: () => import('@/views/Article')
  },
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import('@/views/Video')
      },
      {
        path: '/qa',
        component: () => import('@/views/QA')
      },
      {
        path: '/profile',
        component: () => import('@/views/MY')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
