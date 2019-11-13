# va-form
Component va-form wrap form-elements and provide specific form properties to inside components

## Import
In template: 
```vue
<va-form>Slot</va-form>
```

In component:
```js
import { VaForm } from `vuestic-ui`

export default {
  components: {
    VaForm,
  }
}
```


## Usage

```vue
<va-form autofocus>
  <va-input label="name" v-model="Input"/>
  <va-select label="city" v-model="Select" :options="options"/>
  <va-button @click="submitForm">Submit</va-button>
</va-form>
```


## API

[API is work in progress, for now just textual info]

* `autofocus`: Boolean - focus on first form element on render (input, select, checkbox, etc.)
* `lazy-validation`: Boolean - validate only first field when validation is triggered

Events: 

* `validation`: (valid: Boolean) => void - triggered on validation update
 
Methods: 
* `validate()`: boolean - performs validation and updates error state for each form component.
* `focus()`: void - focus on first focusable element in the form.
* `focusInvalid()`: void - focus on first invalid focusable component in the form. If there are none - should default to focus().
* `resetValidation()`: void - reset validation for all validateable form elements
* `reset()`: void - reset value + validation stater for all form elements.
 
Slots:

* `default` - form components (input, select, checkbox, etc.). For now we support only one level deep.
