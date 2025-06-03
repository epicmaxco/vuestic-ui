import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Carousel V2"),

    block.alert("This is a new version of carousel component. It has better performance and more features. We recommend to use this version instead of old one."),

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
      description: "Arrow buttons allow user switch to next or previous slide. Can be hidden by setting `arrows` prop to `false`."
    }),

    block.example("Indicators", {
      title: "Indicator buttons",
      description: "Indicators (or dots) used to quickly change slide by it's index. Can be hidden by setting `indicators` prop to `false`."
    }),

    block.example("Group", {
      title: "Group",
      description: "`VaCarouselGroup` component allows you to group slides. This way you can create a carousel with multiple slides per view. You can set `per-group` prop to define how many slides will be shown in group."
    }),

    block.example("Slots", {
      title: "Slots",
      description: "Slots allow you to customize carousel component."
    }),

    block.example("Infinite", {
      title: "Infinite",
      description: "By default carousel can be scrolled infinite. This means that after last slide first will be shown. You can disable this behavior by setting `infinite` prop to `false`."
    }),

    block.example("Autoscroll", {
      title: "Autoscroll",
      description: "Autoscroll animation. You can set `autoscroll` prop to `true` to enable autoscroll. You can also set `autoscroll-interval` prop to define time in `ms` between each slide change."
    }),

    block.example("Fade", {
      title: "Fade",
      description: "Additional carousel slide switch effect. You can set `effect` prop to `fade` to enable fade effect. You can also set `autoscroll` prop to `true` to enable autoscroll."
    }),

    block.example("Swipe", {
      title: "Swipe",
      description: "The `swipable` prop enables swipe behavior for the component."
    }),

    block.api("VaCarouselV2", apiDescription, apiOptions),
  ],
});
