export default definePageConfig({
  blocks: [
    block.title("cssVariables.title"),
    block.paragraph("cssVariables.description"),

    block.component("convention"),

    block.list([
      "cssVariables.convention.list[0]",
      "cssVariables.convention.list[1]",
    ]),
    block.alert("cssVariables.convention.notice", "info"),

    block.example("profile", { forceShowCode: true, hideTemplate: true }),

    block.headline("cssVariables.overriding.title"),
    block.paragraph("cssVariables.overriding.description"),
    block.code("overriding"),
    block.component("global-overriding"),
  ],
});
