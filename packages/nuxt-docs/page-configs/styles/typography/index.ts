import { definePageConfig } from "~~/types/page-config";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("typography.title"),
    block.paragraph("typography.description"),

    block.subtitle("typography.headings"),
    block.example("headings"),

    block.subtitle("typography.titled", 'h5'),
    block.example("title"),

    block.subtitle("typography.textStyles", 'h5'),
    block.example("textStyles"),

    block.subtitle("typography.codeSnippet", 'h5'),
    block.example("codeSnippet"),

    block.subtitle("typography.textCode", 'h5'),
    block.example("textCode"),

    block.subtitle("typography.other", 'h5'),

    block.subtitle("typography.orderedList", 'h5'),
    block.example("orderedList"),

    block.subtitle("typography.unorderedList", 'h5'),
    block.example("unorderedList"),

    block.subtitle("typography.links", 'h5'),
    block.example("links"),

    block.subtitle("typography.textHighlighted", 'h5'),
    block.example("textHighlighted"),

    block.subtitle("typography.blockquote", 'h5'),
    block.example("blockquote"),

    block.subtitle("typography.textBlock", 'h5'),
    block.example("textBlock"),
  ],
});
