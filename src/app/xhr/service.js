import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/api'
axios.interceptors.request.use(function (config) {
  if (typeof window === 'undefined') {
    return config
  }

  const token = window.localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const appService = {
  client: axios,
  getPosts (categoryId) {
    return axios.get(`/posts?category=${categoryId}`)
      .then(res => res.data)
  },
  getProfile () {
    return new Promise((resolve, reject) => {
      axios.get('/users/profile')
        .then(response => {
          resolve(response.data)
        })
    })
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
