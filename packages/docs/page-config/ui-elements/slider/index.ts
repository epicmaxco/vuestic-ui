import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Slider"),
    block.paragraph("The slider component is a visualization for the number input. A user can drag a slider within a fixed range to get the required value."),

    block.component("Playground"),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Default",
      description: "This is basic usage of the slider component."
    }),
    block.example("Color", {
      title: "Color",
      description: "You can customize the color of the slider."
    }),
    block.example("MinMax", {
      title: "Minimum and maximum values",
      description: "You can set a range between min and max values."
    }),
    block.example("State", {
      title: "State",
      description: "Slider can be in disabled or readonly state."
    }),
    block.example("Range", {
      title: "Range slider",
      description: "You can set a range of values."
    }),
    block.example("Step", {
      title: "Step",
      description: "Step can be changed."
    }),
    block.example("Pins", {
      title: "Pins",
      description: "Display markers on slider track."
    }),
    block.example("Label", {
      title: "Label",
      description: "Switch label can have an inverted position or a custom color."
    }),
    block.example("Slots", {
      title: "Slots",
      description: "You can add inputs before and after the slider using 'append' or 'prepend' slot name. Also default label can be replaced using 'label' slot."
    }),
    block.example("Icon", {
      title: "Icon",
      description: "You can insert icon at the start or end of slider."
    }),
    block.example("Track", {
      title: "Track",
      description: "Track can be hidden or have custom color."
    }),
    block.example("TrackLabel", {
      title: "Track label",
      description: "You can show track label and overwrite it's view."
    }),
    block.example("Vertical", {
      title: "Vertical",
      description: "Vertical state of slider."
    }),

    block.subtitle('Accessibility'),
    block.paragraph('The component covers all the requirements of [w3 slider template](https://www.w3.org/WAI/ARIA/apg/patterns/slider/#wai-ariaroles,states,andproperties)[[target=_blank]]. It has [role=\"slider\"](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/slider_role)[[target=_blank]] and the following attributes: [aria-valuemin](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-valuemin)[[target=_blank]], [aria-valuemax](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-valuemax)[[target=_blank]], [aria-valuenow](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-valuenow)[[target=_blank]], [aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label)[[target=_blank]], [aria-orientation](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-orientation)[[target=_blank]], [aria-disabled](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled)[[target=_blank]], [aria-readonly](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-readonly)[[target=_blank]].'),

    block.subtitle("API"),
    block.api("VaSlider", apiDescription, apiOptions),
  ],
});
