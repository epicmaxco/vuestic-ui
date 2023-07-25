import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Form"),
    block.paragraph("Need more advanced validation than just `type=\"email\"` over your input elements? **`va-form`** has a solution to offer."),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Default usage",
      description: "`VaForm` component in pair with `useForm` composable provides a simple way to validate multiple form fields. It gives you `isValid`, `errorMessages` computeds and `validate` method to validate all form fields at once. You can also reset validation with `resetValidation` method or reset whole form and it's values with `reset` method."
    }),
    block.example("HideErrors", {
      title: "Named fields",
      description: "If you don't like when form jumps you can name each form field and access it's error messages with `errorMessagesNamed` with `useForm` composable and hide errors under form fields using `hide-error-messages` props, so you can display them in a custom way."
    }),
    block.example("FormData", {
        title: "FormData",
        description: "You can access `formData` to get access to value of named fields. Notice, that `formData` is not the same as native implementation of [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData), instead it is a reactive object which can contain `string`, `number` or `Date` values of form fields."
      }
    ),
    block.example("AsyncValidation", {
      title: "Async validation",
      description: "By default if you return `Promise` in validation rule it will be treated as async, set field in `loading` state and show error after promise resolved. If there is error in synchronous rule it will be shown immediately and async validation will not be triggered to prevent extra backend calls. You can use `hide-loading` `VaForm` prop to hide loading state of form fields. You also can use `asyncValidate` method to validate form fields asynchronously. "
    }),
    block.example("Submit", {
      title: "Form submit",
      description: "You can fire the `submit` event of a `va-form` component: for this you need to set `tag=\"form\"` to the `va-form` and have at least one inner button with `type=\"submit\"`."
    }),

    block.subtitle("API"),
    block.api("VaForm", apiDescription, apiOptions),
  ],
});
