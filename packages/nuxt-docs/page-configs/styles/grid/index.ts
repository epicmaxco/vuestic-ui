import { definePageConfig } from "~~/types/page-config";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("grid.title"),
    block.paragraph("grid.summaryText"),

    block.subtitle("grid.examples.default.title", 'h5'),
    block.example("Default"),

    block.subtitle("grid.examples.breakpoints.title", 'h5'),
    block.paragraph("grid.examples.breakpoints.text"),
    block.paragraph("grid.examples.breakpoints.sizes.xs"),
    block.paragraph("grid.examples.breakpoints.sizes.sm"),
    block.paragraph("grid.examples.breakpoints.sizes.md"),
    block.paragraph("grid.examples.breakpoints.sizes.lg"),
    block.paragraph("grid.examples.breakpoints.sizes.xl"),
    block.example("Breakpoints"),

    block.subtitle("grid.examples.offsets.title", 'h5'),
    block.paragraph("grid.examples.offsets.text"),
    block.paragraph("grid.examples.offsets.sizes.xs"),
    block.paragraph("grid.examples.offsets.sizes.sm"),
    block.paragraph("grid.examples.offsets.sizes.md"),
    block.paragraph("grid.examples.offsets.sizes.lg"),
    block.paragraph("grid.examples.offsets.sizes.xl"),
    block.example("Offsets"),

    block.subtitle("grid.examples.gutters.title", 'h5'),
    block.paragraph("grid.examples.gutters.text"),
    block.paragraph("grid.examples.gutters.sizes.xs"),
    block.paragraph("grid.examples.gutters.sizes.sm"),
    block.paragraph("grid.examples.gutters.sizes.md"),
    block.paragraph("grid.examples.gutters.sizes.lg"),
    block.paragraph("grid.examples.gutters.sizes.xl"),
    block.example("Gutters"),

    block.subtitle("all.api"),
    block.subtitle("grid.api.align.title", 'h5'),
    block.paragraph("grid.api.align.variants[0]"),
    block.paragraph("grid.api.align.variants[1]"),
    block.paragraph("grid.api.align.variants[2]"),
    block.paragraph("grid.api.align.variants[3]"),

    block.subtitle("grid.api.alignSelf.title", 'h5'),
    block.paragraph("grid.api.alignSelf.variants[0]"),
    block.paragraph("grid.api.alignSelf.variants[1]"),
    block.paragraph("grid.api.alignSelf.variants[2]"),
    block.paragraph("grid.api.alignSelf.variants[3]"),

    block.subtitle("grid.api.alignContent.title", 'h5'),
    block.paragraph("grid.api.alignContent.variants[0]"),
    block.paragraph("grid.api.alignContent.variants[1]"),
    block.paragraph("grid.api.alignContent.variants[2]"),
    block.paragraph("grid.api.alignContent.variants[3]"),
    block.paragraph("grid.api.alignContent.variants[4]"),

    block.subtitle("grid.api.justify.title", 'h5'),
    block.paragraph("grid.api.justify.variants[0]"),
    block.paragraph("grid.api.justify.variants[1]"),
    block.paragraph("grid.api.justify.variants[2]"),
    block.paragraph("grid.api.justify.variants[3]"),
    block.paragraph("grid.api.justify.variants[4]"),

    block.subtitle("grid.api.justifySelf.title", 'h5'),
    block.paragraph("grid.api.justifySelf.variants[0]"),
    block.paragraph("grid.api.justifySelf.variants[1]"),
    block.paragraph("grid.api.justifySelf.variants[2]"),
    block.paragraph("grid.api.justifySelf.variants[3]"),
  ],
});
