import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Tabs"),
    block.paragraph("The `va-tabs` component can be used as an on-page navigation offering with a rich variety of visual customizations and usage flexibility."),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Default usage",
      description: "By default it's displayed as a horizontal list of `va-tab` items"
    }),
    block.example("Pagination", {
      title: "With pagination arrows",
      description: "When wrapper width is less then tabs width, pagination arrows are shown"
    }),
    block.example("Vertical", {
      title: "Vertical alignment",
      description: "By using `vertical` prop alignment of `va-tabs` can be customized"
    }),
    block.example("Color", {
      title: "Color",
      description: "Set different colors using the `color` prop. You can either use a theme string or the HEX color value. Inactive tabs have `inherit` color. If you need to change inactive tabs color, you can set color for va-tabs using CSS."
    }),
    block.example("Stateful", {
      title: "Without value",
      description: "Sometimes `v-model` is too much and in that case using `stateful` prop you can delegate state handling to the component itself"
    }),
    block.example("Content", {
      title: "Content",
      description: "Tabs with a custom content in the default slot."
    }),

    block.subtitle("API"),
    block.api("VaTabs", apiDescription, apiOptions),

    block.subtitle("FAQ"),
    block.headline("How can I map content to tabs so that only specific tab content will be displayed?"),
    block.paragraph("We have this functionality in our nearest plans, but for now you could use `v-model` value to map the content yourself"),
  ],
});
