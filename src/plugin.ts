import type { App } from 'vue'
import { createPinia } from 'pinia'
import Notifications from './components/Notifications.vue'

function DevstackNotify() {
  return (app: App) => {
    app.component('StackNotifications', Notifications)
    app.use(createPinia())
  }
};

export default DevstackNotify
