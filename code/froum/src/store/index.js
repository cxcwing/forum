import createPersistedState from "vuex-persistedstate"
import { createStore } from 'vuex'

export default createStore({
  state: {
    massageIsShow:false,
    userFormInfo:{}
  },
  getters: {
  },
  mutations: {
    changeMassageIsShow(state,isShow){
      state.massageIsShow = isShow
      
    },
    changeUserFormInfo(state,userForm){
      state.userFormInfo={
        ...state.userFormInfo,
        ...userForm
      }

    },
    changeUserMarckTime(state,marckTime){
      state.userFormInfo.marckTime = marckTime
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    paths:["userFormInfo"]
  })],
})

