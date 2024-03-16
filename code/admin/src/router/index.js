import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/login/login.vue'
import home  from '../views/home/home.vue'
const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path:'/home',
    name:'home',
    component:home
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes//
})

export default router
