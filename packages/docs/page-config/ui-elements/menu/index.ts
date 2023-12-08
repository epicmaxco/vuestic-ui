import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Menu"),
    block.paragraph("The `VaMenu` component is used to display structured information under the menu button."),

    block.link("VaMenuList", "/ui-elements/menu-list", { preText: "See " }),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Basic usage",
      description: "Required to have a anchor. Component will automatically listen for clicks, keyboard navigation and open/close menu. Here's an example using `options` prop:",
    }),
    block.example("MenuItem", {
      title: "Slot usage",
      description: "You can also use slot and VaMenuItem component to achieve better flexibility.",
    }),

    block.example("Context", {
      title: "Context menu",
      description: "One of the most common use cases for `VaMenu` component is context menu. You can use `cursor` prop to enable context menu mode. In this mode menu will be opened on right click.",
    }),
    block.example("UseMenu", {
      title: "useMenu",
      description: "You can use `useMenu` hook to show menu programmatically. `useMenu` will listen for right click to show menu.",
    }),

    block.example("Icon", {
      title: "Icon",
      description: "You can use `icon `and `rightIcon` properties in options or `left-icon` and `right-icon` slots in `VaMenuItem` component.",
    }),

    block.example("Group", {
      title: "Group",
      description: "You can use `group` property in options or `VaMenuGroup` component.",
    }),

    block.example("WithDivider", {
      title: "With divider",
      description: "You can use `VaDivider` component in pair with `VaMenuItem` components.",
    }),

    block.api("VaMenu", apiDescription),
  ],
})
