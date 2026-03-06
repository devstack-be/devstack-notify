import type { App } from 'vue'
import Notifications from './components/Notifications.vue'

function DevstackNotify() {
  return (app: App) => {
    app.component('StackNotifications', Notifications)
  }
}

export default DevstackNotify
