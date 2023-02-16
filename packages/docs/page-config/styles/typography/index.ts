export default definePageConfig({
  blocks: [
    block.title("typography.title"),
    block.paragraph("typography.description"),

    block.subtitle("typography.textStyles"),
    block.example("headings/heading1", { hideTitle: true }),
    block.example("headings/heading2", { hideTitle: true }),
    block.example("headings/heading3", { hideTitle: true }),
    block.example("headings/heading4", { hideTitle: true }),
    block.example("headings/heading5", { hideTitle: true }),
    block.example("headings/heading6", { hideTitle: true }),
    block.example("title", { hideTitle: true }),
    block.example("text/default", { hideTitle: true }),
    block.example("text/secondary", { hideTitle: true }),

    block.subtitle("typography.codeSnippet"),
    block.example("codeSnippet", { hideTitle: true }),
    block.example("textCode", { hideTitle: true }),
    block.alert("typography.codeSnippetWarn", "warning"),
    block.code("font"),

    block.subtitle("typography.list"),
    block.example("orderedList", { hideTitle: true }),
    block.example("unorderedList", { hideTitle: true }),

    block.subtitle("typography.links"),
    block.example("links", { hideTitle: true }),

    block.subtitle("typography.blockquote"),
    block.example("blockquote", { hideTitle: true }),

    block.subtitle("typography.textBlock"),
    block.example("textBlock", { hideTitle: true }),

    block.subtitle("typography.textHelpers"),
    block.example("text-helpers/alignment", { hideTitle: true }),
    block.example("text-helpers/truncate", { hideTitle: true }),
    block.example("text-helpers/transform", { hideTitle: true }),
  ],
});
