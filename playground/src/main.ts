import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import TailStack from '../..'
import App from './App.vue'

const routes = [
  { path: '/', component: () => import('./pages/home.vue') },
  { path: '/test', component: () => import('./pages/test.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
createApp(App)
  .use(router)
  .use(createPinia())
  .use(TailStack())
  .mount('#app')
