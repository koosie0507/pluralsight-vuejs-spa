<template>
  <nav class="nav has-shadow">
    <div class="container tabs">
      <ul>
        <li><router-link to="/category/front-end"><img src="http://bit.ly/vue-img" alt="Vue SPA" /></router-link></li>
        <li><router-link class="navbar-item is-tab" to="/category/front-end">Front-end</router-link></li>
        <li><router-link class="navbar-item is-tab" to="/category/mobile">Mobile</router-link></li>
        <li><router-link class="navbar-item is-tab" to="/login">Login</router-link></li>
      </ul>
    </div>
  </nav>
</template>
