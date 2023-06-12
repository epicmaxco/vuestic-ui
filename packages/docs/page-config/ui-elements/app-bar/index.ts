import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("App bar"),
    block.paragraph("The app bar component is a part of a website’s navigation and it’s an alternative to the header element in apps."),
    block.subtitle("Examples"),
    block.example("Default", {
      title: "Basic usage",
      description: "By default, a `va-app-bar` needs a parent element with relative position."
    }),
    block.example("Color", {
      title: "Color",
      description: "You can set a background color and gradient of the component with `color` and `gradient` props."
    }),
    block.example("Fixed", {
      title: "Fixed",
      description: "You can make app bar position fixed via `fixed` prop."
    }),
    block.example("Hide", {
      title: "Hide",
      description: "`hide-on-scroll` allows you to hide app bar when you scroll away. You need to define `target`."
    }),
    block.example("Shadow", {
      title: "Shadow",
      description: "You can set a shadow with `shadow-on-scroll` prop. You need to define `target`."
    }),

    block.subtitle("API"),
    block.api("VaAppBar", {
      props: {
        gradient: "Applies gradient style to background.",
        shadowOnScroll: "Applies box-shadow to the component when scrolling target.",
        shadowColor: "Sets color to the box-shadow.",
        target: "Target for scrolling.",
        fixed: "Switches component position to `fixed`."
      },
      slots: {
        default: "Slot for app-bar content"
      }
    }, apiOptions),
  ],
});
