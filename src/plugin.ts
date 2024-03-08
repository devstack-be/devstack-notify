import type { App } from 'vue'
import Notifications from './components/Notifications.vue'

function install(app: App) {
  app.component('StackNotifications', Notifications)
}

const plugin = {
  install,
}

export default plugin
