import apiOptions from "./api-options";
import apiDescription from "./api-description";

export default definePageConfig({
  blocks: [
    block.title("Switch"),
    block.paragraph("Switch component turns on or off the state of your custom option"),

    block.component('Playground'),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Default",
      description: "This is basic usage of switch component."
    }),
    block.example("Color", {
      title: "Color",
      description: "You can customize color."
    }),
    block.example("Label", {
      title: "Label",
      description: "Switch can be labeled on the left or on the right."
    }),
    block.example("CustomLabel", {
      title: "Custom Label",
      description: "You can label any state of switch."
    }),
    block.example("InnerLabel", {
      title: "Inner Label",
      description: "You may put a label inside of a switch."
    }),
    block.example("Size", {
      title: "Size",
      description: "Switches have 3 different sizes."
    }),
    block.example("State", {
      title: "State",
      description: "Switch can be in disabled or readonly state."
    }),
    block.example("Loading", {
      title: "Loading",
      description: "You can mark a pending state of switch."
    }),
    block.example("CustomValue", {
      title: "Custom Values",
      description: "You can set custom values for true and false state of the component."
    }),
    block.example("Indeterminate", { title: "Indeterminate" }),
    block.example("Error", {
      title: "Error",
      description: "Switch has an error style."
    }),

    block.subtitle("API"),
    block.api("VaSwitch", apiDescription, apiOptions),
  ],
});
