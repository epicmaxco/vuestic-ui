import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Carousel"),

    block.component('Playground'),

    block.subtitle("Examples"),

    // examples
    block.example("Default", { title: 'Default' }),
    block.example("Ratio", {
      title: "Ratio",
      description: "The `ratio` prop allows you to set the aspect ratio of the carousel."
    }),
    block.example("Height", {
        title: "Height",
        description: "If you need specific height instead of ratio, you can use `height` prop."
      }
    ),

    block.example("Arrows", {
      title: "Arrow buttons",
      description: "Arrow buttons allow user switch to next or previous slide."
    }),

    block.example("Indicators", {
      title: "Indicator buttons",
      description: "Indicators (or dots) used to quickly change slide by it's index."
    }),

    block.example("Vertical", {
      title: "Vertical",
    }),

    block.example("Slots", {
      title: "Slots",
      description: "Slots allow you to customize carousel component."
    }),

    block.example("Infinite", {
      title: "Infinite",
      description: "Smooth scroll transition."
    }),

    block.example("Autoscroll", {
      title: "Autoscroll",
      description: "Autoscroll animation."
    }),

    block.example("Fade", {
      title: "Fade",
      description: "Additional carousel slide switch effect."
    }),

    block.example("Swipe", {
      title: "Swipe",
      description: "The `swipable` prop enables swipe behavior for the component."
    }),

    block.api("VaCarousel", apiDescription, apiOptions),
  ],
});
