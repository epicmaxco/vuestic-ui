export default definePageConfig({
  blocks: [
    block.title("Menu"),
    block.paragraph("The `VaMenu` component is used to display structured information under the menu button."),

    block.link("VaMenuList", "/ui-elements/menu-list", { preText: "See " }),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Basic usage",
      description: "Required to have a anchor. Anchor can be anything, component will automatically listen for clicks, keyboard navigation and open/close menu. To show menu items you can use `options` prop or `VaMenuItem` component.",
    }),
    block.example("MenuItem"),

    block.example("Context", {
      title: "Context menu",
      description: "One of the most common use cases for `VaMenu` component is context menu. You can use `cursor` prop to enable context menu mode. In this mode menu will be opened on right click.",
    }),
    block.example("UseMenu", {
      title: "useMenu",
      description: "You can use `useMenu` hook to show menu programmatically.",
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

    block.api("VaMenu", {
      props: {
        textBy: 'When `options` prop items are an objects, this key will be used as displayed text. Can be string (path to the key) or function of type: `(option) => option.text`',
        valueBy: 'When `options` prop items are an objects, this key will be used in `selected` event. Can be string (path to the key) or function of type: `(option) => option.value`',
        trackBy: 'When `options` prop items are an objects, this key will be used to track selected `options`. Can be string (path to the key) or function of type: `(option) => option.track`',
        groupBy: 'When `options` prop items are an objects, this key will be used to check correct option group',
        disabledBy: "Specify the key in the object to be used as item `disabled` prop. Can be string (path to the key) or function of type: `(option) => option.disabled`",
        options: "Available options that the user can select from",
      },
      events: {
        selected: 'Emitted when an option is selected. Returns the selected option value as first argument and the selected option as second argument',
      }
    }),
  ],
})
