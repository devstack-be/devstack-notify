
# Devstack Notify - Vue 3 & Tailwind CSS
[![NPM](https://flat.badgen.net/npm/v/devstack-notify)](https://www.npmjs.com/package/devstack-notify) [![Vue 3](https://img.shields.io/badge/Vue-3-green)](https://img.shields.io/badge/Vue-3-green)

Headless Vue 3 notification library with Tailwind CSS.

Inspired by [NuxtUI Notifications](https://ui.nuxt.com/)
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

You can then register `Notifications` as a Vue plugin:

```js
import { createApp } from 'vue'
import Notifications from 'devstack-notify'
import App from './App.vue'

createApp(App)
  .use(Notifications)
  .mount('#app')
```

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