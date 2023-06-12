import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("Parallax"),
    block.paragraph("Parallax (`va-parallax`) is a component where the background image is moved at a different speed than the foreground content while scrolling."),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Default",
      description: "A block with a background image is displayed by default. You need to pass the `src` property."
    }),
    block.example("Custom", {
      title: "Custom height and speed",
      description: "You can adjust parallax `height` and scroll `speed`. Attention, the scrolling speed depends on the ratio of the parallax height to the image height."
    }),
    block.example("Reversed", {
      title: "Reversed",
      description: "You can flip the parallax scrolling."
    }),
    block.example("Slot", {
      title: "Slot",
      description: "You can provide some kind of content over the parallax."
    }),

    block.subtitle('Accessibility'),
    block.paragraph('Parallax effect is harmful to people with vestibular disorders and should be avoided or used with extreme caution and restraint. If you must use parallax, you should limit usage to one per page and decrease `height` and `speed` for each component.'),

    block.subtitle("API"),
    block.api("VaParallax", {
      props: {
        target: "The element relative to which the component is fixed",
        src: "URL to the image",
        alt: "Specifies an alternate description for an image",
        height: "Sets a height of the parallax",
        reversed: "Flips the parallax scrolling",
        speed: "Sets a speed of the parallax scrolling"
      },
      slots: {
        default: "For a content over the parallax"
      }
    }, apiOptions),
  ],
});
