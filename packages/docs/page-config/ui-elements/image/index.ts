import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("image.title"),
    block.paragraph("image.summaryText"),

    block.component('Playground'),

    block.subtitle("all.examples"),

    block.example("Default"),
    block.example("Ratio"),
    block.example("Fit"),
    block.example("Slots"),
    // TODO Disabled because loading doesn't work properly.
    // block.example(  //   'LoaderSlot',
    // ),
    block.example("SrcSet"),
    block.example("Lazy"),

    block.headline('image.imagesInNuxt.title'),
    block.paragraph('image.imagesInNuxt.problemStatement'),
    block.paragraph('image.imagesInNuxt.resolveByImport'),
    block.code('import-image.vue', 'html'),
    block.paragraph('image.imagesInNuxt.resolveByPublicDir'),
    block.code('use-public-dir.vue', 'html'),

    block.subtitle("all.api"),
    block.api("VaImage", apiOptions),
  ],
});
