import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Date Input"),
    block.paragraph("Date Input component is a combination of Date Picker and Input components. You can find usage examples using following links:"),

    block.link("Date Picker", "/ui-elements/date-picker"),
    block.link("Input", "/ui-elements/input"),

    block.subtitle("Examples"),

    // examples
    block.example("default", { "title": "Basic usage" }),

    block.example("inputProps", {
      "title": "Input props",
      description: "You can pass properties to `VaDateInput`"
    }),

    block.example("input", {
      "title": "Parsing",
      description: "You can pass the parse function to VaDateInput which will parse input text like you want to. This way you can use any format that you want. For example, you can use [date-fns](https://date-fns.org/v2.23.0/docs/format)[[target=_blank]] to parse date string. By default we parse this input using standard `Date.parse` method."
    }),

    block.example("advancedFormatting", {
      "title": "Advanced formatting",
      description: "If you need specific format for multiple or range modes you can use."
    }),

    block.example("View", {
      "title": "View",
      description: "You can set specific view for date picker. With `view` prop you can define how date picker will displayed, year and month that will be shown."
    }),

    block.paragraph("You can easily use your format functions for all VaDateInputs using [Global Config](/services/components-config) feature."),
    block.code("global-config"),

    block.example("validation", {
      "title": "Validation",
      description: "Validation works the same way as `VaInput` validation, except rules functions should accept `Date` instead of `string`."
    }),

    block.example("mode", {
      title: "Mode",
      description: "You can use date input in three different ways. By default date input uses `auto` mode. This means that `mode` will be chosen based on `modelValue`. There is three modes: `single`, `multiple` and `range`. Different modes require different model values."
    }),

    block.example("formatting", {
      "title": "Formatting",
      description: "You can pass the format function to VaDateInput which will format input text like you want to. This way you can use any format that you want. For example, you can use [date-fns](https://date-fns.org/v2.23.0/docs/format)[[target=_blank]]."
    }),

    block.example("manual", {
      "title": "Date Manual Input",
      description: "You can add `manual-input` attribute to allow user input text from keyboard manually."
    }),

    block.example("isOpen", {
      "title": "IsOpen",
      description: "IsOpen prop allows you to force show dropdown as opened."
    }),

    block.example("resetOnClose", {
      "title": "Reset on close",
      description: "There is a prop `resetOnClose` for range mode. If user selected incomplete range and closed dropdown, then used last complete value."
    }),

    block.subtitle("API"),
    block.api("VaDateInput", apiDescription, apiOptions),


    block.changeLog({
      '1.8.0': [
        'Date input have outlined style by default',
        '`solid` and `bordered` props moved to `preset="solid"` and `preset="bordered"`',
      ],
    })
  ],
});
