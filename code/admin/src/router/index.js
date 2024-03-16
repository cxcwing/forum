import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/login.vue'
import home  from '../views/home/home.vue'
import mainBox  from '../views/mainBox.vue'
import routesConfig from './config.js'
const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path:'/mainBox',
    name:'mainBox',
    component:mainBox
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes//
})

routesConfig.forEach(item =>{
  router.addRoute("mainBox",item)
})

router.addRoute("mainBox",{
  path:'/home',
  component:home
})

export default router
