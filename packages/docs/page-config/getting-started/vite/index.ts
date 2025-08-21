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

    block.subtitle("Installation"),
    block.paragraph("If you need to integrate Vuestic UI into your existing Vite project, first install the library:"),
    block.code(
      {
        npm: "npm install @vuestic/compiler vuestic-ui",
        yarn: "yarn add @vuestic/compiler vuestic-ui",
        pnpm: "pnpm add @vuestic/compiler vuestic-ui",
        bun: "bun add @vuestic/compiler vuestic-ui",
      },
      "bash"
    ),

    block.paragraph("Then, you need to configure Vite to use the Vuestic compiler. Import `vuestic` from `@vuestic/compiler/vite` in your `vite.config.ts` file and add it to the plugins array. Here's an example of a basic Vite configuration with Vuestic compiler:"),
    block.code("vite-config"),

    block.subtitle("Compiler options"),
    block.paragraph("Vuestic compiler provides several options to customize its behavior. You can configure these options in your `vite.config.ts` file. Here are the available options:"),
    block.list([
      'Config - use `vuestic.config.ts` for better type support and configuration. Set to `true` by default.',
      'Auto import - Vuestic UI components are automatically imported when used in templates. Set to `false` by default.',
      'Css layers - adds Vuestic UI CSS layers to control the order of styles in the final bundle. Set to `false` by default. Turns on by if `tailwindcss` package detected.',
      'Devtools - enables Vuestic UI devtools for better debugging and development experience. Set to `false` by default.',
    ]),

    block.subtitle("vuestic.config.ts"),
    block.paragraph("You can configure Vuestic UI globally by creating a `vuestic.config.ts` file and using `defineVuesticConfig` function. This allows you to customize component defaults, icons, colors, and more."),
    block.code("vuestic-config"),
    block.link("Read more about Icons Config", "/services/icons-config"),

    block.subtitle("Typescript"),
    block.paragraph("Vuestic UI is written in TypeScript, providing type definitions for all components and utilities. This allows you to take full advantage of TypeScript's features, such as autocompletion and type checking."),

    block.paragraph("To ensure TypeScript recognizes Vuestic UI components, you may need to add the following to your `env.d.ts` file:"),

    block.code(`/// <reference types=".vuestic" />`, 'ts'),
  ],
})
