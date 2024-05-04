export default definePageConfig({
  meta: {
    title: "Installation",
    category: "getting-started",
  },

  blocks: [
    block.title("Installation"),
    block.paragraph("You can create a new project or integrate Vuestic UI into an existing application. There are three ways to create new Vuestic App. All of them mostly the same and provides the same features."),

    block.subtitle('Create Vuestic'),
    block.paragraph('`create-vuestic` is CLI based tool to create new Vuestic App. This is a recommended way to scaffold new Vue apps with Vuestic.'),
    block.code({
      npm: 'npm create vuestic@latest',
      yarn: 'yarn create vuestic',
    }, 'bash'),
    block.paragraph('`create-vuestic` provides three template: Vuestic Admin, create-vue and Nuxt. Templates can be configured to use specific features like tree-shaking or AG Grid theme.'),

    block.subtitle("Nuxt installation"),
    block.link('Visit nuxt integration page', '/getting-started/nuxt#manual-installation'),

    block.subtitle("Manual installation"),
    block.paragraph("If you decide to install Vuestic UI manually, all you need to do is to install a NPM package, a couple of other necessary assets (such as fonts and CSS styles) and slightly modify your application's entry point (most probably `index.js` or `main.js`, depending on your setup)."),
    block.paragraph("But first, make sure you've got all the following prerequisites installed:"),
    block.list(["[Node.js](https://nodejs.org/en/)[[target=_blank]] (>=v14.0.0)", "[npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)[[target=_blank]] (>=v3.0.0) (or [yarn](https://yarnpkg.com/lang/en/docs/install)[[target=_blank]] (>= v1.16.0)) and [Git](https://git-scm.com/)[[target=_blank]]"]),
    block.paragraph("After checking the prerequisites, install Vuestic UI via npm or yarn:"),
    block.code(
      {
        npm: "npm install vuestic-ui",
        yarn: "yarn add vuestic-ui",
      },
      "bash"
    ),

    block.headline("Assets installation"),
    block.paragraph("By default Vuestic UI uses `Source Sans Pro` and `Material Icons` fonts. You should manually add them into your project. In order to do so you can either:"),
    block.paragraph("include fonts directly in your `index.html`'s `<head>` element"),
    block.code("font-installation.html", "html"),
    block.paragraph("or include them in your CSS"),
    block.code("font-installation.scss", "css"),

    block.headline("Modify your application's entry point"),
    block.paragraph("Import both the styles and the plugin into your entry file. The plugin is used to automatically register all the components, directives and other stuff globally. If you don't want to register everything globally then check out the tree-shaking section below."),
    block.code("quick-start.ts"),
    block.headline("Usage with Tailwind"),
    block.paragraph('Projects using Tailwind need to import different CSS:'),
    block.code("tailwind-css-import.ts"),
    block.paragraph('`import \'vuestic-ui/css\'` adds few more styles in `reset.css` that may conflict with Tailwind which provides it\'s own reset.'),
    block.paragraph('For more information on usage with Tailwind see [Tailwind Integration](/styles/tailwind).'),

    block.headline("Migration guide"),

    // Follow migration guide order from newer to older
    block.collapse("v1.5 ➝ v1.6", [
      block.subtitle("Components"),
      block.headline("VaNavbar"),
      block.paragraph("* `center` slot was replaced with default one;\n * default (`center`) slot is now visible on mobiles."),
      block.headline("VaInnerLoading"),
      block.paragraph("CSS variables names were changed."),
      block.headline("VaScrollContainer"),
      block.paragraph("`size` prop acceptable values names were changed."),
      block.subtitle("Extensions"),
      block.headline("Ag Grid"),
      block.paragraph("Removed SCSS mixins for Vuestic UI theme customization."),
      block.subtitle("Styles"),
      block.paragraph("Vuestic UI grid helpers were deprecated. Use Tailwind CSS instead."),
    ]),
    block.collapse("v1.4 ➝ v1.5", [
      block.subtitle("Components"),
      block.headline("VaButton"),
      block.paragraph("* Button has been changed visually and its API changed too:\n* `flat` prop has been moved to `preset=\"secondary\"`.\n* Prop `rounded` renamed to `round` and is now `false` by default."),
      block.headline("VaCheckbox"),
      block.paragraph("Checkbox is now `inline-block` instead of `block`."),
      block.subtitle("Services"),
      block.headline("Colors"),
      block.alert("In `1.5.0` there are a lot of changes to support dark theme.", "info"),
      block.paragraph("* Color config is now extended with variables (where previous colors are stored);\n* `dark`, `white`, `background`, `gray` colors have been removed;\n* text color in components is calculated automatically, but you can force text to be `textDark` or `textLight`;\n* there are 4 types of background color now: `backgroundPrimary`, `backgroundSecondary`, `backgroundTertiary`, `backgroundElement`;\n* read more: [colors](https://vuestic.dev/styles/colors)[[target=_blank]]."),
      block.paragraph("* use `useTheme` instead of `useColors` - it has all the same methods."),
      block.subtitle("Styles"),
      block.paragraph("* All typography classes now have `va` prefix. For instance: link renamed to `va-link`, `text--right` renamed to `va-text-right`"),
      block.paragraph("* `display-1` has been renamed to `va-h1`, same for 2 to 6"),
    ]),

    block.subtitle("CodeSandbox"),
    block.component("OpenCodeSandbox"),
  ],
});
