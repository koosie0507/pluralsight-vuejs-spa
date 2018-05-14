import axios from 'axios'

axios.defaults.baseURL = '/api'

const appService = {
  getPosts (categoryId) {
    return axios.get(`/posts?category=${categoryId}`)
      .then(res => res.data)
  },
  login (credentials) {
    return new Promise((resolve, reject) => {
      axios.post('/auth/login', credentials)
        .then(response => {
          resolve(response.data)
        })
        .catch(response => {
          reject(response.status)
        })
    })
  }
}

export default appService
