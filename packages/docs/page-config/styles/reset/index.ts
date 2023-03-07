export default definePageConfig({
  blocks: [
    block.title("reset.title"),
    block.paragraph("reset.description"),
    block.alert("reset.deprecated", "danger"),

    block.headline("reset.features.title"),
    block.paragraph("reset.features.info"),
    block.paragraph("reset.features.list"),
    block.paragraph("reset.features.more")
  ]
});
