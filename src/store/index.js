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
const ROVER_ENDPOINT = 'https://api.nasa.gov/mars-photos/api/v1/rovers'
const KEY ='vJhYsnw8XKcF5hZMSXJMxdUG1T4VwJYy2KVmVeV1'

export default new Vuex.Store({
  state: {
    loading: false,
    currentUser: getFromStorage('user') || undefined,
    apod: [],
    roverData: {
      photos: []
    }
  },
  mutations: {
    LOADING_ON(state){state.loading = true},
    LOADING_OFF(state){state.loading = false},
    UPDATE_CURRENTUSER(state, user) {state.currentUser = user, setInStorage('user', user)},
    GET_APOD(state, apod){state.apod = apod},
    GET_ROVER(state, info){state.roverData = info}
  },
  actions: {
    
    getApod({commit}, date = null){
      let queryDate = date ? date : new Date().toISOString().substr(0, 10)
      commit('LOADING_ON')
      axios.get(`${APOD_ENDPOINT}&date=${queryDate}`)
      .then((response) => {
        commit('GET_APOD', response.data)
        commit('LOADING_OFF')
    })
    .catch(()=>{
      let backup = {url: 'https://apod.nasa.gov/apod/image/2007/NEOWISEBelowBigDipper-7-16-2020-TomMasterson1081.jpg'}
      commit('GET_APOD',  backup)
      commit('LOADING_OFF')
    })
  },
  getRoverData({commit},{sol, rover} ){
    commit('LOADING_ON')
    axios.get(`${ROVER_ENDPOINT}/${rover}/photos?api_key=${KEY}&sol=${sol}&page=1`)
    .then((response)=>{
      commit('LOADING_OFF')
      commit('GET_ROVER', response.data)
    })
  },
  updateUser({commit}, user){
    commit('LOADING_ON')
      return new Promise((resolve, reject) => {
        try{ 
          commit('UPDATE_CURRENTUSER', user)
          commit('LOADING_OFF')
          resolve(user)
         
        } catch(e) { reject(e) }
      })
    },
    
  },
  getters: {
    cameras(state){
      return state.roverData.photos.map((photo)=>{
        return photo.camera.name
      })
    },
    isLoggedIn: state => !!state.currentUser,
    currentUser: state => state.currentUser,
  }
})