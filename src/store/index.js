import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

function setInStorage(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj))
}
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}

const APOD_ENDPOINT = 'https://api.nasa.gov/planetary/apod?api_key=vJhYsnw8XKcF5hZMSXJMxdUG1T4VwJYy2KVmVeV1'



export default new Vuex.Store({
  state: {
    currentUser: getFromStorage('user') || undefined,
    apod: {}
   
  },
  mutations: {
    UPDATE_CURRENTUSER(state, user) {state.currentUser = user, setInStorage('user', user)},
    GET_APOD(state, apod){state.apod = apod}
  },
  actions: {
    getApod({commit}){
      axios.get(APOD_ENDPOINT)
      .then((response) => {
        commit('GET_APOD', response.data)
    })
    .catch(()=>{
      let backup = {url: 'https://apod.nasa.gov/apod/image/2007/NEOWISEBelowBigDipper-7-16-2020-TomMasterson1081.jpg'}
      commit('GET_APOD',  backup)
      
    })
  },
    
    updateUser({commit}, user){
      return new Promise((resolve, reject) => {
        try{ 
          commit('UPDATE_CURRENTUSER', user)
          resolve(user)
        } catch(e) { reject(e) }
      })
    },
    
  },
  getters: {
    isLoggedIn: state => !!state.currentUser,
    currentUser: state => state.currentUser,
  }
})