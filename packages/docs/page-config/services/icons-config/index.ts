const columns = [
  "Prop",
  { title: "Type", type: "code" },
  { title: "Description", type: "markdown" },
];

const tableData = [
  ["class", "string | undefined", "Class that will be applied to the icon. Can be a string or a function that accepts dynamic segment value and returns a string."],
  ["content", "string | undefined", "Content that will be inside the icon. Can be a string or a function that accepts dynamic segment value and returns a string."],
  ["component", "`VueComponent | undefined`", "VueComponent that will be used instead of a tag."],
  [
    "attrs",
    "`Record<string, any> | undefined`",
    "Props that will be bound to `component`. Can be an object or a function that accepts dynamic segment value and returns an object.",
  ],
  ["to", "`string | undefined`", "Here you can define name of a config which values will be merged to this config"],
  ["tag", "`string | undefined`", "A tag to render icon with. By default - `i`"],
  ["color", "`string | undefined`", "Sets the CSS `color` property to a given value"],
  ["rotation", "`number | string | undefined`", "Rotates the icon by specified angle (in degrees)"],
  [
    "spin",
    "`'clockwise' | 'counter-clockwise' | undefined`",
    "Applies the spin animation to the icon",
  ],
];

export default definePageConfig({
  head: {
    link: [
      { rel: 'dns-prefetch', as: 'script', href: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js' },
      { rel: 'dns-prefetch', as: 'script', href: 'https://kit.fontawesome.com/5460c87b2a.js' },
    ],

    script: [
      { crossorigin: 'anonymous', src: 'https://kit.fontawesome.com/5460c87b2a.js' },
      { type: 'module', src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js' },
    ],
  },

  blocks: [
    block.title("Icons config"),
    block.paragraph("By default Vuestic UI uses [Material Design icons](https://fonts.google.com/icons)[[target=_blank]]. If that's too basic for you - vuestic has powerful icon config."),
    block.paragraph("Depending on icon library, they could use classes, ligatures or components. So you have to configure vuestic icons to work with your icon solution."),
    block.link("Find out more about the VaIcon component", "/ui-elements/icon"),

    // fonts
    block.subtitle("Fonts"),
    block.paragraph("We want to use the `<va-icon name='icon-name' />` pattern. We can setup a config for a specific icon name pattern. In that config we provide an icon class, attributes, tag, contents (innerHTML) or a Vue component relative to icon name."),

    block.headline("Font name pattern"),
    block.paragraph("Font name pattern is similar to vue dynamic routes. We can use dynamic segments to dynamically generate `IconConfig` in resolve function. Dynamic segments should be written in curly brackets."),

    block.headline("Interactive playground"),
    block.paragraph("Here you can see how your code will be transformed with different icon configs. You can change icon config params to see how it impact on final render. See our presets before play."),
    block.alert("By default Vuestic require only Material Icons. Other icon libraries you need to setup yourself.", "info"),
    block.component("playground"),

    // aliases
    block.subtitle("Aliases"),
    block.paragraph("To make code simpler we can use aliases. Alias has a `to` prop which would change the name of a given icon to the value of `to` and look for an appropriate font config. All the props from resolved font would be applied to that icon if they were not defined in alias config."),

    block.headline("Example aliases config"),
    block.code("alias-example"),

    block.headline("Vuestic component alises"),
    block.paragraph("We use some icons in our components by default. You can redefine them by changing it's alias."),
    block.component("icon-aliases"),

    // setup
    block.subtitle("Let's build our config"),
    block.paragraph("We need to update icons config in our global config. Icons config is a flat array with Vuestic default font and aliases. We can use the `createIconsConfig()` helper to create a new config with Vuestic defaults and our custom fonts and aliases merged together. For example:"),
    block.code("setup-example"),

    // api
    block.subtitle("IconConfig"),
    block.paragraph("You can use IconConfig properties in aliases, fonts and as return in resolve function."),
    block.table(columns, tableData),
  ],
});
