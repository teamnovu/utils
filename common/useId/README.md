Paginate
=================

This function is used to generate unique ID's eg. for input fields and their labels. It will return a value incremented on every call.

## Usage

```javascript
import { useId } from '@teamnovu/utils'

export default {
  data() {
    return {
      id: `input-field-${useId()}`,
    }
  },
}
```
