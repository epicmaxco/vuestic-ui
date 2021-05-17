# BusPlugin

This plugin provides mechanism for app-wide communication between the components. This is implementation of publisher-subscriber pattern that is specifically designed to be used inside vue.js components.

To subsribe to events, you should pass the subsription object to the component options:

```js
export default {
  subs: {
    MessageSent (message) {
      this.lastMessage = message
    }
  }
}
```

To fire an event you should call $pub method of your component:

```js
export default {
  methods: {
    fireEvent() {
      this.$pub('MessageSent', this.message)
    }
  }
}
```

$pub may be called from template as well:

```html
<va-button v-on:click="$pub('MessageSent', message)">Fire event from template</va-button>
```
