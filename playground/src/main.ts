import './assets/base.css'

import { createApp } from 'vue'
import TailStack from '../..'
import App from './App.vue'

createApp(App).use(TailStack, { timeout: 10000 }).mount('#app')
