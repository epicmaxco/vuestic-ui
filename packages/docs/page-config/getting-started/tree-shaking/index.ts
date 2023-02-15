// import bundleSizeData from './tree-shaking.md'

export default definePageConfig({
  meta: {
    title: "Tree shaking",
    category: "getting-started",
  },

  blocks: [
    block.title("treeShaking.title"),
    block.paragraph("treeShaking.description"),

    block.paragraph("treeShaking.example.title"),
    block.code("tree-shaking"),
    block.paragraph("treeShaking.example.footer"),

    block.paragraph("treeShaking.plugins.title"),
    block.list([
      "treeShaking.plugins.GlobalConfigPlugin",
      "treeShaking.plugins.ColorHelpersPlugin",
      "treeShaking.plugins.VaToastPlugin",
      "treeShaking.plugins.VaModalPlugin",
      "treeShaking.plugins.VaDropdownPlugin",
    ]),

    block.subtitle("treeShaking.css.title"),
    block.paragraph("treeShaking.css.description"),
    block.code("css-code-split"),

    block.subtitle("treeShaking.bundleSize.title"),
    block.paragraph("treeShaking.bundleSize.description"),
    // block.markdown(bundleSizeData),
  ],
});
