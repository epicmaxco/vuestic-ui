import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("Navbar"),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Default",
      description: "You can use left, center and right slots to pass items to navbar. "
    }),
    block.example("Colors", {
      title: "Colors",
      description: "By default navbar uses `secondary` color. You can pass `color` props to change navbar background color. Also, description color depends on navbar background color. But you can pass own color if you want."
    }),
    block.example("Height", { title: "Height" }),
    block.example("Shape", {
      title: "Shape",
      description: "You can add the shape to navbar background. Shape color will be taken automatic from `color` prop."
    }),

    block.subtitle("API"),
    block.api("VaNavbar", {
      props: {
        shape: "If true, shape will be drawn at navbar background.",
        fixed: "Switches component position to `fixed`."
      },
      slots: {
        left: "Place VaNavbar items on the left",
        default: "Place VaNavbar items on the center (default)",
        right: "Place VaNavbar items on the right"
      },
    }, apiOptions),
  ],
});
