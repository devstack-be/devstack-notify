import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Config, Notification } from '../types'
import defaultConfig from '@/notification'

export const useNotificationsStore = defineStore('notificationsStore', () => {
  const notifications = ref<Notification[]>([])
  const config = ref<Config>(defaultConfig)
  const mergeConfig = (configToMerge: Partial<Config>) => {
    const mergeObjects = (target: any, source: any) => {
      for (const key in source) {
        if (source[key] instanceof Object && key in target)
          Object.assign(source[key], mergeObjects(target[key], source[key]))
      }
      return { ...target, ...source }
    }

    config.value = mergeObjects(config.value, configToMerge)
  }
  const addNotification = (notification: Partial<Notification>) => {
    const body = {
      id: Math.floor(Math.random() * 100) + new Date().getTime().toString(),
      ...notification,
    }
    const index = notifications.value.findIndex((n: Notification) => n.id === body.id)
    if (index === -1)
      notifications.value.push(body as Notification)

    return body
  }
  const removeNotification = (id: string) => {
    const index = notifications.value.findIndex((n: Notification) => n.id === id)
    if (index !== -1)
      notifications.value.splice(index, 1)
    // notifications.value = notifications.value.filter((n: Notification) => n.id !== id)
  }
  return {
    config,
    mergeConfig,
    notifications,
    addNotification,
    removeNotification,
  }
})
