import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/login.vue'
import home from '../views/home/home.vue'
import mainBox from '../views/mainBox.vue'
import routesConfig from './config.js'
import store from '@/store'
const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/mainBox',
    name: 'mainBox',
    component: mainBox
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes//
})

// routesConfig.forEach(item =>{
//   router.addRoute("mainBox",item)
// })

// router.addRoute("mainBox",{
//   path:'/home',
//   component:home
// })

//路由拦截
// router.beforeEach((to, from, next) => {
//   if (to.name === 'login') {

//     next()
//   } else {
//     if (!localStorage.getItem("token")) {
//       console.log("1111111111")
//       next({
//         path: '/login'
//       })
//     } else {
//       if (!store.state.isAddRouter) {
//         console.log(store.state.isAddRouter)
//         configRoutes()
//         next({
//           path: to.fullPath
//         })

//       } else {
//         next()
//       }

//     }
//   }
// })





const ConfigRouter = () => {
  if (!router.hasRoute("mainBox")) {
    router.addRoute({
      path: "/mainBox",
      name: "mainBox",
      component: mainBox,

    })
  }

  routesConfig.forEach(item => {
    checkPerminssion(item) && router.addRoute("mainBox", item)
  })

  store.commit("changeIsAddRouter", true)
}

const checkPerminssion = (item) => {
  if (item.requireAdmin) {
    return store.state.UserInfo.role === 1
  }

  return true

}

router.beforeEach((to, from, next) => {
  if (to.name === "login") {
    console.log('login')
    next()
  } else {
    //如果授权(已经登录过了) next()
    //未授权, 重定向到login
    if (!localStorage.getItem("token")) {
      console.log('no')
      next({
        path: "/login"
      })
    } else {
      console.log('yes',store.state.isAddRouter)
      if (!store.state.isAddRouter) {
        console.log('aaa')
        router.removeRoute("mainBox")

        ConfigRouter()
        next({
          path: to.fullPath
        })
      } else {
        // console.log(mainBox)

        next()
      }
    }
  }
})
export default router
