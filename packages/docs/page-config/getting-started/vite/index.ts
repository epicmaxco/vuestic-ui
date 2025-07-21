export default definePageConfig({
  meta: {
    title: "Nuxt",
    category: "getting-started",
  },

  blocks: [
    block.title("Vite integration"),
    block.paragraph("Vuestic UI is fully compatible with Vite. You can easily use Vuestic UI in your Vite-powered Vue 3 project."),

    block.subtitle("Scaffold new Vite app with Vuestic"),
    block.paragraph("The easiest way to create a new Vite project with integrated Vuestic UI is to use the `create-vuestic` CLI tool. Create a new project and select the `Vite` template."),
    block.link("See detailed guide here.", "/getting-started/installation#create-vuestic"),

    block.subtitle("Manual Installation"),
    block.paragraph("To manually integrate Vuestic UI into your existing Vite project, first install the library:"),
    block.code(
      {
        npm: "npm install vuestic-ui",
        yarn: "yarn add vuestic-ui",
      },
      "bash"
    ),

    block.paragraph("Then update your `main.ts` (or `main.js`) entry point to include Vuestic UI plugin and styles:"),
    block.code("vite-main-js"),

    block.paragraph("Don’t forget to include Vuestic’s default fonts. You can add them to `index.html` or import them in your styles:"),
    block.code("font-installation.html", "html"),
    block.code("font-installation.scss", "css"),

    block.subtitle("Tailwind integration"),
    block.paragraph("If you're using Tailwind CSS, be sure to import Vuestic UI styles carefully to avoid conflicts:"),
    block.code("tailwind-css-import.ts"),
    block.link("See more on Tailwind integration", "/styles/tailwind"),

    block.subtitle("Tree shaking"),
    block.paragraph("Vuestic UI supports tree-shaking out of the box. You can selectively import components to keep your bundle small. See [tree-shaking guide](/getting-started/installation#tree-shaking) for details."),

    block.subtitle("vuestic.config.ts"),
    block.paragraph("You can configure Vuestic UI globally by creating a `vuestic.config.ts` file and using `defineVuesticConfig` function. This allows you to customize component defaults, icons, colors, and more."),
    block.code("vuestic-config"),
    block.link("Read more about Icons Config", "/services/icons-config"),
  ],
})
