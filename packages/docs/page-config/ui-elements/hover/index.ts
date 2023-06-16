import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Hover"),
    block.paragraph("The `va-hover` component provides easy access to hover states for any component. To work with hover states you can use either `v-model` or slot-scoped `hover` property."),

    block.subtitle("Examples"),

    block.example("VModel", {
      title: "Default usage",
      description: "You can use `v-model` to get access to hover state."
    }),
    block.example("Slot", {
      title: "Slot based access",
      description: "You are also free to use Vue default slot."
    }),
    block.example("Disabled", {
      title: "Disabled",
      description: "Won't change value if disabled."
    }),

    block.subtitle("API"),
    block.api("VaHover", apiDescription, apiOptions),

    block.subtitle("FAQ"),
    block.headline("Can I wrap multiple elements with `va-hover`?"),
    block.paragraph("Yes, but they will share the hover state value."),
  ],
});
