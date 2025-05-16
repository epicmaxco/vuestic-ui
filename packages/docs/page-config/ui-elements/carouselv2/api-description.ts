import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    arrows: "Show or hide next and previous button.",
    autoscroll: "Enable autoscroll animation.",
    autoscrollInterval: "Time in `ms`. Each `autoscroll-interval` next slide will be shown.",
    autoscrollPauseDuration: "Pause animation duration in `ms` after user changed slide.",
    effect: "Slide change effect. Can be `scroll`, `fade` or `none`.",
    indicatorTrigger: "Event which will trigger indicator to change slide",
    indicators: "Show or hide indicators at the bottom of slider",
    infinite: "If true, after last slide first will be shown.",
    items: "List of slide items. Can be any array. Default item should be an image src or object containing `src` and `alt`. You can use item later in `default` slot.",
    modelValue: "Slide index to be shown.",
    swipable: "Enables swiping behavior.",
    ariaLabel: "The aria-label of carousel.",
    ariaGoToSlideLabel: "The aria-label of go to slide button.",
    ariaNextLabel: "The aria-label of next button.",
    ariaPreviousLabel: "The aria-label of previous button.",
    ariaSlideOfLabel: "The aria-label of the slide.",
  },
  slots: {
    default: "Carousel slides",
    indicator: "Custom style for indicator button",
    nextArrow: "Custom style for next button",
    prevArrow: "Custom style for previous button"
  }
});
