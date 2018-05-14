<template>
  <div class="content">
    <div v-if="isAuthenticated">
      <h2>Hello authenticated user</h2>
      <p>E-mail: {{profile.email}}</p>
      <button v-on:click="logout()" class="button is-primary">
        Logout
      </button>
    </div>
    <div v-else>
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
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  data () {
    return {
      name: '',
      password: '',
      // isAuthenticated: false,
      profile: {}
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    ...mapActions({
      logout: 'logout'
    }),
    login () {
      this.$store.dispatch('login', {name: this.name, password: this.password})
        .then(() => {
          this.name = ''
          this.password = ''
        })
    }
  }
}
</script>
