import type { App } from 'vue'
import Notifications from './components/Notifications.vue'

interface PluginOptions {
  /**
   * Auto-install Pinia if not already installed
   * @default false
   */
  createPiniaInstance?: boolean
}

function DevstackNotify(options: PluginOptions = {}) {
  return (app: App) => {
    app.component('StackNotifications', Notifications)
    
    // Only create Pinia instance if explicitly requested and not already installed
    if (options.createPiniaInstance) {
      const { createPinia } = require('pinia')
      app.use(createPinia())
    }
  }
}

export default DevstackNotify
