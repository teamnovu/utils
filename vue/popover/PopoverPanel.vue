<template>
  <Component
    :is="tag"
    v-bind="props"
    @keydown.tab="onTab($event)"
    @keydown.tab.shift="onShiftTab($event)"
  >
    <slot />
  </Component>
</template>

<script>
// Credit: https://stackoverflow.com/a/30753870
const FOCUSABLE_SELECTOR = [
  '[contentEditable=true]',
  '[tabindex]',
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'iframe',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
]
  .map((selector) => `${selector}:not([tabindex='-1'])`)
  .join(',')

export default {
  inject: ['popover'],

  props: {
    tag: {
      type: String,
      default: 'div',
    },
  },

  computed: {
    props() {
      return {
        id: this.popover.panelId,
      }
    },
  },

  created() {
    if (!this.popover) {
      throw new Error('PopoverButton must be a descendant of a Popover')
    }

    this.popover.registerPanel(this)
  },

  beforeDestroy() {
    this.popover.unregisterPanel()
  },

  methods: {
    onTab(event) {
      if (!this.$el.contains(document.activeElement)) {
        return null
      }

      const elements = this.getFocusableElements()
      const activeElementIndex = elements.indexOf(document.activeElement)

      if (
        activeElementIndex === elements.length - 1 &&
        this.popover.hasButton
      ) {
        event.preventDefault()

        this.popover.focusButton()
      }
    },

    onShiftTab(event) {
      if (!this.$el.contains(document.activeElement)) {
        return null
      }

      const elements = this.getFocusableElements()
      const activeElementIndex = elements.indexOf(document.activeElement)

      if (activeElementIndex === 0 && this.popover.hasButton) {
        event.preventDefault()

        this.popover.focusButton()
      }
    },

    getFocusableElements() {
      return Array.from(this.$el.querySelectorAll(FOCUSABLE_SELECTOR))
    },
  },
}
</script>
