import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from './pages/index.vue'
import TweetPage from './pages/tweet.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: IndexPage },
    { path: '/tweet/:id', component: TweetPage },
  ],
})
