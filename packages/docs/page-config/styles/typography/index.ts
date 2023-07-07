export default definePageConfig({
  blocks: [
    block.title("Typography"),
    block.paragraph("To improve your application's UX, make sure to style the typography the way that would match the rest of the Vuestic-UI-based look and feel."),

    block.subtitle("Text styles"),
    block.example("headings/heading1", { hideTitle: true }),
    block.example("headings/heading2", { hideTitle: true }),
    block.example("headings/heading3", { hideTitle: true }),
    block.example("headings/heading4", { hideTitle: true }),
    block.example("headings/heading5", { hideTitle: true }),
    block.example("headings/heading6", { hideTitle: true }),
    block.example("title", { hideTitle: true }),
    block.example("text/default", { hideTitle: true }),
    block.example("text/secondary", { hideTitle: true }),

    block.subtitle("Code snippet"),
    block.example("codeSnippet", { hideTitle: true }),
    block.example("textCode", { hideTitle: true }),
    block.alert("You need to install `Source Code Pro` font if you want to use `.code-snippet` class", "warning"),
    block.code("font"),

    block.subtitle("List styles"),
    block.example("orderedList", { hideTitle: true }),
    block.example("unorderedList", { hideTitle: true }),

    block.subtitle("Links"),
    block.example("links", { hideTitle: true }),

    block.subtitle("Blockquote"),
    block.example("blockquote", { hideTitle: true }),

    block.subtitle("Text block"),
    block.example("textBlock", { hideTitle: true }),

    block.subtitle("Text helpers"),
    block.example("text-helpers/alignment", { hideTitle: true }),
    block.example("text-helpers/truncate", { hideTitle: true }),
    block.example("text-helpers/transform", { hideTitle: true }),
  ],
});
