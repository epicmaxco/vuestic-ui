export default definePageConfig({
  blocks: [
    block.title("grid.title"),
    block.paragraph("grid.summaryText"),
    block.alert("grid.deprecated", "primary"),

    block.example("Default"),

    block.headline("grid.examples.breakpoints.title"),
    block.paragraph("grid.examples.breakpoints.text"),
    block.paragraph("grid.examples.breakpoints.sizes.xs"),
    block.paragraph("grid.examples.breakpoints.sizes.sm"),
    block.paragraph("grid.examples.breakpoints.sizes.md"),
    block.paragraph("grid.examples.breakpoints.sizes.lg"),
    block.paragraph("grid.examples.breakpoints.sizes.xl"),
    block.example("Breakpoints"),

    block.headline("grid.examples.offsets.title"),
    block.paragraph("grid.examples.offsets.text"),
    block.paragraph("grid.examples.offsets.sizes.xs"),
    block.paragraph("grid.examples.offsets.sizes.sm"),
    block.paragraph("grid.examples.offsets.sizes.md"),
    block.paragraph("grid.examples.offsets.sizes.lg"),
    block.paragraph("grid.examples.offsets.sizes.xl"),
    block.example("Offsets"),

    block.subtitle("all.api"),
    block.headline("grid.examples.align.title"),
    block.paragraph("grid.examples.align.variants[0]"),
    block.paragraph("grid.examples.align.variants[1]"),
    block.paragraph("grid.examples.align.variants[2]"),
    block.paragraph("grid.examples.align.variants[3]"),
    block.example("AlignDefault", { hideTitle: true }),

    block.headline("grid.examples.alignSelf.title"),
    block.paragraph("grid.examples.alignSelf.variants[0]"),
    block.paragraph("grid.examples.alignSelf.variants[1]"),
    block.paragraph("grid.examples.alignSelf.variants[2]"),
    block.paragraph("grid.examples.alignSelf.variants[3]"),
    block.example("AlignSelf", { hideTitle: true }),

    block.headline("grid.examples.alignContent.title"),
    block.paragraph("grid.examples.alignContent.variants[0]"),
    block.paragraph("grid.examples.alignContent.variants[1]"),
    block.paragraph("grid.examples.alignContent.variants[2]"),
    block.paragraph("grid.examples.alignContent.variants[3]"),
    block.paragraph("grid.examples.alignContent.variants[4]"),
    block.example("AlignContent", { hideTitle: true }),

    block.headline("grid.examples.justify.title"),
    block.paragraph("grid.examples.justify.variants[0]"),
    block.paragraph("grid.examples.justify.variants[1]"),
    block.paragraph("grid.examples.justify.variants[2]"),
    block.paragraph("grid.examples.justify.variants[3]"),
    block.paragraph("grid.examples.justify.variants[4]"),
    block.paragraph("grid.examples.justify.variants[5]"),
    block.example("AlignJustify", { hideTitle: true })
  ]
});
