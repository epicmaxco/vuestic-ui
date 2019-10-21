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
* `label`: String | Number - the label of Radio
* `value`: amy - Model of the component; Either use this property (along with a listener for 'input' event) or use v-model directive
* `option`: any - according to value for comparison, to determine whether the selected
* `name`: String | Number - native name attribute
* `left-label`: Boolean - default: false -Label (if any specified) should be displayed on the left side of the checkbox,
* `color`: String - colors active radios (use color theme mixin)
* `disabled`: Boolean - disable radio
