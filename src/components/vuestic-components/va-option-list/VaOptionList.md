# Option List

```html
<va-option-list
    type="radio"
    :options="options"
    v-model="selected"
/>
    <va-option-list
    :options="options"
    :default-value="[options[0], options[2]]"
    v-model="withDefault"
/>
```

**Props**
* `id` - String
* `name` - String
* `options` - Array - array of options
* `value` - any - main value
* `disabled` - Boolean - disable all items in list
* `readonly` - Boolean
* `default-value` - any - value to use if `value` prop is undefined
* `disabledBy` - String | Function - key in option object to find disabled value
* `textBy` - String | Function - key in option object to find text value
* `trackBy` - String | Function - key in option object to find track value
* `valueBy` - String | Function - key in option object to find value value
* `errorMessages` - Number - list of error messages for current input field
* `errorCount` - Number (default: 1) - shows a number of errors to display, given an array of error messages is passed
* `error` - Boolean - define whether the field is error or not
* `leftLabel` - Boolean - define whether label should be to the left of item (default: false)
* `color` - String

