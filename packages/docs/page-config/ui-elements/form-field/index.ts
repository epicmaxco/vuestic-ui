export default definePageConfig({
  blocks: [
    block.title("FormField"),
    block.paragraph("Form field component is a utility component that helps you to manage form fields. It provides `isValid`, `isDirty`, `errorMessages` computed refs and `validate` method to validate form fields. You can also reset validation with `resetValidation` method or reset whole form field and its value with `reset` method."),

    block.paragraph("Notice, that you need to use slot bind `#default=\"{ value }\"` and `v-model=\"modelValue.ref\"` otherwise `isDirty` will not be updated. Alternatively, you can set `:dirty=\"true\"`."),

    block.subtitle("Examples"),
    block.example('default', {
      title: 'Basic usage',
      description: '`VaFormField` accepts validation `rules` as prop. If you want to make your own custom component you can wrap it with `VaFormField` and pass `rules` prop to it. Component will perform validation and show error messages if needed.',
    }),

    block.example('message', {
      title: 'Message',
      description: 'You can show message instead of error message. Just pass `message` prop to `VaFormField`.',
    }),

    block.example('use-form', {
      title: 'Using with `VaForm`',
      description: 'You can use `VaFormField` with `VaForm` component. `VaForm` will treat your custom component as form field.',
    }),

    block.subtitle("API"), block.api("VaFormField", {}),
  ],
});
