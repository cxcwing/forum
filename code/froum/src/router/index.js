import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/login.vue'
import home from '../views/home.vue'
import post from '../views/post.vue'
import tale from '../views/tale.vue'
import mainBox from '../views/mainBox.vue'
import taleView from '../views/tale-view.vue'
import postView from '../views/post-view.vue'
import Center from '@/components/center.vue'
import homeCenter from '@/components/home/center.vue'
import homeMessage from '@/components/home/message.vue'
import controll from '@/views/controll.vue'
import postList from '@/components/controll/postList.vue'
import taleList from '@/components/controll/taleList.vue'
import articleAdd from '@/components/controll/articleAdd.vue'
import articleEdit from '@/components/controll/articleEdit.vue'
import articleHome from '@/components/controll/articleHome.vue'
const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/mainBox',
    name: 'mainBox',
    component: mainBox,
    children: [
      {
        path: '/home',
        name: 'home',
        component: home,
        children: [
          {
            path: '/home/center',
            name: 'homeCenter',
            component: homeCenter,
          },
          {
            path: '/home/message',
            name: 'homeMessage',
            component: homeMessage,
          }
        ]
      },
      {
        path: '/controll',
        name: 'controll',
        component: controll,
        children: [
          {
            path:'/controll/article-home',
            name:'articleHome',
            component:articleHome
          },
          {
            path: '/controll/postList',
            name: 'postList',
            component: postList
          },
          {
            path: '/controll/taleList',
            name: 'taleList',
            component: taleList
          },
          {
            path: '/controll/article-add',
            name: 'articleAdd',
            component: articleAdd
          },
          {
            path: '/controll/article-edit',
            name: 'articleEdd',
            component: articleEdit
          }
        ]
      },
      {
        path: '/post',
        name: 'post',
        component: post
      },
      {
        path: '/tale',
        name: 'tale',
        component: tale
      },
      {
        path: '/tale-view/:id',
        name: 'tale-view',
        component: taleView
      },
      {
        path: '/post-view/:id',
        name: 'post-view',
        component: postView
      },

    ]

  },

  {
    path: '/',
    redirect: '/tale'
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
