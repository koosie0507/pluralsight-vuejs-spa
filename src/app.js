import Vue from 'vue'

const app = new Vue({
  data: {
    hello: 'amazingly. now we HMR with vue'
  },
  template: '<div id="app">{{hello}}</div>'
})

export {app}
