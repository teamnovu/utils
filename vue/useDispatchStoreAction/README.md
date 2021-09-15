useDispatchStoreAction
=================

This utility simplifies dispatching a store action, tracking it's state, displaying validation errors and triggering success messages. It can be used for simple form submits.

## Usage

The DispatchStoreAction mixin is initialised using the `useDispatchStoreAction` method imported from `~/mixins/DispatchStoreAction`.

```javascript
import { useDispatchStoreActionMixin } from '@teamnovu/utils'
```

This is the simplest form it can be used in. In this case it's used to dispatch an action to update a user.

```javascript
mixins: [useDispatchStoreActionMixin({ action: 'user/update' })],
```

On form submit or whatever it can be dispatched as follows.

```javascript
methods: {
  onSubmit() {
    // Pass in the payload required by the respective store action ('user/update' in this case).
    this.dispatchStoreAction(this.user).then((updatedUser) => {
      // Do something after the promise is fulfilled. Eg. redirect to the overview.
      // this.$router.replace('/profile/details')
    })
  },
},
```

##### Using with multiple actions

In some cases you may want to dispatch multiple store actions from the same component. In this case you can just initialize the mixin x times and give each one a name.

```javascript
mixins: [
  useDispatchStoreActionMixin({
    name: 'storeActionUpdate',
    action: 'address/update',
  }),
  useDispatchStoreActionMixin({
    name: 'storeActionDelete',
    action: 'address/delete',
  }),
],
```

The methods to dispatch the individual actions will be named using the name you pass in prefixed with "dispatch". In this case they will be named `dispatchStoreActionUpdate` and `dispatchStoreActionDelete`.

#### Options

##### action

Required

This is the action which will be dispatched.

##### name

Default: `'storeAction'`

This will be used to name the dispatch method as follows with the first character of the name capitalised: `` `dispatch${ucfirst(name)}` ``

By default this will result in `dispatchStoreAction`.

##### observerRef

Default: `'observer'`

This is the vee-validate ValidationObserver ref to be used to set validation errors. Set falsy if you don't want it to set error messages for you.

#### dispatchStoreAction Method Options

The following options can be passed to the dispatch method as follows.

```javascript
dispatchStoreAction(payload, options)
```

##### observer

Default: `this.$refs[observerRef]`

Here, the ValidationObserver instance can be passed to override the observerRef previously set.
