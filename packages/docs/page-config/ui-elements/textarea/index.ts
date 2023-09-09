import apiDescription from "./api-description";

export default definePageConfig({
  blocks: [
    block.title("Textarea"),

    block.paragraph("Textareas are used for multiline input. They support auto resizing, validation, and more."),
    block.link("Input", "/ui-elements/input"),

    block.subtitle("Examples"),

    block.example("Default", { 
      title: "Default",
      description: "By default textarea is two rows input.",
    }),

    block.example("Label", {
      title: "Label",
      description: "You can specify `label` prop to add label to textarea. By default label is placed above textarea.",
    }),

    block.example("InnerLabel", {
      description: 'In case you want to keep label inside textarea, you can use `:inner-label="true"` prop.',
    }),

    block.example("Autosize", { 
      title: "Autosize",
      description: "There are situations when you want textarea to grow in size as user types. You can use `:autosize=\"true\"` prop to enable this behavior.\n\nYou can also specify `minRows` and `maxRows` props to limit textarea size.",
    }),

    block.example("Validation", {
      title: 'Validation',
      description: "With `rules` prop you can specify validation rules for textarea.\n\nYou can also use `counter` and `maxLength` props to limit textarea length. Notice that `maxLength` prop will not prevent user from typing more characters and will not show error, so you need to add validation rule manually.\n\nValidation rule can return error message or boolean. You can also use `required-mark` rule to add `*` to label.",
    }),

    block.api("VaTextarea", apiDescription, {}),

    block.changeLog({
      '1.8.0': [
        'Date input have outlined style by default',
        '`solid` and `bordered` props moved to `preset="solid"` and `preset="bordered"`',
      ],
    })
  ],
});
