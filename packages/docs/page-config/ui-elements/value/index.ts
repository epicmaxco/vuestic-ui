export default definePageConfig({
  blocks: [
    block.title('Value'),
    block.paragraph('Value is a headless utility component that provides you a reactive variable in template. This is useful when you want to have a state in HTML you passed to slot.'),
    block.example('Default', {
      title: "Default",
      description: "By default `VaValue` provides reactive boolean value with `false` by default. Reactive variable passed to `#default=\"v\"` slot bind and can be accessed or changed like `ref`. Bellow is example of toggle value on description click `v.value = !v.value`."
    }),
    block.example('WithInputs', {
      title: "Inline editing",
      description: "Great example where `VaValue` can be useful is `v-for` or `v-slot`. In example below we render form data with `v-for` and for each item `VaValue` creates state, which we use to change if it is in edit mode or not."
    }),
    block.example('String', {
      title: "Default value",
      description: "You can pass any type of value to `VaValue` and it will be reactive. In example below we pass `string` and `object` values and use it to render description."
    }),

    block.api('VaValue', { props: { defaultValue: "The default value of the component" }}),
  ],
})
