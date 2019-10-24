# va-button-toggle

This component is used as an alternative for radio-button.

```html
<va-button-toggle 
  v-model="model"
  options="options"
  toggle-color="warning"/>
``` 

```javascript
export default {
  data () {
    return {
      options: [
        { label: 'One', value: 'one' },
        { label: 'Two', value: 'two' },
        { label: 'Three', value: 'three' }
      ],
      model: 'two'
    }
  }
}
``` 

### Props
* `options` - Array. Contains objects with value and label properties. Button entities will be created according to this array.
* `value` - String. Value of active button in button toggle component. 
* `toggle-color` - String. Set color of active button in button toggle component. Toggle colors variety is the same as variety of colors for buttons.
* `outline` - Boolean.
* `flat` - Boolean.
* `disabled` - Boolean.
* `color` - String.
* `size` - String (default: 'medium') - use `size="small"` to set the size of modal. Use one of these values `['small', 'medium', 'large']`

[Find DEMOs here!](http://vuestic.epicmax.co/#/admin/ui/buttons)

