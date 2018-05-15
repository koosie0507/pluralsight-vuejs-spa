<template>
  <div class="columns">
    <div class="column is-one-third" v-for="(post) in posts" v-bind:key="post._id">
      <app-post :link="post.link">
        <h3 slot="title">{{ post.title }}</h3>
        <span slot="content">{{ post.content }}</span>
      </app-post>
    </div>
  </div>
</template>
<script>
import Post from './Post.vue'
import { mapGetters } from 'vuex'

function fetchInitialData(store, route) {
  return store.dispatch('postsModule/fetchPostsInCategory', route.params.id)
}

export default {
  asyncData (store, route) {
    return fetchInitialData(store, route)
  },
  components: {
    'app-post': Post
  },
  computed: {
    ...mapGetters('postsModule', ['posts'])
  },
  methods: {
    loadPosts () {
      fetchInitialData(this.$store, this.$route)
    }
  },
  watch: {
    '$route' (to, from) {
      this.id = to.params.id
      this.loadPosts()
    }
  },
  created () {
    this.loadPosts()
  }
}
</script>
