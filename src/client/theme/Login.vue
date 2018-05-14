<template>
  <div class="content">
    <h2>Login</h2>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Username</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input class="input" type="text" v-model="name"
                   placeholder="Your username">
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Password</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input class="input" type="password" v-model="password"
                   placeholder="Your password">
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <!-- Left empty for spacing -->
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <button v-on:click="login()" class="button is-primary">
              <span class="icon is-small">
                <i class="fas fa-italic" />
              </span>
              <span>Login</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import appService from '../app.service'
export default {
  data () {
    return {
      name: '',
      password: '',
      isAuthenticated: false
    }
  },
  created () {

  },
  methods: {
    login () {
      appService.login({name: this.name, password: this.password})
        .then(data => {
          window.localStorage.setItem('token', data.token)
          window.localStorage.setItem('tokenExpiration', data.expiration)
        })
        .catch(() => window.alert('login failed'))
    }
  }
}
</script>
