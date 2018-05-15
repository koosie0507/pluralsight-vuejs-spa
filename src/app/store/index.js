import Vue from 'vue'
import Vuex from 'vuex'
import appService from '../xhr/service'
import postsModule from './posts'

Vue.use(Vuex)
const state = {
  isAuthenticated: false,
  profile: {}
}

const store = new Vuex.Store({
  modules: {
    postsModule
  },
  state,
  getters: {
    isAuthenticated: state => {
      return state.isAuthenticated
    },
    profile: state => {
      return state.profile
    }
  },
  actions: {
    logout (context) {
      context.commit('logout')
    },
    login (context, credentials) {
      return new Promise((resolve) => {
        appService.login(credentials)
          .then(data => {
            context.commit('login', data)
            resolve()
          })
      })
    }
  },
  mutations: {
    logout (state) {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('token', null)
        window.localStorage.setItem('tokenExpiration', null)
      }
      state.isAuthenticated = false
      state.profile = {}
    },
    login (state, data) {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('token', data.token)
        window.localStorage.setItem('tokenExpiration', data.expiration)
      }
      state.isAuthenticated = true
      state.profile = {
        name: data.name,
        email: data.email,
        role: data.role,
        sandwich: data.sandwich
      }
    }
  }
})

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    let expiration = window.localStorage.getItem('tokenExpiration')
    let unixTimestamp = new Date().getTime() / 1000
    if (expiration !== null && parseInt(expiration) - unixTimestamp > 0) {
      store.state.isAuthenticated = true
    }
  })
}

export default store
