import createPersistedState from "vuex-persistedstate"
import { createStore } from 'vuex'

export default createStore({
  state: {
    massageIsShow:false,
    userFormInfo:{},
    taleList:[],
    postList:[],
  },
  getters: {
  },
  mutations: {
    changeTaleList(state,taleList){
      // console.log(taleList)
      state.taleList= taleList
    },
    changePostList(state,taleList){
      // console.log(taleList)
      state.postList= taleList
    },
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
      if(state.userFormInfo.toGoodPost){
 
      state.userFormInfo.toGoodPost  = JSON.parse(state.userFormInfo.toGoodPost)
     
    } 
    console.log(state.userFormInfo.toGood ,'4',state.userFormInfo.toGoodPost)
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

