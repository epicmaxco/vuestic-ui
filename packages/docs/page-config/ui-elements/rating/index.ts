import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Rating"),
    block.paragraph("The `va-rating` component is a simple yet powerful element when it comes to gathering users feedback. Just in a few lines of code it can provide you with users ratings about your product or application."),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Default",
      description: "The `va-rating` component has a simple interface to collect user feedback."
    }),
    block.example("Color", {
      title: "Colors",
      description: "With `color` prop you can change the color of the component."
    }),
    block.example("Size", {
      title: "Sizes",
      description: "Using `size` prop specify custom size for an `va-rating` component."
    }),
    block.example("Hover", {
      title: "Hover",
      description: "By using `hover` prop you can see visual changes of value before click."
    }),
    block.example("Halves", {
      title: "Halves",
      description: "You can divide your `va-rating` component values on halves."
    }),
    block.example("Numbers", {
      title: "Numbers",
      description: "Want to see numbers instead of icons? We got you covered."
    }),
    block.example("CustomIcons", {
      title: "Custom Icons",
      description: "Providing this prop to component allows you to add custom icons."
    }),
    block.example("ItemSlot", {
      title: "Item slot",
      description: "You can pass own html to the component using `item` slot. We still handle user events and accessibility, but you can change appearance."
    }),
    block.example("Texts", {
      title: "Texts",
      description: "A component can be covered by different custom labels for each value."
    }),
    block.example("Clearable", {
      title: "Clearable",
      description: "Selecting current value again will clear the component."
    }),

    block.subtitle("API"),
    block.api("VaRating", apiDescription, apiOptions),

    block.subtitle("FAQ"),

    block.headline("Is rating component keyboard accessible?"),
    block.paragraph("Yes, you can use `Tab` `(Shift+Tab)` to move between icons and press Enter to submit value. Or you can use arrow keys (Left and Right) to change rating value"),

    block.headline("Can I use every other prop in combination with **numbers** prop?"),
    block.paragraph("Yes, all props are compatible between each other."),
  ],
});
