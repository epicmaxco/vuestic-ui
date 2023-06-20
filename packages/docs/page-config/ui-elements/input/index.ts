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
    block.example("ExtendedDefault", {
      title: "Readonly, disabled, symbols counter",
      description: "It can also be disabled, readonly and have symbols counter."
    }),
    block.example("HtmlAttributes", {
      title: "Supported HTML attributes",
      description: "Be default we support these HTML Input attributes: `type`, `disabled`, `readonly`, `placeholder`, `pattern`, `inputmode`, `minlength`, `maxlength`. Read more on the [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)."
    }),
    block.example("Styles", {
      title: "Styles",
      description: "There are tree styles for input: Default (solid), outline, bordered."
    }),
    block.example("Hint", {
      title: "Hint messages",
      description: "Support single/multi line messages to give some hint for improve UX"
    }),
    block.example("Validate", {
      title: "Validation and error/success state",
      description: "Support a simple validation using the rules prop. The prop accepts an array of callbacks. While validating rules, the current v-model value will be passed to the callback. This callback should return either true or a String, the error message. Also you can manually pass error/success prop to manage input state."
    }),
    block.example("Slots", {
      title: "Slots",
      description: "You can use slots for pass custom elements to input (inner or outer), such as icons or buttons etc."
    }),
    block.example("Textarea", {
      title: "Textarea",
      description: "Support a multi-line `va-input`, useful for larger amounts of text. You can make textarea auto-expandable or manually control min/max number of lines."
    }),
    block.example("Mask", {
      title: "Mask",
      description: "Support possibility to force/help the user to input a specific format with help from mask prop. You can pass some mask presets or custom options based on [cleave.js](https://nosir.github.io/cleave.js/)[[target=_blank]]. By default returning a raw value."
    }),
    block.example("InputClass", {
      title: "Input Class",
      description: "To assign a class directly to input, rather than its wrapper, use the `input-class` property. For example, you can use the build-in component class (or any other class you've created) to align the input text &mdash; `va-text-center` and `va-text-right` to align the center or right.",
    }),
    block.example("Customize", {
      title: "Customizable",
      description: "You can create `preset` for your input components, but sometimes requirements can be out of boundaries of pre-defined `presets`. To solve this problem component allows to customize it with `slots` and its `props`.",
    }),

    block.headline("Input types"),
    block.paragraph("With a `type` property you can set the type of the input which will render native `<input type=\"text/password/search/etc\" />`."),
    block.paragraph("Watch available types [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types) (some types aren't supported or have implemented as a Vuestic UI component)."),
    block.example("Types", { hideTitle: true }),

    block.subtitle("API"),
    block.api("VaInput", apiOptions),

    // TODO: Move variable from VaInputWrapper to VaInput
    block.paragraph("VaInputWrapper:"),
    block.file(
      "vuestic-ui/src/components/va-input/components/VaInputWrapper/_variables.scss"
    ),
  ],
});
