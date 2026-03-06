# CHANGELOG

All notable changes to this project will be documented in this file.

## [0.1.1] - 2026-03-06

### 🔴 Breaking Changes

- **Peer Dependencies**: `vue`, `pinia` and `@vueuse/core` are now `peerDependencies` instead of `dependencies`. The host app must provide these packages. This fixes the `getActivePinia() was called but there was no active Pinia` error caused by duplicate instances.
- **Plugin Options removed**: `DevstackNotify()` no longer accepts options. The `createPiniaInstance` option has been removed. See [MIGRATION.md](./MIGRATION.md) for the upgrade path.

## [0.1.0] - 2026-03-06

### 🔴 Breaking Changes

- **Pinia Installation**: The plugin no longer automatically creates a Pinia instance. Users must now install and configure Pinia themselves. See [MIGRATION.md](./MIGRATION.md) for details.
- **Function Types**: Replaced generic `Function` types with specific typed functions:
  - `NotificationAction.click`: `Function` → `() => void`
  - `Notification.click`: `Function` → `(notification: Notification) => void`
  - `Notification.callback`: `Function` → `() => void`

### ✨ New Features

- **TypeScript Types Export**: All TypeScript types are now properly exported and can be imported from the package
- **Better ID Generation**: Notification IDs now use `crypto.randomUUID()` for better uniqueness (with fallback for older browsers)
- **SSR Support**: Added proper Server-Side Rendering support with conditional Teleport
- **Improved Accessibility**:
  - Added `aria-live="polite"` to notifications container
  - Added `aria-label` to notifications region
  - Dynamic `aria-label` for close buttons based on notification title
- **Documentation**: Added comprehensive documentation files:
  - [TAILWIND.md](./TAILWIND.md) - Tailwind CSS configuration guide
  - [MIGRATION.md](./MIGRATION.md) - Migration guide from v0.0.5
  - [BEST-PRACTICES.md](./BEST-PRACTICES.md) - Best practices and recommendations

### 🐛 Bug Fixes

- **Import Aliases**: Replaced `@/` aliases with relative imports for better package compatibility
- **Memory Leaks**: Fixed potential memory leak by properly cleaning up `watchEffect` in Notification component
- **TypeScript Errors**: Fixed implicit `any` types in component setup functions

### 🎨 Improvements

- **Tailwind Safelist**: Added comments in source code to document required Tailwind safelist classes
- **Code Quality**: Improved TypeScript types throughout the codebase
- **ID Collision Prevention**: Significantly reduced risk of notification ID collisions

### 📚 Documentation

- Updated README with better installation instructions
- Added TypeScript usage examples
- Created comprehensive best practices guide
- Added Tailwind CSS configuration requirements

### ⚠️ Important Notes

- **Tailwind CSS 4**: Users must add `@source "../../node_modules/devstack-notify"` in their main CSS file. See [TAILWIND.md](./TAILWIND.md)
- **Pinia**: Users must explicitly install Pinia as a peer dependency

## [0.0.5] - 2024-03-06

### Initial Release

- Initial library release
- Basic notification system
- Vue 3 Composition API support
- Tailwind CSS styling
- Basic TypeScript support