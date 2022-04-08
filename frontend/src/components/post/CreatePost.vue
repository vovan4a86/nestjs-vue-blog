<template>
  <div>
    <div class="form-wrapper mx-auto col-11 col-md-6">
      <h2>Create Post</h2>
      <form id="create-post-form" @submit.prevent="submitPost">
        <div class="form-group col-md-12">
          <label for="title">Title</label>
          <input type="text" id="title" v-model="title" name="title" class="form-control" placeholder="Enter title">
        </div>
        <div class="form-group col-md-12">
          <label for="description">Description</label>
          <input type="text" id="description" v-model="description" name="description" class="form-control" placeholder="Enter description">
        </div>
        <div class="form-group col-md-12">
          <label for="body">Content text</label>
          <textarea id="body" v-model="body" name="body" class="form-control" placeholder="Write text"></textarea>
        </div>
        <div class="form-group col-md-12">
          <label for="author">Author</label>
          <input type="text" id="author" v-model="author" name="author" class="form-control" placeholder="Enter author name">
        </div>
        <button class="btn btn-success mt-3" type="submit">Create Post</button>
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
    title: '',
    description: '',
    body: '',
    author: ''
  }),
  methods: {
    submitPost() {
      const newPost = {
        title: this.title,
        description: this.description,
        body: this.body,
        author: this.author,
        posted_at: new Date().toLocaleDateString()
      }
      this.__submitToServer(newPost)
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/blog/post`, data)
        .then(res => {
          if (res.status == 200) {
            this.$router.push('/')
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
