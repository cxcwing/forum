import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
export default createStore({
  state: {
    isAddRouter:false,
    // isCollapsed:false
    isCollapse:true,
    userFormInfo:{}
  },
  getters: {
  },
  mutations: {
    changeUserFormInfo(state,value){
      state.userFormInfo = {
        ...state.userFormInfo,
        ...value
      }
    },
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
    paths:["isCollapse","userFormInfo"]
  })],
})
