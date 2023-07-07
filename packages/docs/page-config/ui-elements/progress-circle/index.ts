import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("Progress Circle"),
    block.paragraph("The `va-progress-circle` component is used to display an indicator of an app loading content. Also check the [va-progress-bar](/ui-elements/progress-bar) component."),

    block.subtitle("Examples"),
    block.example("Default", {
      title: "Default",
      description: "By default, the `va-progress-circle` displays a circular progress bar. Use the `value` prop to control the progress."
    }),
    block.example("Indeterminate", {
      title: "Indeterminate",
      description: "Use the `indeterminate` prop so that the `va-progress-circle` continuously animates."
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
    block.example("Thickness", {
      title: "Thickness",
      description: "Use the `thickness` prop to adjust the stroke size."
    }),

    block.subtitle("API"),
    block.api("VaProgressCircle", {
      props: {
        value: "The progress value",
        indeterminate: "Using the `indeterminate` prop, the `va-progress-circle` continues to  animate indefinitely.",
        thickness: "Circle border size between 0 and 1",
        ariaLabel: "The aria-label of the component"
      },
      slots: {
        default: "Display any additional info about the progress"
      }
    }, apiOptions),
  ],
});
