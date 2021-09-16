<template>
  <Component
    :is="tag"
    v-bind="props"
    @click="onToggle($event)"
    @keydown.space="onToggle($event)"
    @keydown.enter="onToggle($event)"
  >
    <slot />
  </Component>
</template>

<script>
export default {
  inject: ['popover'],

  props: {
    tag: {
      type: String,
      default: 'button',
    },
  },

  computed: {
    props() {
      return {
        id: this.popover.buttonId,
        type: 'button',
        'aria-expanded': this.popover.isOpen ? true : undefined,
        'aria-controls': this.popover.panelId || undefined,
      }
    },
  },

  created() {
    if (!this.popover) {
      throw new Error('PopoverButton must be a descendant of a Popover')
    }

    this.popover.registerButton(this)
  },

  beforeDestroy() {
    this.popover.unregisterButton()
  },

  methods: {
    focus() {
      this.$el.focus()
    },

    onToggle(event) {
      event.preventDefault()
      event.stopPropagation()

      this.popover.toggle()
    },
  },
}
</script>
