import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Date Picker"),
    block.paragraph("Date picker component allows user to select single, multiple or range of dates, months and years. You can customize it the way you want. There is a option to change all string and formats.\n\nIt based on native js dates so you can use this Date Picker with any date library you want."),
    block.link("Also, look at Date Input", "/ui-elements/date-input"),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Basic usage",
      description: "By default, use this component with v-model."
    }),

    block.example("Mode", {
      title: "Mode",
      description: "You can use date picker in three different ways. By default date picker uses `auto` mode. This means that `mode` will be chosen based on `modelValue`. There is three modes: `single`, `multiple` and `range`. Different modes require different model values."
    }),

    block.example("Stateful", {
      title: "Stateful",
      description: "Date picker can be stateful. Initial value will be undefined, but user can change it."
    }),

    block.example("FirstWeekday", {
      title: "First day of the week",
      description: "If you want to always use Monday as the first day of the week, you can set this prop in GlobalConfig."
    }),

    block.example("Weekends", {
      title: "Weekends",
      description: "You can highlight weekends using `highlight-weekends` prop. Also, you can set your own weekends using `weekends` function."
    }),

    block.example("OtherMonths", {
      title: "Other month days",
      description: "You can show days of other months using `show-other-months` prop instead of blank cells in calendar."
    }),

    block.example("Slots", {
      title: "Slots",
      description: "For now, we don't support localization using one prop. But you have opportunity to localize it by yourself using slots."
    }),

    block.example("View", {
      title: "View",
      description: "You can set specific view for date picker. With `view` prop you can define how date picker will displayed, year and month that will be shown."
    }),

    block.example("Type", {
      title: "Type",
      description: "If you want allow user to pick only month or year, you can make it using `type` prop."
    }),

    block.example("DisabledDates", {
      title: "Disable dates",
      description: "You can disable some specific days, month or year using `allowedDays`, `allowedMonth` or `allowedYear` props."
    }),

    block.example("Color", {
      title: "Colors",
      description: "You can change colors using CSS variables for deeper customization, but also you can simple change colors using props."
    }),

    block.example("Readonly", {
      title: "Readonly",
      description: "Readonly picker for readonly forms."
    }),

    block.example("Disabled", {
      title: "Disabled",
      description: "Disabled picker that can be used in forms."
    }),

    block.subtitle("API"),
    block.api("VaDatePicker", apiDescription, apiOptions),
  ],
});
