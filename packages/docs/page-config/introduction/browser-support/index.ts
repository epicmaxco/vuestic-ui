export default definePageConfig({
  meta: {
    title: "Browser support",
    category: "introduction",
  },

  blocks: [
    block.title("browserSupport.title"),
    block.paragraph("browserSupport.description"),
    block.component("browsers-table"),
  ],
});
