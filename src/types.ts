import type { Component } from 'vue'

export interface NotificationAction {
  label: string
  click?: Function
  component: Component
}

export type NotificationColor =
  | 'blue'
  | 'red'
  | 'yellow'
  | 'indigo'
  | 'green'

export interface Notification {
  id: string
  title: string
  description?: string
  icon?: string
  timeout: number
  actions?: NotificationAction[]
  click?: Function
  callback?: Function
  color?: NotificationColor
}

interface ConfigTransition {
  enterActiveClass: string
  enterFromClass: string
  enterToClass: string
  leaveActiveClass: string
  leaveFromClass: string
  leaveToClass: string
}

/* interface ConfigCloseButton {
  icon: string
  color: 'gray'
  variant: 'link'
  padded: boolean
}

interface ConfigActionButton {
  size: 'xs'
  color: 'white'
} */

interface ConfigDefault {
  color: string
  icon: string | null
  timeout: number
  closeIcon: string
}

export interface Config {
  wrapper: string
  container: string
  inner: string
  title: string
  description: string
  actions: string
  background: string
  rounded: string
  padding: string
  gap: string
  ring: string
  shadow: string
  icon: string
  progress: string
  transition: ConfigTransition
  default: ConfigDefault
}
