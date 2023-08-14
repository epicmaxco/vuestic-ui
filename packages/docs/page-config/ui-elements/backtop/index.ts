import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Backtop"),
    block.paragraph("The backtop button is used to return to the top of a component."),

    block.subtitle("Examples"),
    block.example("Default", {
      title: "Basic usage",
      description: "By default `va-backtop` watches for a body element offset height. You can change a target element, positioning and scrolling speed."
    }),

    block.subtitle("Accessibility"),
    block.paragraph("The [aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label)[[target=_blank]] is set by `ariaLabel` prop, default to `back to top`. The component is the last element that recieves focus on the page."),

    block.subtitle("API"),
    block.api("VaBacktop", apiDescription, apiOptions),
  ],
});
