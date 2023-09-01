import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("Sidebar"),
    block.paragraph("`va-sidebar` is a column to store navigation or secondary information of your app."),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Default",
      description: "Default usage of `va-sidebar`"
    }),
    block.example("Programmatically", {
      title: "Sidebar items from config",
      description: "Usually you want to store sidebar items in config and render them programmatically. In example below you can learn how to conditionally render sidebar items using `VaAccordion`, `VaCollapse` and `VaSidebarItem` components."
    }),
    block.example("Minimized", {
      title: "Minimized",
      description: "You can minimize sidebar using `minimized` prop"
    }),
    block.example("Width", {
      title: "Width",
      description: "Define custom width of sidebar in maximixed state."
    }),
    block.example("MinimizedWidth", {
      title: "Minimized width",
      description: "Width of `va-sidebar` when minimized."
    }),
    block.example("Color", {
      title: "Color",
      description: "Change background color of a sidebar."
    }),
    block.example("Gradient", {
        title: "Gradient background",
        description: "You can make Navbar background gradient"
      }
    ),
    block.example("Position", {
      title: "Position",
      description: "Align `va-sidebar` to the left or right."
    }),
    block.example("Hoverable", {
      title: "Hoverable",
      description: "Manage your sidebar state using `hoverable` prop. It allows to expand 'va-sidebar' on hover."
    }),
    block.example("VModel", {
      title: "V-model",
      description: "Use v-model to enable/disable `va-sidebar`."
    }),

    block.subtitle("API"),
    block.api("VaSidebar", {
      props: {
        minimized: "Minimized state of sidebar.",
        hoverable: "Expand sidebar on hover.",
        position: "Position of `va-sidebar`, can be `right` or `left`.",
        width: "Width of component in maximized state.",
        minimizedWidth: "Width of component in minimized state.",
        value: "The current visibility state of `va-sidebar`.",
        animated: "Sets css `transition` to component",
        activeColor: "The color for active `VaSidebarItem` in the sidebar menu",
        hoverColor: "The color for hovered `VaSidebarItem` in the sidebar menu"
      }
    }, apiOptions),

    block.subtitle("FAQ"),
    block.headline("What if `minimized` conflicts with `hoverable`?"),
    block.paragraph("What if `minimized` conflicts with `hoverable`?"),
  ],
});
