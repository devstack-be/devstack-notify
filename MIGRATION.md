# Migration Guide

## From v0.0.5 to v0.1.0

### Breaking Changes

#### 1. Pinia Installation

**Before:**
```js
import Notifications from 'devstack-notify'
app.use(Notifications)
```

**After (Recommended):**
```js
import { createPinia } from 'pinia'
import Notifications from 'devstack-notify'

app.use(createPinia())
app.use(Notifications())
```

**Or (Auto-install Pinia):**
```js
import Notifications from 'devstack-notify'
app.use(Notifications({ createPiniaInstance: true }))
```

**Reason:** The plugin no longer automatically creates a Pinia instance to avoid conflicts with existing Pinia installations.

#### 2. TypeScript Types

**New:** All types are now properly exported. You can import them:

```typescript
import type { 
  Notification, 
  NotificationAction, 
  NotificationColor,
  Config 
} from 'devstack-notify'
```

#### 3. Function Types

The `Function` type has been replaced with more specific types for better type safety:

- `NotificationAction.click`: `Function` → `() => void`
- `Notification.click`: `Function` → `(notification: Notification) => void`
- `Notification.callback`: `Function` → `() => void`

If you were using these properties with parameters, you may need to adjust your code.

### New Features

#### Better ID Generation

Notification IDs now use `crypto.randomUUID()` for better uniqueness, with a fallback for older browsers.

#### Improved Accessibility

- Added `aria-live="polite"` to the notifications container
- Added `aria-label` to the notifications region
- Dynamic `aria-label` for close buttons based on notification title

#### SSR Support

The component now properly handles Server-Side Rendering by waiting for the component to mount before using Teleport.

#### Tailwind Configuration Documentation

A new [TAILWIND.md](./TAILWIND.md) file documents the required Tailwind CSS 4 configuration using the `@source` directive in your main CSS file.

### Non-Breaking Improvements

- Fixed import aliases (`@/` → relative imports) for better compatibility
- Added proper cleanup for `watchEffect` to prevent memory leaks
- Better TypeScript support throughout the codebase
- Added safelist comments in source code for easier Tailwind configuration

### Recommendations

1. **Update your Tailwind config** following [TAILWIND.md](./TAILWIND.md)
2. **Manage Pinia yourself** instead of relying on auto-install
3. **Use TypeScript types** for better DX and type safety
4. Update to the latest version:
   ```bash
   npm update devstack-notify
   # or
   yarn upgrade devstack-notify
   ```
