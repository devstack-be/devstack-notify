import type { Notification } from '../types'
import { useNotificationsStore } from '@/composables/notificationsStore'

export function useToast() {
  const notificationsStore = useNotificationsStore()

  function add(notification: Partial<Notification>) {
    notificationsStore.addNotification(notification)
  }

  function success(notification: Partial<Notification>) {
    notificationsStore.addNotification({ ...notification, color: 'green', icon: 'heroicons:check-circle' })
  }

  function error(notification: Partial<Notification>) {
    notificationsStore.addNotification({ ...notification, color: 'red', icon: 'heroicons:exclamation-triangle' })
  }

  function warning(notification: Partial<Notification>) {
    notificationsStore.addNotification({ ...notification, color: 'yellow', icon: 'heroicons:exclamation-circle' })
  }

  function info(notification: Partial<Notification>) {
    notificationsStore.addNotification({ ...notification, color: 'blue', icon: 'heroicons:information-circle' })
  }

  function remove(id: string) {
    notificationsStore.removeNotification(id)
  }

  return {
    add,
    success,
    error,
    warning,
    info,
    remove,
  }
}
