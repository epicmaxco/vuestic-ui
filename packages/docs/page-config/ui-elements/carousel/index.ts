import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("carousel.title"),

    block.component('Playground'),

    block.subtitle("all.examples"),

    // examples
    block.example("Default"),
    block.example("Ratio"),
    block.example("Height"),

    block.example("Arrows"),

    block.example("Indicators"),

    block.example("Vertical"),

    block.example("Slots"),

    block.example("Infinite"),

    block.example("Autoscroll"),

    block.example("Fade"),

    block.example("Swipe"),

    block.api("VaCarousel", apiOptions),
  ],
});
