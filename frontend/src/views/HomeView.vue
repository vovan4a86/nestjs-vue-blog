<template>
  <div class="home">
    <h1>Nest Blog</h1>
    <p>This blog built with Nest.js, Vue.js and MongoDB</p>
    <div v-if="posts.length === 0">No post found</div>

    <div class="row mx-none">
      <div class="col-md-4" v-for="(post) in posts" :key="post._id">
        <div class="card mb-4 shadow-sm">
          <div class="card-body">
            <h2 class="card-img-top">{{ post.title }}</h2>
            <p class="card-text">{{ post.body }}</p>
              <div class="btn-group mb-2">
                <router-link
                    :to="{name: 'post', params: {id: post._id}}"
                    class="btn btn-sm btn-outline-secondary mx-1"
                >View Post
                </router-link>
                <router-link
                    :to="{name: 'edit', params: {id: post._id}}"
                    class="btn btn-sm btn-outline-secondary mx-1"
                >Edit Post
                </router-link>
                <button
                    @click="deletePost(post._id)"
                    class="btn btn-sm btn-outline-secondary mx-1"
                >Delete Post
                </button>
              </div>
            <div class="card-footer">
              <small class="text-muted">
                Posted on: {{ post.posted_at }}
              </small><br>
              <small class="text-muted">
                by: {{ post.author }}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { server } from '@/utils/helper'
import axios from 'axios'

export default {
  name: 'HomeView',
  data: () => ({
    posts: []
  }),
  created() {
    this.fetchPosts()
  },
  methods: {
    fetchPosts() {
      axios.get(`${server.baseURL}/blog/posts`)
      .then(res => this.posts = res.data)
    },
    deletePost(id) {
      axios.delete(`${server.baseURL}/blog/delete?postId=${id}`)
      .then(res => {
        console.log(res)
        window.location.reload()
      })
    }
  }
}
</script>
<style>
.home {
}
</style>
