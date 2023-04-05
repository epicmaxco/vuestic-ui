export default definePageConfig({
  meta: {
    title: "Installation",
    category: "getting-started",
  },

  blocks: [
    block.title("installation.title"),
    block.paragraph("installation.description"),

    block.subtitle('installation.createVuestic.title'),
    block.paragraph('installation.createVuestic.description'),
    block.code({
      npm: 'npm create vuestic@latest',
      yarn: 'yarn create vuestic',
    }, 'bash'),
    block.paragraph('installation.createVuestic.templates'),

    block.subtitle("installation.cli.title"),
    block.paragraph("installation.cli.description"),
    block.alert("installation.cli.attention", "warning"),
    block.paragraph("installation.cli.prepare"),
    block.code("cli", "bash"),
    block.paragraph("installation.cli.upgrade"),
    block.paragraph("installation.cli.codeAnnotation"),
    block.code("vue add vuestic-ui", "bash"),

    block.subtitle("installation.manual.title"),
    block.paragraph("installation.manual.subtitle"),
    block.paragraph("installation.manual.prerequisites"),
    block.list(["installation.manual.node", "installation.manual.npm"]),
    block.paragraph("installation.manual.afterCheck"),
    block.code(
      {
        npm: "npm install vuestic-ui",
        yarn: "yarn add vuestic-ui",
      },
      "bash"
    ),

    block.headline("installation.fonts.title"),
    block.paragraph("installation.fonts.description"),
    block.paragraph("installation.fonts.htmlExampleTitle"),
    block.code("font-installation.html", "html"),
    block.paragraph("installation.fonts.cssExampleTitle"),
    block.code("font-installation.scss", "css"),

    block.headline("installation.quickStart.title"),
    block.paragraph("installation.quickStart.description"),
    block.code("quick-start.ts"),

    block.headline("installation.migrationGuide.title"),

    // Follow migration guide order from newer to older
    block.collapse("v1.5 ➝ v1.6", [
      block.subtitle("installation.migrationGuide.1_6.components"),
      block.headline("VaNavbar"),
      block.paragraph("installation.migrationGuide.1_6.navbar"),
      block.headline("VaInnerLoading"),
      block.paragraph("installation.migrationGuide.1_6.innerLoading"),
      block.headline("VaScrollContainer"),
      block.paragraph("installation.migrationGuide.1_6.scrollContainer"),
      block.subtitle("installation.migrationGuide.1_6.extensions"),
      block.headline("installation.migrationGuide.1_6.aggrid_0"),
      block.paragraph("installation.migrationGuide.1_6.aggrid_1"),
      block.subtitle("installation.migrationGuide.1_6.styles"),
      block.paragraph("installation.migrationGuide.1_6.grid"),
    ]),
    block.collapse("v1.4 ➝ v1.5", [
      block.subtitle("installation.migrationGuide.1_5.components"),
      block.headline("VaButton"),
      block.paragraph("installation.migrationGuide.1_5.button"),
      block.headline("VaCheckbox"),
      block.paragraph("installation.migrationGuide.1_5.checkbox"),
      block.subtitle("installation.migrationGuide.1_5.services"),
      block.headline("installation.migrationGuide.1_5.colors"),
      block.alert("installation.migrationGuide.1_5.colors_0", "info"),
      block.paragraph("installation.migrationGuide.1_5.colors_1"),
      block.paragraph("installation.migrationGuide.1_5.colors_2"),
      block.subtitle("installation.migrationGuide.1_5.styles"),
      block.paragraph("installation.migrationGuide.1_5.stylesDescription"),
      block.paragraph("installation.migrationGuide.1_5.typography_1"),
    ]),

    block.subtitle("installation.codesandbox.title"),
    block.component("OpenCodeSandbox"),
  ],
});
