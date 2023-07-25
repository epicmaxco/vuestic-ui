export default definePageConfig({
  blocks: [
    block.title("Requirements for Treeshaking"),
    block.paragraph("This page for contributors describes the basic rules and restrictions that need to be taken into account when developing for correct work Treeshaking."),

    block.subtitle("How TreeShaking works"),
    block.paragraph("We made several build formats:"),
    block.list([
      "esm - used for tree-shaking",
      "esm-ssr - also used for tree-shaking, but uses `@vue/server-side-renderer`.",
      "iife - used by browsers, can be included to page without bundler.",
      "cjs - used for bundlers that use CommonJS (e.g. node) format instead of ESM",
      "styles - SCSS utils, that is not required for components."
    ]),
    block.alert("We use Webpack for local development and rollup for build, so we have a special package to test this two things - bundlers-tests", "primary"),

    block.subtitle("Requirements and rules"),
    block.paragraph("We need to use ES module (esm format) and Named Exports (`export { something }` instead of `export default something`). Export default breaks tree shaking for imported file. It will fully loaded by bundler."),
    block.paragraph("TreeShaking works only with node modules, that is written in esm format. For example, we use `lodash-es` instead of `lodash`. That way we compile only functional we need instead of full library."),
    block.paragraph("Before release check dist with `bundlers-tests`. We need to check build with Webpack, Vite (Rollup) because vuestic-ui can work different for this two."),
  ],
});
