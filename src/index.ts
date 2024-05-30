import plugin from './plugin'

export { useToast } from './composables/useToast'
export { default as Notification } from './components/Notification.vue'
export { default as Notifications } from './components/Notifications.vue'
// I want to export the types located in src/types.ts
// export * from './types'

export default plugin
