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

    block.subtitle("all.api"),
    block.api("VaImage", apiOptions),

    block.subtitle("all.cssVariables"),
    block.file("vuestic-ui/src/components/va-image/_variables.scss"),
  ],
});
