import { definePageConfig } from "~~/types/page-config";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("accessibilityGuide.title"),
    block.paragraph("accessibilityGuide.description"),

    block.subtitle("accessibilityGuide.keyboardInteractions.title"),
    block.paragraph("accessibilityGuide.keyboardInteractions.description"),
  ],
});
