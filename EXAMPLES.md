# Complete Usage Examples

## Basic Setup

### main.ts

```typescript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Notifications from 'devstack-notify'
import App from './App.vue'
import './style.css'

const app = createApp(App)

// Install Pinia first
app.use(createPinia())

// Then install notifications
app.use(Notifications())

app.mount('#app')
```

### App.vue

```vue
<template>
  <div id="app">
    <!-- Your app content -->
    <router-view />
    
    <!-- Notifications component (place once in your app) -->
    <StackNotifications />
  </div>
</template>

<script setup lang="ts">
// No imports needed, component is globally registered
</script>
```

## Usage Examples

### Simple Notifications

```vue
<script setup lang="ts">
import { useToast } from 'devstack-notify'

const toast = useToast()

function onSave() {
  // Simple success
  toast.success({
    title: 'Saved!',
    description: 'Your changes have been saved.'
  })
}

function onDelete() {
  // Simple error
  toast.error({
    title: 'Delete Failed',
    description: 'Could not delete the item.'
  })
}

function onUpdate() {
  // Simple warning
  toast.warning({
    title: 'Outdated Version',
    description: 'A new version is available.'
  })
}

function onInfo() {
  // Simple info
  toast.info({
    title: 'New Feature',
    description: 'Check out our new dashboard!'
  })
}
</script>

<template>
  <div>
    <button @click="onSave">Save</button>
    <button @click="onDelete">Delete</button>
    <button @click="onUpdate">Update</button>
    <button @click="onInfo">Info</button>
  </div>
</template>
```

### Advanced Notifications with Actions

```vue
<script setup lang="ts">
import { defineComponent } from 'vue'
import { useToast } from 'devstack-notify'
import { useRouter } from 'vue-router'

const toast = useToast()
const router = useRouter()

function onUpload() {
  toast.success({
    title: 'File Uploaded',
    description: 'Your document has been uploaded successfully.',
    timeout: 10000,
    actions: [
      {
        label: 'View',
        component: defineComponent({
          template: `
            <button class="px-3 py-1 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md">
              View
            </button>
          `
        }),
        click: () => {
          router.push('/documents')
        }
      },
      {
        label: 'Share',
        component: defineComponent({
          template: `
            <button class="px-3 py-1 text-sm font-medium text-indigo-600 hover:text-indigo-800">
              Share
            </button>
          `
        }),
        click: () => {
          // Open share dialog
          console.log('Share clicked')
        }
      }
    ]
  })
}

function onMessage() {
  toast.info({
    title: 'New Message',
    description: 'You have received a new message from John.',
    icon: 'heroicons:envelope',
    click: (notification) => {
      console.log('Notification clicked:', notification)
      router.push('/messages')
    },
    callback: () => {
      // Track when notification is dismissed
      console.log('Notification dismissed')
    }
  })
}
</script>
```

### Custom Configuration

```vue
<template>
  <StackNotifications 
    class="top-0 bottom-auto"
    :config="notificationConfig"
  />
</template>

<script setup lang="ts">
import type { Config } from 'devstack-notify'

const notificationConfig: Partial<Config> = {
  default: {
    timeout: 4000,
    color: 'indigo',
    icon: 'heroicons:bell',
    closeIcon: 'heroicons:x-mark-20-solid'
  },
  wrapper: 'w-full pointer-events-auto',
  shadow: 'shadow-2xl',
  rounded: 'rounded-xl',
  padding: 'p-6'
}
</script>
```

### TypeScript Usage

```typescript
import { useToast } from 'devstack-notify'
import type { Notification, NotificationColor } from 'devstack-notify'

const toast = useToast()

// Type-safe notification
const notification: Partial<Notification> = {
  title: 'Welcome',
  description: 'Thanks for joining!',
  color: 'green' as NotificationColor,
  timeout: 5000,
  icon: 'heroicons:check-circle'
}

toast.add(notification)

// Helper function with types
function showNotification(
  type: 'success' | 'error' | 'warning' | 'info',
  message: string,
  description?: string
) {
  const config: Partial<Notification> = {
    title: message,
    description,
    timeout: 5000
  }

  switch (type) {
    case 'success':
      toast.success(config)
      break
    case 'error':
      toast.error(config)
      break
    case 'warning':
      toast.warning(config)
      break
    case 'info':
      toast.info(config)
      break
  }
}

// Usage
showNotification('success', 'Operation completed', 'Everything went well')
```

### Programmatic Removal

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'devstack-notify'

const toast = useToast()
const currentNotificationId = ref<string | null>(null)

function showPersistent() {
  const notification = toast.add({
    title: 'Processing...',
    description: 'This will stay until you dismiss it.',
    timeout: 0, // No auto-dismiss
    color: 'blue'
  })
  
  // Store the ID for later removal
  currentNotificationId.value = notification.id
}

function dismissCurrent() {
  if (currentNotificationId.value) {
    toast.remove(currentNotificationId.value)
    currentNotificationId.value = null
  }
}
</script>

<template>
  <div>
    <button @click="showPersistent">Show Persistent</button>
    <button @click="dismissCurrent">Dismiss Current</button>
  </div>
</template>
```

### With Iconify Icons

This package uses `@iconify/vue` for icons. You can use any icon from [Iconify](https://icon-sets.iconify.design/):

```typescript
// Heroicons
toast.success({
  title: 'Success',
  icon: 'heroicons:check-circle'
})

// Material Design Icons
toast.error({
  title: 'Error',
  icon: 'mdi:alert-circle'
})

// Font Awesome
toast.info({
  title: 'Info',
  icon: 'fa6-solid:circle-info'
})

// Lucide
toast.warning({
  title: 'Warning',
  icon: 'lucide:alert-triangle'
})
```

### Dark Mode Support

The notifications automatically support dark mode through Tailwind's dark mode classes:

```vue
<template>
  <!-- Your app with dark mode toggle -->
  <div :class="{ 'dark': isDark }">
    <button @click="isDark = !isDark">Toggle Dark Mode</button>
    
    <!-- Notifications will automatically adapt -->
    <StackNotifications />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isDark = ref(false)
</script>
```

### Composable for Common Notifications

Create a reusable composable for your app:

```typescript
// composables/useAppNotifications.ts
import { useToast } from 'devstack-notify'

export function useAppNotifications() {
  const toast = useToast()

  return {
    // API response handlers
    apiSuccess: (message: string) => {
      toast.success({
        title: message,
        timeout: 3000,
        icon: 'heroicons:check-circle'
      })
    },

    apiError: (error: Error) => {
      toast.error({
        title: 'Request Failed',
        description: error.message,
        timeout: 7000,
        icon: 'heroicons:exclamation-triangle'
      })
    },

    // Form validation
    validationError: (fields: string[]) => {
      toast.warning({
        title: 'Validation Error',
        description: `Please check: ${fields.join(', ')}`,
        timeout: 5000
      })
    },

    // Copy to clipboard
    copied: () => {
      toast.success({
        title: 'Copied!',
        timeout: 2000
      })
    },

    // Network status
    offline: () => {
      toast.error({
        title: 'No Internet Connection',
        description: 'Please check your connection and try again.',
        timeout: 0 // Stay until dismissed
      })
    },

    online: () => {
      toast.success({
        title: 'Back Online',
        timeout: 3000
      })
    }
  }
}
```

Usage:

```vue
<script setup lang="ts">
import { useAppNotifications } from '@/composables/useAppNotifications'

const notifications = useAppNotifications()

async function saveForm() {
  try {
    await api.save()
    notifications.apiSuccess('Form saved successfully')
  } catch (error) {
    notifications.apiError(error as Error)
  }
}
</script>
```

## Common Patterns

### Loading State

```typescript
function handleAsyncOperation() {
  const notification = toast.info({
    title: 'Processing...',
    timeout: 0
  })

  try {
    await someAsyncOperation()
    toast.remove(notification.id)
    toast.success({ title: 'Done!' })
  } catch (error) {
    toast.remove(notification.id)
    toast.error({ title: 'Failed' })
  }
}
```

### Confirmation Feedback

```typescript
function deleteItem() {
  // Show confirmation dialog first
  if (confirm('Are you sure?')) {
    performDelete()
    toast.success({
      title: 'Deleted',
      description: 'Item has been removed'
    })
  }
}
```

### Rate Limiting

```typescript
import { useDebounceFn } from '@vueuse/core'

const showSaveNotification = useDebounceFn(() => {
  toast.success({ title: 'Auto-saved' })
}, 1000)

// Call this on every change
function onFormChange() {
  showSaveNotification()
}
```
