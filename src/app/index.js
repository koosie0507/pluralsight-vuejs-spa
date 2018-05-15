import Vue from 'vue'
import store from './store'
import AppLayout from './theme/Layout.vue'
import router from './router'

const app = new Vue({
  router,
  ...AppLayout,
  store
})

export {app, router, store}
