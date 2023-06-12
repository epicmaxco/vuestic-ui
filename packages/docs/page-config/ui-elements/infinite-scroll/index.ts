import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Infinite Scroll"),
    block.paragraph("The `va-infinite-scroll` component is a wrapper component which is intended to be used to create lists with dynamically added content. It provides rich interface to customize scrolling behavior and much more."),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Default",
      description: "Just wrap your content in `va-infinite-scroll` component and provide `load` callback, and you'll see it's called each time list is scrolled till the bottom."
    }),
    block.example("Reverse", {
      title: "Reverse",
      description: "With `reverse` prop you can prepend content to your list. Might be useful in messenger windows."
    }),
    block.example("Disabled", {
      title: "Disabled",
      description: "In case you need to prevent a list from loading more content, `disabled` prop is here for you."
    }),
    block.example("CustomTarget", {
      title: "Custom scroll target container",
      description: "Provide either DOM element or CSS Selector to be used instead of default scroll container. "
    }),

    block.subtitle("API"),
    block.api("VaInfiniteScroll", apiDescription, apiOptions),
  ],
});
