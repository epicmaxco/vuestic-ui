export default definePageConfig({
  blocks: [
    block.title("Menu List"),
    block.paragraph("The `VaMenuList` component is used to display structured information in selectable list format."),


    block.link("VaMenu", "/ui-elements/menu", { preText: "See " }),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Basic usage",
      description: "To show menu items you can use `options` prop:",
    }),
    block.example("MenuItem", {
      title: "Slot usage",
      description: "You can also use slot and VaMenuItem component to achieve better flexibility.",
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

    block.api("VaMenuList", {
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
