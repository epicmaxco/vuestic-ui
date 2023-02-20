import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("skeleton.title"),
    block.paragraph("skeleton.description"),

    block.component('Playground'),

    block.subtitle("all.examples"),

    block.example("Default"),
    block.example("Text"),
    block.example("Headline"),
    block.example("Circle"),
    block.example("Rounded"),
    block.example("Square"),
    block.example("Group"),
    block.example("GroupWave"),
    block.example("Loading"),

    block.subtitle("all.api"),
    block.api("VaSkeleton", apiOptions),
  
    block.subtitle("all.cssVariables"),
    block.file("vuestic-ui/src/components/va-skeleton/_variables.scss"),
  ],
});
