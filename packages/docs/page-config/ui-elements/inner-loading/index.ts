import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("Inner Loading"),
    block.paragraph("You can handle the loading state of the wrapped component by using the `va-inner-loading` component."),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Basic usage",
      description: "By default wrap a component in `va-inner-loading` with a `loading` property."
    }),
    block.example("Color", {
      title: "Color",
      description: "You can change the color of the icon."
    }),
    block.example("Size", {
      title: "Size",
      description: "Supports the ability to resize the icon."
    }),
    block.example("Icon", {
      title: "Icon",
      description: "You can change the loading icon."
    }),


    block.subtitle('Accessibility'),
    block.paragraph('The component has the [aria-live=\"polite\"](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)[[target=_blank]] and [aria-busy](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-busy)[[target=_blank]] attributes. It blocks any interaction with the content until the loading state is disabled.'),

    block.subtitle("API"),
    block.api("VaInnerLoading", {
      slots: { default: "Slot for the component to which you want to apply loading styles" }
    }, apiOptions),
  ],
});
