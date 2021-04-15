# va-form
`VaForm` wraps form-components <!-- TODO Add link --> and is primarily intended to simplify validation.

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
  <va-input label="name" v-model="input"/>
  <va-select label="city" v-model="select" :options="options"/>
  <va-button @click="submitForm">Submit</va-button>
</va-form>
```


## Vuelidate
Vuelidate is a simple, lightweight model-based validation for Vue.js [Documentation](https://vuelidate.js.org/)


```vue
<va-form ref="form">
  <va-input
    label="name"
    v-model="$v.name.$model"
    :error="$v.name.$error"
    :error-messages="[
      !$v.name.required && 'reqired',
      !$v.name.minLength && `Name must have at least ${$v.name.$params.minLength.min} letters.`
    ]"
  />

  <va-input
    label="name"
    v-model="$v.email.$model"
    :error="$v.email.$error"
    :error-messages="[
      !$v.email.required && 'reqired',
      !$v.email.email && 'Email must be correct'
    ]"
  />
  <va-button @click="$refs.form.validate()">Validate</va-button>
</va-form>
```

```js
import { VaForm, VaInput } from `vuestic-ui`
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  components: {
    VaForm,
    VaInput,
  },
  validations: {
    name: {
      required,
      minLength: minLength(4),
    },
    email: {
      required,
      email,
    },
  },
  data () {
    return {
      name: '',
      email: '',
    }
  },
}
```
