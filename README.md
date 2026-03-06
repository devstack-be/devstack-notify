
# Devstack Notify - Vue 3 & Tailwind CSS
[![NPM](https://flat.badgen.net/npm/v/devstack-notify)](https://www.npmjs.com/package/devstack-notify) [![Vue 3](https://img.shields.io/badge/Vue-3-green)](https://img.shields.io/badge/Vue-3-green)

Headless Vue 3 notification library with Tailwind CSS.

Inspired by [NuxtUI Notifications](https://ui.nuxt.com/)
![Screenshot of a notification (1)](https://github.com/devstack-be/devstack-notify/blob/main/playground/public/teasing_1.png)
![Screenshot of a notification (2)](https://github.com/devstack-be/devstack-notify/blob/main/playground/public/teasing_2.png)
![Screenshot of a notification (3)](https://github.com/devstack-be/devstack-notify/blob/main/playground/public/teasing_3.png)

## 🌟 Features

- Vue 3 composition API support
- Fully written in Typescript
- Light and beautiful
- Easy to install and personnalisable
- Timeout, callback, actions

## 🤖 Demo

[Live Preview - coming soon]()

## ⚡️ Installation

```bash
yarn add devstack-notify
```

or

```bash
npm i devstack-notify
```

### With Pinia (Recommended)

This package uses Pinia for state management. You need to install Pinia in your project first:

```bash
yarn add pinia
```

Then register both Pinia and Notifications:

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Notifications from 'devstack-notify'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(Notifications())

app.mount('#app')
```

### Without Pinia (Auto-install)

If you don't want to manage Pinia yourself, you can let the plugin create an instance:

```js
import { createApp } from 'vue'
import Notifications from 'devstack-notify'
import App from './App.vue'

createApp(App)
  .use(Notifications({ createPiniaInstance: true }))
  .mount('#app')
```

### Tailwind CSS 4 Configuration

⚠️ **Important**: Add this line to your main CSS file:

```css
/* src/app.css or src/index.css */
@import "tailwindcss";

@source "../../node_modules/devstack-notify";
```

See [TAILWIND.md](./TAILWIND.md) for more details.

## 🍞 How to use

Add the "StackNotifications" components to your main layout or in `App.vue`:

```vue
<StackNotifications />
```

Then, trigger notifications from your `.vue` files:

###### Composition API

```javascript
import { useToast } from "devstack-notify"

toast.add({
   title: 'No type specified', 
   description: 'Small description' 
})
toast.success({
   title: 'Success', 
   description: 'Small description' 
})
toast.error({
   title: 'Error', 
   description: 'Small description' 
})
toast.warning({
   title: 'Warning', 
   description: 'Small description' 
})
toast.info({
   title: 'Info', 
   description: 'Small description' 
})
```

## TypeScript Support

All types are exported from the package:

```typescript
import type { 
  Notification, 
  NotificationAction, 
  NotificationColor,
  Config 
} from 'devstack-notify'

// Use types in your code
const notification: Partial<Notification> = {
  title: 'Hello',
  color: 'blue',
  timeout: 3000
}

toast.add(notification)
```

## 📚 Documentation

- **[Complete Examples](./EXAMPLES.md)** - Detailed usage examples and patterns
- **[Best Practices](./BEST-PRACTICES.md)** - Recommended patterns and guidelines  
- **[Tailwind Configuration](./TAILWIND.md)** - Required Tailwind CSS setup
- **[Migration Guide](./MIGRATION.md)** - Upgrading from previous versions
- **[Changelog](./CHANGELOG.md)** - Version history and changes

## Props

* To do

## To do

* Complete documentation
* Tests

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## License

MIT
