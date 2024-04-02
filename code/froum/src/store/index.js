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
      
      if(state.userFormInfo.toGood){
    

        state.userFormInfo.toGood  = JSON.parse(state.userFormInfo.toGood)

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

