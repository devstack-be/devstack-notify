# Best Practices & Recommendations

## 🎯 Installation & Setup

### 1. Install Pinia in Your App

✅ **DO:**
```js
import { createPinia } from 'pinia'
import Notifications from 'devstack-notify'

const app = createApp(App)
app.use(createPinia())
app.use(Notifications())
```

**Why:** `pinia` is a peer dependency — the host app must provide a single shared instance. Without `app.use(createPinia())`, the store will throw `getActivePinia() was called but there was no active Pinia`.

### 2. Configure Tailwind CSS 4

✅ **DO:**
Add the package source in your main CSS file:
```css
@import "tailwindcss";

@source "../../node_modules/devstack-notify";
```

❌ **DON'T:**
Forget this step. Your notification styles won't work in production.

## 📱 Usage Patterns

### 3. Use TypeScript for Better DX

✅ **DO:**
```typescript
import { useToast } from 'devstack-notify'
import type { Notification } from 'devstack-notify'

const toast = useToast()

const notification: Partial<Notification> = {
  title: 'Success!',
  description: 'Operation completed',
  color: 'green',
  timeout: 3000
}

toast.add(notification)
```

### 4. Provide Meaningful Titles

✅ **DO:**
```js
toast.error({
  title: 'Failed to save document',
  description: 'Please check your internet connection and try again.'
})
```

❌ **DON'T:**
```js
toast.error({
  title: 'Error',
  description: 'Something went wrong'
})
```

### 5. Set Appropriate Timeouts

✅ **DO:**
```js
// Short messages: 3-5 seconds
toast.info({ title: 'Copied!', timeout: 3000 })

// Important errors: 7-10 seconds
toast.error({ 
  title: 'Payment Failed',
  description: 'Your card was declined. Please try another payment method.',
  timeout: 8000 
})

// Critical messages: no timeout
toast.error({ 
  title: 'Connection Lost',
  description: 'Attempting to reconnect...',
  timeout: 0 
})
```

### 6. Use Actions Effectively

✅ **DO:**
```js
import { defineComponent } from 'vue'

toast.add({
  title: 'File uploaded',
  description: 'Your document has been saved.',
  actions: [{
    label: 'View',
    component: defineComponent({
      template: '<button class="btn btn-sm">View</button>'
    }),
    click: () => router.push('/documents')
  }]
})
```

### 7. Handle Callbacks for Analytics

✅ **DO:**
```js
toast.success({
  title: 'Welcome!',
  description: 'Your account has been created.',
  callback: () => {
    // Track in analytics
    analytics.track('notification_dismissed', { type: 'welcome' })
  }
})
```

## 🎨 Styling & Customization

### 8. Customize Configuration

```vue
<template>
  <StackNotifications 
    :config="{
      default: {
        timeout: 4000,
        color: 'indigo'
      },
      wrapper: 'w-full pointer-events-auto',
      shadow: 'shadow-xl'
    }" 
  />
</template>
```

### 9. Position Notifications

```vue
<!-- Bottom right (default) -->
<StackNotifications />

<!-- Top right -->
<StackNotifications class="top-0 bottom-auto" />

<!-- Bottom left -->
<StackNotifications class="start-0 end-auto" />

<!-- Top left -->
<StackNotifications class="top-0 start-0 bottom-auto end-auto" />

<!-- Bottom center -->
<StackNotifications class="end-1/2 translate-x-1/2" />
```

## 🔧 Performance

### 10. Limit Notification Count

Consider implementing a maximum notification limit:

```typescript
import { useNotificationsStore } from 'devstack-notify/composables/notificationsStore'

const MAX_NOTIFICATIONS = 5

const store = useNotificationsStore()

// Before adding
if (store.notifications.length >= MAX_NOTIFICATIONS) {
  // Remove oldest
  const oldest = store.notifications[0]
  toast.remove(oldest.id)
}

toast.add({ title: 'New notification' })
```

### 11. Debounce Rapid Notifications

```typescript
import { useDebounceFn } from '@vueuse/core'

const showNotification = useDebounceFn((message: string) => {
  toast.info({ title: message })
}, 1000)
```

## ♿ Accessibility

### 12. Keep Messages Clear and Concise

✅ **DO:**
- Use clear, action-oriented language
- Provide specific error messages
- Include recovery actions when possible

❌ **DON'T:**
- Use technical jargon
- Display stack traces to users
- Create notifications without actionable information

### 13. Test with Screen Readers

The notifications use `aria-live="polite"` which announces new notifications to screen readers without interrupting the user. Test with:
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (Mac/iOS)
- TalkBack (Android)

## 🚀 Production Checklist

Before deploying:

- [ ] Tailwind CSS 4 `@source` directive added
- [ ] Pinia properly installed
- [ ] Notification timeouts tested
- [ ] Error messages are user-friendly
- [ ] Colors work in both light and dark mode
- [ ] Tested on mobile devices
- [ ] Screen reader compatibility verified
- [ ] No console errors in production build
