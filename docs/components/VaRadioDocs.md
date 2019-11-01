# Radio Buttons

```html
<va-radio
  v-model="selectedOptionString"
  label="label"
  name="radio"
  color="success"
  option="one"
/>
```

### Props
* `label`: String | Number - Label to display next to the radio control
* `value`: any - Model of the component; Either use this property (along with a listener for 'input' event) or use v-model directive
* `option`: any - Option value that model is updated to when option is selected
* `name`: String | Number - Native name attribute
* `left-label`: Boolean - default: false - Label (if any specified) should be displayed on the left side of the radio,
* `color`: String - colors active radios (use color theme mixin)
* `disabled`: Boolean - disable radio
