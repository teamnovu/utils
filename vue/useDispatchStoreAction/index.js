export function useDispatchStoreActionMixin(config) {
  const { action, name, observerRef } = {
    name: 'storeAction',
    observerRef: 'observer',

    ...config,
  }
  const nameUcFirst = name.charAt(0).toUpperCase() + name.slice(1)

  return {
    data() {
      return {
        [name]: { state: 'idle' },
      }
    },

    methods: {
      [`dispatch${nameUcFirst}`](payload, options) {
        const { observer } = {
          observer: this.$refs[observerRef],

          ...options,
        }

        return new Promise((resolve, reject) => {
          this[name].state = 'loading'

          this.$store
            .dispatch(action, payload)
            .then((response) => {
              this[name].state = 'success'

              resolve(response)
            })
            .catch((e) => {
              this[name].state = 'error'

              if (
                e.response?.status === 422 &&
                e.response.data?.errors &&
                observer
              ) {
                observer.setErrors(e.response.data.errors)
              }

              reject(e)
            })
        })
      },
    },
  }
}
