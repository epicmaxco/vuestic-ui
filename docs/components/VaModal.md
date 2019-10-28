```html
<va-modal
 v-model="showModalPositionTop"
 title="Simple Popup, Full Width"
 message="Message 1"
 position="top"
/>
```

```javascript
export default {
  data () {
    return {
      showModalPositionTop: false
    }
  }
  // ...
}
```

### Props
* `value` - Boolean - controls visibility of modal
* `position` - String - use `size='top'` to set the position of modal. Use one of these values `['top', 'right', 'bottom', 'left']`
* `size` - String (default: 'medium') - use `:size="small"` to set the size of modal. Use one of these values `['small', 'medium', 'large']`
* `fullscreen` - Boolean (default false) - use `fullscreen` to show modal in fullscreen mode
* `mobileFullscreen` - Boolean (default: true) - use `mobile-fullscreen: false` to prevent fullscreeen mode on mobile devices
* `maxWidth` - String - use `max-width` string. You can use any line as in ordinary css. `300px, 30%` etc.
* `maxHeight` - String (default `90vh`) - use `max-height` to change the maximum height of the modal. If content is larger, scroll will appear
* `noEscDismiss` - Boolean (default: false) - use `no-esc-dismiss: true` to disallow close modal on esc button click
* `noOutsideDismiss` - Boolean (default false) - use `no-outside-dismiss: true` to disallow close modal when outside modal was clicked
* `hideDefaultActions` - Boolean (default: false) - use `hideDefaultActions: true` to hide Cancel and Ok buttons
* `title` - String
* `message` - String
* `okText` - String (default: 'OK') - use `okText="Some Text Here"` to set text in confirm button
* `cancelText` - String (default: 'Cancel') - use `cancelText="Some Text Here"` to set text in cancel button
* `fixedLayout` - Boolean (default: false) - use `fixedLayout: true` to scroll only content in modal. Title and actions will be fixed 
* `withoutTransitions` - Boolean (default: false) - use `withoutTransitions: true` to turn off the animations on the modal

### Events
* `onOk` - action, that happens if user clicks on "OK" button
* `onCancel` -  action, that happens if user clicks on "Cancel" button or close icon

### Slots
* `default` - the main content of the modal
* `header` - appears after the title in the modal
* `actions` - appears after the default actions at the bottom of the modal

[Find DEMOs here!](http://vuestic.epicmax.co/#/admin/ui/modals)
