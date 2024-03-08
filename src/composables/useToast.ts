import type { Notification } from '@/types/notification'
import { useSharedStateNotifications } from '@/composables/useSharedStateNotifications'

export function useToast() {
  const {
    sharedStateNotifications: { addNotification, removeNotification },
  } = useSharedStateNotifications()

  function add(notification: Partial<Notification>) {
    addNotification(notification)
  }

  function success(notification: Partial<Notification>) {
    addNotification({ ...notification, color: 'green', icon: 'heroicons:check-circle' })
  }

  function error(notification: Partial<Notification>) {
    addNotification({ ...notification, color: 'red', icon: 'heroicons:exclamation-triangle' })
  }

  function warning(notification: Partial<Notification>) {
    addNotification({ ...notification, color: 'yellow', icon: 'heroicons:exclamation-circle' })
  }

  function info(notification: Partial<Notification>) {
    addNotification({ ...notification, color: 'blue', icon: 'heroicons:information-circle' })
  }

  function remove(id: string) {
    removeNotification(id)
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
