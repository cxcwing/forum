import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
export default createStore({
  state: {
    isAddRouter:false,
    // isCollapsed:false
    isCollapse:true
  },
  getters: {
  },
  mutations: {
    changeIsAddRouter(state,value){
      state.isAddRouter = value
    },
    changeIsCollapse(state){
      // console.log(state)
      state.isCollapse = !state.isCollapse
      // console.log(state.isCollapse)
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    paths:["isCollapsed"]
  })],
})
