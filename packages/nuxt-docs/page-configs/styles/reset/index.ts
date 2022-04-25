import { definePageConfig } from "~~/types/page-config";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("reset.title"),
    block.paragraph("reset.description"),

    block.subtitle("reset.features.title", 'h5'),
    block.paragraph("reset.features.info"),
    block.paragraph("reset.features.list"),
    block.paragraph("reset.features.more"),
  ],
});
