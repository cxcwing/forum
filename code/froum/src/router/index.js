import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/login.vue'
import home  from '../views/home.vue'
import post  from '../views/post.vue'
import tale  from '../views/tale.vue'
import mainBox from '../views/mainBox.vue'
const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path:'/mainBox',
    name:'mainBox',
    component:mainBox,
    children:[
      {
        path:'/home',
        name :'home',
        component:home
      },
      {
        path:'/post',
        name:'post',
        component:post
      },
      {
        path:'/tale',
        name:'tale',
        component:tale
      }
    ]
  },
  {
    path:'/',
    redirect:'/home'
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
