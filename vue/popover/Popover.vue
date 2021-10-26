<template>
  <Component
    :is="tag"
    v-bind="props"
    v-click-outside="closeIfOpen"
    @mouseenter="onMouseEnter($event)"
    @mouseleave="onMouseLeave($event)"
    @keydown.esc="onEsc($event)"
  >
    <slot v-bind="{ isOpen }" />
  </Component>
</template>

<script>
import throttle from 'lodash/throttle'
import { reactive, computed } from '@vue/reactivity'
import { useId } from '@teamnovu/utils'

export default {
  inject: {
    popoverGroup: { default: null },
  },

  provide() {
    return {
      popover: reactive({
        isOpen: computed(() => this.isOpen),
        toggle: this.toggle,
        open: this.open,
        close: this.close,

        buttonId: computed(() => this.buttonId),
        hasButton: computed(() => !!this.button),
        registerButton: this.registerButton,
        unregisterButton: this.unregisterButton,
        focusButton: this.focusButton,

        panelId: computed(() => this.panelId),
        registerPanel: this.registerPanel,
        unregisterPanel: this.unregisterPanel,
      }),
    }
  },

  props: {
    tag: {
      type: String,
      default: 'div',
    },

    closeOnRouteChange: {
      type: Boolean,
      default: false,
    },

    openOnMouseEnter: {
      type: Boolean,
      default: true,
    },

    closeOnMouseLeave: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      isOpen: false,

      id: `popover-${useId()}`,
      buttonId: `popover-button-${useId()}`,
      button: null,
      panelId: `popover-panel-${useId()}`,
      panel: null,
    }
  },

  computed: {
    props() {
      return {
        id: this.id,
      }
    },
  },

  watch: {
    isOpen(isOpen) {
      if (isOpen) {
        this.popoverGroup?.closeOthers(this)
      }
    },

    $route() {
      if (this.closeOnRouteChange) {
        this.close()
      }
    },
  },

  created() {
    this.popoverGroup?.registerPopover(this)

    // Function needs to be throttled in the created hook to avoid it being throttled across all components
    // Source: https://forum.vuejs.org/t/issues-with-vuejs-component-and-debounce/7224/5
    this.setIsOpen = throttle(this.setIsOpen, 50, { trailing: false })
  },

  beforeDestroy() {
    this.popoverGroup?.unregisterPopover(this)
  },

  methods: {
    setIsOpen(isOpen) {
      this.isOpen = isOpen
    },

    toggle() {
      this.setIsOpen(!this.isOpen)
    },

    open() {
      this.setIsOpen(true)
    },

    close() {
      this.setIsOpen(false)
    },

    closeIfOpen() {
      if (this.isOpen) {
        this.close()
      }
    },

    registerButton(component) {
      this.button = component
    },

    unregisterButton() {
      this.button = null
    },

    focusButton() {
      this.button?.focus()
    },

    registerPanel(component) {
      this.panel = component
    },

    unregisterPanel() {
      this.panel = null
    },

    onMouseEnter(event) {
      if (this.openOnMouseEnter) {
        event.preventDefault()
        event.stopPropagation()

        this.open()
      }
    },

    onMouseLeave(event) {
      if (this.closeOnMouseLeave) {
        event.preventDefault()
        event.stopPropagation()

        this.close()
      }
    },

    onEsc(event) {
      event.preventDefault()
      event.stopPropagation()

      this.close()
      this.focusButton()
    },
  },
}
</script>
