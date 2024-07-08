import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("Input"),
    block.paragraph("The `va-input` component is intended to be used instead of the standard HTMl input or textarea."),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Basic usage",
      description: "By default `va-input` doesn’t have attributes, but can be combined with a placeholder and/or label."
    }),
    block.example("Styles", {
      title: "Styles",
      description: "There are tree styles for input: Default (outlined), solid, bordered."
    }),
    block.example("Hint", {
      title: "Hint messages",
      description: "Support single/multi line messages to give some hint for improve UX"
    }),
    block.example("Counter", {
      title: "Counter",
      description: ""
    }),
    block.example("Validate", {
      title: "Validation and error/success state",
      description: "Support a simple validation using the rules prop. The prop accepts an array of callbacks. While validating rules, the current v-model value will be passed to the callback. This callback should return either true or a String, the error message. Also you can manually pass error/success prop to manage input state. Notice that we use `immediate-validation` props to show error message without requiring user interaction."
    }),
    block.example("Slots", {
      title: "Slots",
      description: "You can use slots for pass custom elements to input (inner or outer), such as icons or buttons etc."
    }),
    block.example("StrictVModel", {
      title: 'Strict v-model bind',
      description: 'In case you want to strictly bind v-model to input value. This will prevent user from typing anything that doesn\'t match provided model-value. Can be used for validation or making masks.'
    }),
    block.example("InputClass", {
      title: "Input Class",
      description: "To assign a class directly to input, rather than its wrapper, use the `input-class` property. For example, you can use the build-in component class (or any other class you've created) to align the input text &mdash; `va-text-center` and `va-text-right` to align the center or right.",
    }),
    block.example("Customize", {
      title: "Customizable",
      description: "You can create `preset` for your input components, but sometimes requirements can be out of boundaries of pre-defined `presets`. To solve this problem component allows to customize it with `slots` and its `props`.",
    }),

    block.example("HtmlAttributes", {
      title: "Supported HTML attributes",
      description: "Be default we support these HTML Input attributes: `type`, `disabled`, `readonly`, `placeholder`, `pattern`, `inputmode`, `minlength`, `maxlength`. Read more on the [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)."
    }),
    block.headline("Input types"),
    block.paragraph("With a `type` property you can set the type of the input which will render native `<input type=\"text/password/search/etc\" />`."),
    block.paragraph("Watch available types [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types) (some types aren't supported or have implemented as a Vuestic UI component)."),
    block.example("Types", { hideTitle: true }),

    block.subtitle("API"),
    block.api("VaInput", {
      props: {
        ariaLabel: 'Specify the `aria-label` attribute for screen readers. By default it is set to the `label` prop.',
        clearable: 'Specifies whether the input should be clearable.',
        clearValue: 'Value which will be set after clear.',
        counter: 'Specifies whether the input should have a counter at the bottom.',
        innerLabel: 'If true label will be inside the input.',
        inputClass: 'Class to be applied directly to the input element.',
        placeholder: 'Placeholder text.',
        pattern: 'Pattern for input in case you want to use native validation.',
        maxLength: 'Maximum length of input.',
        minLength: 'Minimum length of input.',
        inputmode: 'The inputmode global attribute is an enumerated attribute that specifies what kind of input mechanism would be most helpful for users entering content into the form control.',
        strictBindInputValue: "In case you want to strictly bind v-model to input value. This will prevent user from typing anything that doesn't match your custom the mask.",
      },
      events: {
        clear: 'Emitted when the clear button is clicked.',
        'update:error': 'Emitted when the error prop changes. You can use v-model:error to sync the error prop bidirectionally.',
        'update:errorMessages': 'Emitted when the error-messages prop changes. You can use v-model:error-messages to sync the error-messages prop bidirectionally.',
      },
      slots: {
        append: 'Slot for append content. It will be placed after input component.',
        appendInner: 'Slot for append content. It will be placed inside input.',
        prepend: 'Slot for prepend content. It will be placed before input component.',
        prependInner: 'Slot for prepend content. It will be placed inside input.',
      },
      methods: {
        blur: 'Removes focus from input.',
        focus: 'Sets focus on input.',
        reset: 'Resets input value.',
      }
    }, apiOptions),

    // TODO: Move variable from VaInputWrapper to VaInput
    block.paragraph("VaInputWrapper:"),
    block.file(
      "vuestic-ui/src/components/va-input-wrapper/_variables.scss"
    ),
  ],
});
