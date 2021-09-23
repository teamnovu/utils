let id = 0

function generateId() {
  return ++id
}

export default function useId() {
  return generateId()
}

export function useIdMixin(config) {
  const { name, generator, baseProp } = {
    name: 'id',

    ...config,
  }

  return {
    data() {
      return {
        [name]: undefined,
      }
    },

    mounted() {
      const uniqueId = useId()

      if (typeof generator === 'function') {
        this[name] = generator(uniqueId)
      } else if (typeof baseProp === 'string') {
        this[name] = `${this[baseProp]}-${uniqueId}`
      } else {
        this[name] = uniqueId.toString()
      }
    },
  }
}
