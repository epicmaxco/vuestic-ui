import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("Progress Bar"),
    block.paragraph("The `va-progress-bar` component is used to display an indicator of an app loading content. Also check the [va-progress-circle](/ui-elements/progress-circle) component."),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Default",
      description: "By default, the `va-progress-bar` displays a horizontal progress bar. Use the `value` prop to control the progress."
    }),
    block.example("Indeterminate", {
      title: "Indeterminate",
      description: "Use the `indeterminate` prop so that the `va-progress-bar` continuously animates."
    }),
    block.example("Coloring", {
      title: "Coloring",
      description: "Use predefined colors or use your own with the `color` prop."
    }),
    block.example("Sizing", {
      title: "Sizing",
      description: "Use predefined sizes or use your own with the `size` prop."
    }),
    block.example("Slots", {
      title: "Slots",
      description: "There is also the default `slot` if you want to display some additional info about the progress."
    }),
    block.example("Buffer", {
      title: "Buffer",
      description: "When dealing with media content like streaming videos we can use progress bars to show the buffering progress indicator on a video."
    }),
    block.example("Max", {
      title: "Maximum value",
      description: "You can set maximum value for progress bar component"
    }),

    block.subtitle("Accessibility"),
    block.paragraph("The [role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles)[[target=_blank]] of the component is [progressbar](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/progressbar_role)[[target=_blank]], the [aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label)[[target=_blank]] of the component is `progress state`, if the value of the component is not indeterminate, [aria-valuenow](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-valuenow)[[target=_blank]] is set to the `modelValue` prop."),

    block.subtitle("API"),
    block.api("VaProgressBar", {
      props: {
        value: "The progress value",
        indeterminate: "Create a indeterminate loading bar",
        buffer: "Create a loading bar with a buffer. Commonly used in videos",
        reverse: "Reverse the progress bar direction",
        rounded: "Add a border radius to the `va-progress-bar` component (default: true)",
        contentInside: "Sets the content of the slot inside the progress bar",
        showPercent: "Shows the indicator value with a percent sign",
        max: "Maximum value",
        ariaLabel: "The aria-label of the component"
      },
      slots: {
        default: "Display any additional info about the progress"
      }
    }, apiOptions),
  ],
});
