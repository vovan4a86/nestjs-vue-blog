<template>
  <div>
    <h4>
      <small>
        <button class="btn btn-success" @click="navigate()">View All Posts</button>
      </small>
    </h4>
    <div class="form-wrapper mx-auto col-md-6">
      <h2>Create Post</h2>
      <form id="create-post-form" @submit.prevent="editPost">
        <div class="form-group col-md-12">
          <label for="title">Title</label>
          <input type="text" id="title" v-model="post.title" name="title" class="form-control" placeholder="Enter title">
        </div>
        <div class="form-group col-md-12">
          <label for="description">Description</label>
          <input type="text" id="description" v-model="post.description" name="description" class="form-control" placeholder="Enter description">
        </div>
        <div class="form-group col-md-12">
          <label for="body">Content text</label>
          <textarea id="body" v-model="post.body" name="body" class="form-control" placeholder="Write text"></textarea>
        </div>
        <div class="form-group col-md-12">
          <label for="author">Author</label>
          <input type="text" id="author" v-model="post.author" name="author" class="form-control" placeholder="Enter author name">
        </div>
        <button class="btn btn-success mt-3" type="submit">Edit Post</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "@/utils/helper"

export default {
  name: "CreatePost",
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
    editPost() {
      const editedPost = {
        title: this.post.title,
        description: this.post.description,
        body: this.post.body,
        author: this.post.author,
        posted_at: this.post.posted_at
      }
      this.__submitToServer(editedPost)
    },
    __submitToServer(data) {
      axios.put(`${server.baseURL}/blog/edit?postId=${this.id}`, data)
        .then(res => {
          if (res.status == 200) {
            this.$router.push('/')
          }
        })
    },
    navigate() {
      this.$router.go(-1)
    },
  }
}
</script>

<style scoped>

</style>
