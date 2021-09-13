useId
=================

This function is used to generate unique ID's eg. for input fields and their labels. It will return a value incremented on every call.

## Usage

```vue
<!-- InputField.vue -->
<template>
  <label :for="id">
    <input :id="id" />
  </label>
</template>

<script>
import { useId } from '@teamnovu/utils'

export default {
  data() {
    return {
      id: `input-field-${useId()}`,
    }
  },
}
</script>
```

```vue
<!-- SomeComponent.vue -->
<template>
  <InputField v-model="firstname" />
  <InputField v-model="lastname" />
  <InputField v-model="email" />
</template>
```
