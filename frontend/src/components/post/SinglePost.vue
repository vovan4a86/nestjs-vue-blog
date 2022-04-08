<template>
  <div class="text-center">
    <div class="col-sm-10 mx-auto">
      <h4 class="mt-3">
        <small><button class="btn btn-success" @click="navigate">View All Posts</button></small>
      </h4>
      <hr>
      <h2>{{ post.title }}</h2>
      <h5><span class="glyphicon glyphicon-time"></span>
        Post by {{ post.author }}, {{ post.posted_at }}
      </h5>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { server } from '@/utils/helper'

export default {
  name: "SinglePost",
  data: () => ({
    id: 0,
    post: {}
  }),
  created() {
    this.id = this.$route.params.id
    this.getPost()
  },
  methods: {
    getPost() {
      axios.get(`${server.baseURL}/blog/post/${this.id}`)
      .then(res => this.post = res.data)
    },
    navigate() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
