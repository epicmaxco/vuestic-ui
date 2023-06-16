export default definePageConfig({
  meta: {
    title: "configurationGuide.title",
    category: "getting-started",
    // description: 'configurationGuide.description'
  },

  blocks: [
    block.title("Configuration"),
    block.paragraph("Vuestic UI comes with a convenient mechanism that allows for a deep icons, components, and colors customization."),
    block.subtitle("Color themes"),
    block.paragraph("You can easily modify the colors used by Vuestic UI components (and even add custom ones):"),
    block.code("colors-config"),
    block.link("More on this topic", "/services/colors-config"),

    block.subtitle("Icon fonts"),
    block.paragraph("By default Vuestic UI uses **material icons**, so make sure to install the package:"),
    block.code(
      {
        yarn: "yarn add material-design-icons-iconfont -D",
        npm: "npm install material-design-icons-iconfont -D",
      },
      "bash"
    ),
    block.paragraph("After installing the **material icons** package, you need to import its styles into the `main.js` file."),
    block.code("icons-setup.ts"),

    block.headline("Using custom icons"),
    block.paragraph("With icons config you can use any icon font you'd like by simply transforming the icon names to respective props."),
    block.code("icons-config.mjs"),
    block.link("More on this topic", "/services/icons-config"),

    block.subtitle('Custom classes for the colors'),
    block.paragraph('By default, Vuestic UI creates custom classes for coloring the text and background colors of elements relative to the global color configuration.'),

    block.headline('Configuring the custom classes'),
    block.paragraph('With custom classes configuration you can create and/or use classes with styles associated with the global color configuration'),
    block.code('color-classes'),
    block.link('More on this topic', '/services/colors-classes'),


    block.subtitle("Components config"),
    block.paragraph("If you want to set global defaults for Vuestic components or create presets — we have config for this as well!"),
    block.paragraph("Let’s say you want all of your buttons to be `outline` and `small` to match your design, but by default that's not the case:"),
    block.example("PageConfigButtonDefault", { hideCode: true, hideTitle: true }),
    block.paragraph("To solve that problem edit to `main.js` file the following way:"),
    block.code("components-config.mjs"),
    block.paragraph("Now all of your buttons by default will look like this:"),
    block.example("PageConfigButton", { hideCode: true, hideTitle: true }),
    block.paragraph("You can configure any prop for any Vuestic UI component in such a manner."),
    block.paragraph("In case your customization runs deeper consider [overriding CSS variables](/styles/css-variables#overriding) or even directly the `.class`' properties (components use BEM-notation so it should be easy to figure out which selector to address with the help of standard dev-tooling)."),
    block.link("More on this topic", "/services/components-config"),
  ],
});
