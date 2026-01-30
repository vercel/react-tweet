import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import IndexPage from './pages/index.vue'
import TweetPage from './pages/tweet.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: IndexPage },
    { path: '/tweet/:id', component: TweetPage },
  ],
})


createApp(App).use(router).mount('#root')
