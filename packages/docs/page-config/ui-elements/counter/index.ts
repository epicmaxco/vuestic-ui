import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Counter"),
    block.paragraph("The `va-counter` component is intended to be used as a simple counter."),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Basic usage",
      description: ""
    }),
    block.example("ManualInput", {
      title: "Manual input",
      description: "With `manual-input` the user can manually enter a value."
    }),
    block.example("Style", {
      title: "Style",
      description: "There are tree styles for component: outlined (default), solid and bordered. You can change component looks with `presets` props"
    }),
    block.example("Buttons", {
      title: "Buttons",
      description: "By default, `va-counter` uses internal icons. The component with prop `buttons` will use external buttons."
    }),
    block.example("Width", {
      title: "Width",
      description: "You can set the width of the entire component with `width`, as well as the indentation of external buttons with `margins`."
    }),
    block.example("ButtonsStyle", {
      title: "Buttons style",
      description: "You can select different button styles using properties `flat` (by default `flat = true`), `rounded` (by default `rounded = false`) and `margins`."
    }),
    block.example("IconsColors", {
      title: "Custom icons and colors",
      description: "You can select different icons using the `increaseIcon` and `decreaseIcon` properties, and you can also select colors using `color` and `text-color`."
    }),
    block.example("State", {
      title: "State",
      description: "Component can be `disabled` or `readonly`."
    }),
    block.example("MaxMinStep", {
      title: "Max, min, step",
      description: "You can define `min`, `max` and `step` values."
    }),
    block.example("Slots", {
      title: "Slots",
      description: "You can use slots for pass custom elements: `content` (you can access to **value**) instead of **input** element, `decreaseAction` (you can access to **decrease** function) instead of decrease icon or button and `increaseAction` (you can access to **increase** function) instead of increase icon or button."
    }),

    block.subtitle("API"),
    block.api("VaCounter", apiDescription, apiOptions),

    block.changeLog({
      '1.8.0': [
        'Removed `width` props, use `style="width: *"` instead',
        'Changed default size to `--va-form-element-default-width-small` (120px).',
        '`outline`, `bordered` props are removed. Component is always outlined. `solid` and `bordered` props are moved to `preset` prop (`preset="solid"`, `preset="bordered"`).`',
      ]
    })
  ],
});
