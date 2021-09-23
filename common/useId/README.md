useId
=================

This function is used to generate unique IDs eg. for input fields and their labels. It will return a value incremented on every call.

## Usage

The useId method simply returns a counter value incremented on every call.

```javascript
import { useId } from '@teamnovu/utils'

console.log(useId()) // 1
console.log(useId()) // 2
console.log(useId()) // 3
```

Please note that the counter is a global variable and therefore is incremented continuously across requests when used in SSR.

This is why a `useIdMixin` is provided for components to use unique IDs.

```vue
<!-- InputField.vue -->
<template>
  <label :for="id">
    <input :id="id" />
  </label>
</template>

<script>
import { useIdMixin } from '@teamnovu/utils'

export default {
  mixins: [useIdMixin({ baseProp: 'name' })],
  
  data() {
    return {
      name: `input-field`,
    }
  },
}
</script>
```

```vue
<!-- SomeComponent.vue -->
<template>
  <InputField v-model="firstname" /> <!-- #input-field-1 -->
  <InputField v-model="lastname" /> <!-- #input-field-2 -->
  <InputField v-model="email" /> <!-- #input-field-3 -->
</template>
```

#### Options

##### name

Default: `'id'`

This will be used as the name of the ID property on the data object.

##### baseProp

Default: `null`

This string can be used to identify a property on the component to be used as the ID with the uniquely generated ID suffix.

##### generator

Default: `null`

This function accepts the unique ID incremented as an argument and can be used to generate the ID-string.
