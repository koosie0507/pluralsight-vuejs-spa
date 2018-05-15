import 'es6-promise/auto'
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../../../src/app/store'
import Category from '../../../src/app/theme/Category.vue'
import MockAdapter from 'axios-mock-adapter'
import appService from '../../../src/app/xhr/service'

let mock

describe('Category.vue', () => {
  beforeEach(() => {
    mock = new MockAdapter(appService.client)
  })

  it('should load front-end links', done => {
    Vue.use(VueRouter)

    const router = new VueRouter({
      routes: [
        { path: '/', component: Category }
      ]
    })
    mock.onGet('http://localhost:3000/api/posts?category=undefined').reply(200, [])
    const vm = new Vue({
      el: document.createElement('div'),
      router,
      store,
      render: h => h('router-view')
    })
    store.watch((state) => {
      return state.postsModule.posts
    }, function () {
      console.log(expect(vm.$el.querySelectorAll('.column')))
      done()
    })
  })
})
