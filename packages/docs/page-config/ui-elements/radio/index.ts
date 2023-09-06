import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Radio"),
    block.paragraph("The `va-radio` allows the user to select one option from a set."),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Default",
      description: "Default usage  of the `va-radio` component. Make sure to add a `name` prop to group them together."
    }),

    block.example("Options", {
      title: "Multiple Options",
      description: "You can use `options` prop to pass an array of options to the component. Then multiple components will be rendered.`"
    }),
    block.example("ComplexOptions", {
      description: "You can use more complex options with `textBy` and `valueBy` props if needed."
    }),
    block.example("Validation", {
      description: "Passing multiple `options` at the same time allows you to use validation `rules`.",
    }),

    block.example("Color", {
      title: "Colors",
      description: "With `color` prop you can change the color of the component."
    }),
    block.example("CustomLabels", {
      title: "Custom Labels",
      description: "You can add a label text by setting the `label` property. To switch label side use `left-label` property."
    }),
    block.example("Disabled", {
      title: "Disabled",
      description: "With `disabled` prop you can disable a user interaction  with `va-radio` component."
    }),
    block.example("Slot", {
      title: "Slot",
      description: "You can use `default` slot to pass a custom content as text to the component. You can also change icon appearance with `icon` slot."
    }),

    block.subtitle('Accessibility'),
    block.paragraph(`
Each option has [radio](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/radio_role)[[target=_blank]] role attribute.
If \`options\` prop is used the component has a [radiogroup](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/radiogroup_role)[[target=_blank]] role attribute, 
otherwise you need to add \`role="radiogroup"\` on parent element manually.

[aria-checked](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-checked)[[target=_blank]] is applied on option automatically.

Always set \`name\` prop on the component to group options together for correct keyboard navigation.

Set [aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label)[[target=_blank]] or [aria-labelledby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby)[[target=_blank]] attribute on the component to provide a label for screen readers for radio-group if needed.
By default radio element labeled by text from option.
    `.trim()),

    block.subtitle("API"),
    block.api("VaRadio", apiDescription, apiOptions),

    block.changeLog({
      '1.8.0': [
        'Radio have outlined style by default',
        'Add `preset="solid"`',
      ],
      '1.7.0': [
        'Added validation and `options` prop'
      ]
    })
  ],
});
