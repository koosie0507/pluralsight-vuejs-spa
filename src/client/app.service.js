import axios from 'axios'

axios.defaults.baseURL = '/api'

const appService = {
  getPosts (categoryId) {
    return axios.get(`/posts?category=${categoryId}`)
      .then(res => res.data)
  }
}

export default appService
