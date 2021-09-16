# novu Utils
A repository containing commonly used utilities.

## Installation

```bash
yarn add @teamnovu/utils
```

## List of Utils

### Common
- [useId](./common/useId) is used to generate unique ID's eg. for input fields and their labels.

### Vue.js
- [useDispatchStoreAction](./vue/useDispatchStoreAction) simplifies dispatching a store action, tracking it's state and displaying validation errors. It can be used for simple form submits.
- [Popover](./vue/popover) is a collection of components that imitate [HeadlessUI's popover](https://headlessui.dev/vue/popover) components and are compatible with Vue 2.

## Releasing a new verison

```bash
yarn release
```
