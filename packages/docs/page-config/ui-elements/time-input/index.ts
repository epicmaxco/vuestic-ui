import apiOptions from "./api-options";
import apiDescription from "./api-description";

export default definePageConfig({
  blocks: [
    block.title("Time Input"),

    block.paragraph("Time Input component is a combination of Time Picker and Input components. You can find usage examples using following links:"),
    block.link("Time Picker", "/ui-elements/time-picker"),
    block.link("Input", "/ui-elements/input"),

    block.subtitle("Examples"),

    block.example("default", { title: "Default", }),

    block.example("ampm", {
      title: "AM PM",
      description: "VaTimeInput will automatically format input string if you need to use AM PM."
    }),

    block.example("clearable", {
      title: "Clearable",
      description: "The `clearable` prop adds a button to the right to clear the input. Prop `clearableIcon` sets the custom clear icon."
    }),

    block.example("validation", {
      title: "Validation",
      description: "Validation works the same way as `VaInput` validation, except rules functions should accept `Date` instead of string."
    }),

    block.example("format", {
      title: "Formatting",
      description: "We format input text specific to `view` prop. You can pass custom format function that accepts Date and return string.\n\nIn example bellow `(d) => d.toLocaleTimeString()` is used."
    }),

    block.example("input", {
      title: "Parsing",
      description: "Default parse time function likely cover all of your needs, but you can provide your own parse function using `parseTime` prop.",
    }),

    block.alert("It can parse such inputs: 11, 11:00, 11:00:00, 11 pm, 23, 2300, 11.00, 11somejunk00", "primary"),


    block.api("VaTimeInput", apiDescription, apiOptions),

    block.changeLog({
      '1.8.0': [
        'Date input have outlined style by default',
        '`solid` and `bordered` props moved to `preset="solid"` and `preset="bordered"`',
      ],
    })
  ],
});
