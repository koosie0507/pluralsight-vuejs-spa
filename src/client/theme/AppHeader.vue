<template>
  <nav class="nav has-shadow">
    <div class="container tabs">
      <ul>
        <li><router-link to="/category/front-end"><img src="http://bit.ly/vue-img" alt="Vue SPA" /></router-link></li>
        <li><router-link class="navbar-item is-tab" :to="{ name: 'category', params: { 'id': 'front-end' } }">Front-end</router-link></li>
        <li><router-link class="navbar-item is-tab" :to="{ name: 'category', params: { 'id': 'mobile' } }">Mobile</router-link></li>
        <li>
          <router-link class="navbar-item is-tab" to="/login">
            <span v-if="isAuthenticated">Logout</span><span v-else>Login</span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters(['isAuthenticated'])
    }
  }
</script>
