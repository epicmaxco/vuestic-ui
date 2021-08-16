# Docs API

### Props

By default prop use list from component. Its transition string is automatically generated from component name if its exists. If not, then use transition string from global api.

In Manual API options you can define custom transition string.

Here is priority for transitions:
```
customTranslation -> `api.${componentName}.props.${propName}` -> `api.all.props.${propName}`
```


### Events

Events also auto generated from component `emits` field.

You can hide or edit some events using manual api options.

### Methods

In methods api docs we describe methods, that user can use via `ref`.

Because of a lot of methods, we don't generate automatically methods list, you need to manually choose which methods are public.


### Slots

There is no way to indicate which slots user need to pass to component, so you need to manually declare it.

### Example

```ts
import { defineManualApi } from '../../../DocsApi/ManualApiOptions'

export default defineManualApi({
  props: {
    // Custom type
    modelValue: { types: 'Date | Date[]' },
    // Custom transition string
    color: { translation: "api.VaInput.props.color" }
  },
  methods: {
    // Declare that component has focus method with custom type
    focus: { types: '() => void' }
  },
  slots: {
    // Declare that component has default slot
    default: {}
  }
})

```
