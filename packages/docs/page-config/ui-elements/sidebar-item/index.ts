import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("Sidebar item"),
    block.paragraph("Used as link in your `VaSidebar`."),

    block.subtitle("Examples"),

    block.example("Simple", {
      title: "Simple usage example",
      description: "`VaSidebarItem` is used with `VaSidebarContent` (to create paddings) and `VaSidebarTitle` (to fill all remaining width in `VaSidebarItem`)"
    }),
    block.example("Colors", {
      title: "Colors",
      description: "You can change sidebar default colors"
    }),
    block.example("Active", {
      title: "Highlight active `VaSidebarItem`",
      description: "It is possible to have multiple `VaSidebarItem` highlighted. You can choose your own way to highlight an active item. Even if you want to activate a few `VaSidebarItems`."
    }),
    block.example("Icons", {
      title: "`VaSidebarTitle` and VaIcons",
      description: "`VaSidebarTitle` used to fill all remaining free space in `VaSidebarItem`. We can also add any other components (like `VaIcon`, `VaChip` or `VaButton`)."
    }),
    block.example("Components", {
      title: "Advanced case with `VaAccordion`",
      description: "`VaSidebarItem` can be used with `VaAccordion` and `VaCollapses`."
    }),

    block.subtitle("API"),
    block.api("VaSidebarItem", {
      props: {
        activeColor: "Used to set accent color for active `VaSidebarItem`",
        hoverColor: "Used to set accent color for hovered `VaSidebarItem`",
        hoverOpacity: "Used to set opacity of the color for hovered `VaSidebarItem`",
        active: "If `true` this sidebar item will be highlighted"
      },
    }, apiOptions),
  ],
});
