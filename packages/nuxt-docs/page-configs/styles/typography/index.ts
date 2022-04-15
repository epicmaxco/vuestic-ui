import { definePageConfig } from "~~/types/page-config";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("typography.title"),
    block.paragraph("typography.description"),

    block.subtitle("typography.headings"),
    block.example("headings"),

    block.subtitle("typography.titled"),
    block.example("title"),

    block.subtitle("typography.textStyles"),
    block.example("textStyles"),

    block.subtitle("typography.codeSnippet"),
    block.example("codeSnippet"),

    block.subtitle("typography.textCode"),
    block.example("textCode"),

    block.subtitle("typography.other"),

    block.subtitle("typography.orderedList"),
    block.example("orderedList"),

    block.subtitle("typography.unorderedList"),
    block.example("unorderedList"),

    block.subtitle("typography.links"),
    block.example("links"),

    block.subtitle("typography.textHighlighted"),
    block.example("textHighlighted"),

    block.subtitle("typography.blockquote"),
    block.example("blockquote"),

    block.subtitle("typography.textBlock"),
    block.example("textBlock"),
  ],
});
