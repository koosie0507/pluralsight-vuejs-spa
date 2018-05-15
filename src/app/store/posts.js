import appService from '../xhr/service'

const defaultState = {
  posts: [],
  category: ''
}
const inBrowser = typeof window !== 'undefined'
const hasInitialState = inBrowser && typeof window.__INITIAL_STATE__ !== 'undefined'

const state = hasInitialState ? window.__INITIAL_STATE__.postsModule : defaultState

const getters = {
  posts: state => state.posts
}

const actions = {
  fetchPostsInCategory (context, category) {
    return appService.getPosts(category)
      .then(data => context.commit('updatePosts', {category, posts: data}))
  }
}

const mutations = {
  updatePosts (state, data) {
    state.category = data.category
    state.posts = data.posts
  }
}

export default {namespaced: true, state, getters, actions, mutations}
