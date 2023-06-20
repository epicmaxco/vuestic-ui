import apiOptions from "./api-options";
import apiDescription from "./api-description";

export default definePageConfig({
  blocks: [
    block.title("Time Picker"),

    block.subtitle("Examples"),

    block.example("default", { title: "Default" }),

    block.example("framed", { title: "Framed" }),

    block.example("visibleCellsCount", {
      title: "Controlling the count of displayed cells",
      description: "For the better view need to set odd numbers"
    }),

    block.example("readonlyAndDisabled", { title: "Readonly and disabled" }),

    block.example("ampm", {
      title: "AM PM",
      description: "You can specify `ampm` props if you want to use 12-hours clock format set as true or 24-hours clock set as false."
    }),

    block.example("periodUpdatesModelValue", { title: "Period updates model value", }),

    block.example("view", {
      title: "View",
      description: "You can specify if time picker needs to show seconds and minutes."
    }),

    block.example("filter", {
      title: "Filter",
      description: "You can hide specific time and user will not be able to select it."
    }),

    block.api("VaTimePicker", apiDescription, apiOptions),
  ],
});
