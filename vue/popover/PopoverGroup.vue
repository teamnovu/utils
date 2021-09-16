<template>
  <Component :is="tag">
    <slot />
  </Component>
</template>

<script>
import { reactive } from '@vue/reactivity'

export default {
  provide() {
    return {
      popoverGroup: reactive({
        closeOthers: this.closeOthers,

        registerPopover: this.registerPopover,
        unregisterPopover: this.unregisterPopover,
      }),
    }
  },

  props: {
    tag: {
      type: String,
      default: 'div',
    },
  },

  data() {
    return {
      popovers: [],
    }
  },

  methods: {
    closeOthers(panel) {
      this.popovers.forEach((popover) => {
        if (popover.id !== panel.id) {
          popover.close()
        }
      })
    },

    registerPopover(component) {
      this.popovers.push(component)
    },

    unregisterPopover(component) {
      this.popovers.splice(
        this.popovers.findIndex((popover) => popover.id === component.id),
        1
      )
    },
  },
}
</script>
