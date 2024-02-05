import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Popover"),
    block.tags('popover', 'tooltip'),
    block.paragraph("A `va-popover` can be used to display some text on top of the component."),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Basic usage",
      description: "Wrap your component in a `va-popover` tag and provide a `message` property with text."
    }),
    block.example("Color", {
      title: "Color",
      description: "You can set different background colors to the component."
    }),
    block.example("Placement", {
      title: "Placement",
      description: "A component can be set in a different position. Use a position property to set it: `top`, `left`, `right` and `bottom` are available. [More about placements](/ui-elements/dropdown#placement-and-offset)"
    }),
    block.example("Icon", {
      title: "Icon",
      description: "You can set an icon to the component."
    }),
    block.example("Title", {
      title: "Title",
      description: "You can set a title to the popover."
    }),
    block.example("Trigger", {
      title: "Trigger",
      description: "Events triggering the popover separated with spaces: `hover`, `click` or `focus`."
    }),
    block.example("Slots", {
      title: "Slots usage",
      "description": "You can use `icon`, `title` and `body` slots to provide your own extra content into the popover component."
    }),

    block.subtitle("API"),
    block.api("VaPopover", apiDescription, apiOptions),
  ],
});
