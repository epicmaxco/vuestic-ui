import { definePageConfig } from "~~/types/page-config";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("roadmap.title"),
    block.paragraph("roadmap.description"),
    block.subtitle("roadmap.inDevelopment.title"),
    block.paragraph("roadmap.inDevelopment.description"),

    block.subtitle("roadmap.1-4.title", 'h5'),
    block.paragraph("roadmap.1-4.description"),

    block.subtitle("roadmap.released.title"),
    block.paragraph("roadmap.released.description"),

    block.subtitle("roadmap.1-3.title", 'h5'),
    block.paragraph("roadmap.1-3.description"),

    block.subtitle("roadmap.1-2.title", 'h5'),
    block.paragraph("roadmap.1-2.description"),

    block.subtitle("roadmap.1-1.title", 'h5'),
    block.paragraph("roadmap.1-1.description"),

    block.subtitle("roadmap.1-0.title", 'h5'),
    block.paragraph("roadmap.1-0.description"),

    block.subtitle("roadmap.0-1.title", 'h5'),
    block.paragraph("roadmap.0-1.description"),
  ],
});
