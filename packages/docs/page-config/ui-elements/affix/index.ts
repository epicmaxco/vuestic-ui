import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("Affix"),
    block.paragraph("The affix component is created to fix any content in a proper position relative to a container."),

    block.subtitle("Examples"),
    block.example("Top", { title: "Fixed at the top" }),
    block.example("Bottom", { title: "Fixed at the bottom" }),
    block.example("Default", { title: "Fixes element relative to custom container" }),

    block.subtitle("API"),
    block.api("VaAffix",{
      props: {
        offsetTop: "Distance from the top of target element to the top of affixed element.",
        offsetBottom: "Distance from the bottom of target element to the bottom of affixed element.",
        target: "The element relative to which the component is fixed."
      },
      events: {
        change: "Emits affixed state on its' change."
      }
    }, apiOptions),
  ],
});
