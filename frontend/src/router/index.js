import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreatePost from "@/components/post/CreatePost";
import EditPost from "@/components/post/EditPost";
import SinglePost from "@/components/post/SinglePost";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/create',
    name: 'create',
    component: CreatePost
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: EditPost
  },
  {
    path: '/post/:id',
    name: 'post',
    component: SinglePost
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
