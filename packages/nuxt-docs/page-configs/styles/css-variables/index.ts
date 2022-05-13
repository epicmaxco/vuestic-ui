import { definePageConfig } from "~~/types/page-config";
import { generalScheme, componentScheme, overriding } from "./code-examples";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("cssVariables.title"),
    block.paragraph("cssVariables.description"),

    block.subtitle("cssVariables.convention.title"),
    block.paragraph("cssVariables.convention.description"),
    block.code(generalScheme),
    block.code(componentScheme),

    block.subtitle("cssVariables.overriding.title"),
    block.paragraph("cssVariables.overriding.description"),
    block.code(overriding, "scss"),
  ],
});
