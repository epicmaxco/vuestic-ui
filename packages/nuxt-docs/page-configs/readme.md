# Page configs

Use `definePageConfig` to get IDE suggestions.

## Blocks

<!-- TOOD: Write here about docs blocks -->
Typescript types should be enough.

## Meta

<!-- TODO: Write here about meta -->
Typescript types should be enough.

## Manual options

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

## Example

```ts
export default definePageConfig({
  blocks: [
    title('button.title'),
    example('Default'),
    api(VaButton)
  ],
  meta: {
    category: "view"
  },
  manualApi: {
    slots: {
      default: { },
    },
    events: {
      click: { types: '() => Event' },
    },
    methods: {
      focus: { types: '() => void' },
      blur: { types: '() => void' },
    },
  }
})
```
