Popover
=================

This collection of components imitates [HeadlessUI's popover](https://headlessui.dev/vue/popover) components and is compatible with Vue 2.

You can find a small, novu specific intro [in our Notion](https://www.notion.so/teamnovu/Accessible-Navigations-HeadlessUI-Vue-2-efd26e37eb2c49448f7a66b90c965889).

## Usage

```vue
<!-- Navigation.vue -->
<template>
  <nav>
    <PopoverGroup as="ul">
      <Popover as="li" class="relative">
        <PopoverButton>Foo</PopoverButton>
        <transition name="fade">
          <PopoverPanel as="ul" class="absolute">
            <li><a href="">Foobee</a></li>
            <li><a href="">Foobla</a></li>
          </PopoverPanel>
        </transition>
      </Popover>
      <li><a href="">Bar</a></li>
      <Popover as="li" class="relative">
        <PopoverButton>Bee</PopoverButton>
        <transition name="fade">
          <PopoverPanel as="ul" class="absolute">
            <li><a href="">Beeboo</a></li>
            <li><a href="">Beeple</a></li>
          </PopoverPanel>
        </transition>
      </Popover>
    </PopoverGroup>
  </nav>
</template>

<script>
import { PopoverGroup, Popover, PopoverButton, PopoverPanel } from '@teamnovu/utils'

export default {
  components: {
    PopoverGroup,
    Popover,
    PopoverButton,
    PopoverPanel,
  },
}
</script>
```
