import bundleSizeData from "./tree-shaking.md?raw";

export default definePageConfig({
  meta: {
    title: "Tree shaking",
    category: "getting-started",
  },

  blocks: [
    block.title("Tree shaking"),
    block.paragraph("If you plan to use only several components in your application and thus reduce the size of your bundle, you can use the Vuestic ESM build. Webpack (vue-cli) and Vite do that automatically."),

    block.paragraph("First, you don't need to use `createVuestic` since it registers all the `vuestic` components globally. We have `createVuesticEssential` instead, which register only essential plugins. You can specify components to declare globally. Or you can import them later."),
    block.code("tree-shaking"),
    block.paragraph("You can also specify Vuestic subplugins as `plugins` option. "),

    block.paragraph("Here is a list of plugins that you can use with Vuestic:"),
    block.list([
      "GlobalConfigPlugin (essential) - used for `VaConfig` component and global props reassignment. [Read more](/services/global-config).",
      "ColorHelpersPlugin (essential) - used to create reactive CSS variables. Requires `GlobalConfigPlugin`. [Read more](/services/colors-config).",
      "VaToastPlugin - provides methods for creating Toasts within vue context. [Read more](/ui-elements/toast)",
      "VaModalPlugin - provides method for creating Modal within vue context. [Read more](/ui-elements/modal)",
      "VaDropdownPlugin - provides methods for dropdown closing within vue context. `VaDropdown` is used in `VaSelect`, `VaTimeInput`, `VaDateInput`, `VaButtonDropdown` component.",
    ]),

    block.subtitle("CSS Code Split"),
    block.paragraph("We separated our CSS into modules: `essential`, `typography`, `grid` and `reset`. Instead of import `vuestic/css` you can import `vuestic/styles/essential.css` - module without typography, grid and normalize. This is usually need if you already using some CSS framework to prevent style conflicts."),
    block.code("css-code-split"),

    block.subtitle("Bundle Size"),
    block.paragraph("Statistics of the space occupied in the project bundle (without gzip):"),
    block.markdown(bundleSizeData),
  ],
});
