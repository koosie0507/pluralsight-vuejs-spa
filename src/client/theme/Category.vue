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
import appService from '../app.service'
import Post from './Post.vue'

export default {
  components: {
    'app-post': Post
  },
  data () {
    return {
      id: this.$route.params.id,
      posts: []
    }
  },
  methods: {
    loadPosts () {
      appService.getPosts(this.id).then(data => {
        this.posts = data
      })
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
