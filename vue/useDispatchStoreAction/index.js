export function useDispatchStoreActionMixin(config) {
  const { action, name, observerRef, validate } = {
    name: 'storeAction',
    observerRef: 'observer',
    validate: true,

    ...config,
  }
  const nameUcFirst = name.charAt(0).toUpperCase() + name.slice(1)

  return {
    data() {
      return {
        [name]: { state: 'idle', responseStatus: null },
      }
    },

    methods: {
      async [`dispatch${nameUcFirst}`](payload, options) {
        const { observer, validate: innerValidate } = {
          observer: this.$refs[observerRef],
          validate,

          ...options,
        }

        this[name].state = 'loading'
        this[name].responseStatus = null

        if (innerValidate && observer) {
          if (!(await observer.validate())) {
            this[name].state = 'failed_validation'
            this[name].responseStatus = null

            throw new Error('Validation failed')
          }
        }

        try {
          const response = await this.$store.dispatch(action, payload)

          this[name].state = 'success'
          this[name].responseStatus = response?.status
        } catch (e) {
          this[name].state = 'error'
          this[name].responseStatus = e.response?.status

          if (
            e.response?.status === 422 &&
            e.response.data?.errors &&
            observer
          ) {
            observer.setErrors(e.response.data.errors)
          }

          throw e
        }
      },
    },
  }
}
