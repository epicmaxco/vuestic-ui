export default definePageConfig({
  blocks: [
    block.title("Tailwind CSS Support"),
    block.paragraph("We recommend our users to use [Tailwind CSS](https://tailwindcss.com/)[[target=_blank]] as the most convenient and modern solution to the CSS helpers issue."),

    block.alert("CSS helpers and the CSS reset file will remain in the Vuestic UI bundle until version 1.7.0, after which they will be permanently removed.", "warning", true),

    block.headline("Preparations"),
    block.paragraph("Before we start with integration - please ensure you have both Tailwind CSS and Vuestic UI installed. If that's not the case - here are installation guide for [Vuestic UI](/getting-started/installation) and for [Tailwind CSS](https://tailwindcss.com/docs/installation/using-postcss)[[target=_blank]]."),

    block.headline("Syncing configs"),
    block.paragraph("To create a tight bind between Vuestic with Tailwind we have a `@vuestic/tailwind` package: it syncs [breakpoint](/services/breakpoints)[[target=_blank]] and [color](/services/colors-config)[[target=_blank]] settings. You can sync from Vuestic UI to Tailwind or backwards!"),

    block.paragraph("Here's what you have to do to make it work:"),

    block.paragraph("1.&nbsp;Install this package:"),
    block.code({
      npm: "npm install @vuestic/tailwind",
      yarn: "yarn add @vuestic/tailwind"
    }, "bash"),

    block.paragraph("2.&nbsp;After installation, three commands become available to you:"),
    block.paragraph("`npx sync-tailwind-with-vuestic` - formats and transfers the color and breakpoints settings from the `tailwind.config.*` file (and in its absence, it uses the default Tailwind CSS configuration) to the root file `vuestic.config.js` (also added by this command);"),
    block.paragraph("`npx watch-tailwind` - watches `tailwind.config.*` in background and synchronizes the Vuestic UI configuration on the fly;"),
    block.paragraph("`npx sync-vuestic-with-tailwind` - transfers color and breakpoint settings from default Vuestic UI config to the Tailwind's configuration file (`tailwind.config.cjs`)."),

    block.alert("We're not overriding Tailwind CSS settings, but extending them.", "primary"),

    block.paragraph("3A.&nbsp;`[Tailwind CSS -> Vuestic UI]` import the `config` configuration in your `main.*` and specify it when initializing the application:"),
    block.code("configuringFull"),

    block.paragraph("Also, you may want to synchronize the configuration partially (in the example - only Tailwind CSS colors will be taken):"),
    block.code("configuringPartial"),

    block.paragraph("3B.&nbsp;`[Vuestic UI -> Tailwind CSS]` Nothing more is needed."),

    block.paragraph("4A.&nbsp;`[Tailwind CSS -> Vuestic UI]` As a result you will be able to use Tailwind colors and breakpoints setting in Vuestic. For example, the result of synchronization default Tailwind settings will be a Vuestic settings file:"),
    block.code("configExample"),

    block.paragraph("4B.&nbsp;`[Vuestic UI -> Tailwind CSS]` Vuestic UI setting will be available in the Tailwind CSS scope. Output format follows the requirements, located [here](https://tailwindcss.com/docs/screens#adding-larger-breakpoints)[[target=_blank]] and [here](https://tailwindcss.com/docs/screens#adding-larger-breakpoints)[[target=_blank]].")
  ]
});
