import { definePageConfig } from "~~/types/page-config";
import { scheme } from "./code-examples";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("colors.title"),
    block.paragraph("colors.description"),
    block.example("CustomAlert"),
    block.subtitle("colors.syntax.title"),
    block.paragraph("colors.syntax.description"),
    block.code(scheme),
    block.paragraph("colors.syntax.colorsUsed"),
    block.subtitle("colors.defaultColorThemes.title"),
    block.paragraph("colors.defaultColorThemes.description"),
    block.example("DefaultColors", { hideCode: true }),
    block.subtitle("colors.reactivity.subtitle"),
    block.paragraph("colors.reactivity.about"),
    block.paragraph("colors.reactivity.additional"),
  ],
});
