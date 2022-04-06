import { definePageConfig } from "~~/types/page-config";
import {
  installation,
  quickStart,
  fontInstallationCSS,
  fontInstallationHTML,
  cliPrepare,
  treeShakingExample,
  treeShakingPluginExample,
} from "./code-examples";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("installation.title"),
    block.paragraph("installation.description"),

    block.subtitle("installation.cli.title"),
    block.paragraph("installation.cli.description"),
    block.alert("installation.cli.attention", "warning"),
    block.paragraph("installation.cli.prepare"),
    block.code(cliPrepare, "bash"),
    block.paragraph("installation.cli.upgrade"),
    block.paragraph("installation.cli.codeAnnotation"),
    block.code("vue add vuestic-ui", "bash"),

    block.subtitle("installation.manual.title"),
    block.paragraph("installation.manual.subtitle"),
    block.paragraph("installation.manual.prerequisites"),
    block.list(["installation.manual.node", "installation.manual.npm"]),
    block.paragraph("installation.manual.afterCheck"),
    block.code(installation, "bash"),

    block.subtitle("installation.fonts.title"),
    block.paragraph("installation.fonts.description"),
    block.paragraph("installation.fonts.htmlExampleTitle"),
    block.code(fontInstallationHTML, "html"),
    block.paragraph("installation.fonts.cssExampleTitle"),
    block.code(fontInstallationCSS),

    block.subtitle("installation.quickStart.title"),
    block.paragraph("installation.quickStart.description"),
    block.code(quickStart),

    block.subtitle("installation.codesandbox.title"),
    block.component("OpenCodeSandbox"),

    block.subtitle("installation.treeShaking.title"),
    block.paragraph("installation.treeShaking.description"),

    block.paragraph("installation.treeShaking.example.title"),
    block.code(treeShakingExample),
    block.paragraph("installation.treeShaking.example.footer"),

    block.paragraph("installation.treeShaking.plugins.title"),
    block.list([
      "installation.treeShaking.plugins.GlobalConfigPlugin",
      "installation.treeShaking.plugins.ColorHelpersPlugin",
      "installation.treeShaking.plugins.ToastInstall",
      "installation.treeShaking.plugins.DropdownPopperSubplugin",
    ]),

    block.paragraph("installation.treeShaking.plugins.example.title"),
    block.code(treeShakingPluginExample),

    block.alert("installation.treeShaking.attention.cssLoader", "info"),
  ],
});
