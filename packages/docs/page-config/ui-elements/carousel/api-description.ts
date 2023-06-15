import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    arrows: "Show or hide next and previous button.",
    autoscroll: "Enable autoscroll animation.",
    autoscrollInterval: "Time in `ms`. Each `autoscroll-interval` next slide will be shown.",
    autoscrollPauseDuration: "Pause animation duration in `ms` after user changed slide.",
    effect: "Slide change effect",
    height: "Slider height. Can be any valid CSS height.",
    indicatorTrigger: "Event which will trigger indicator to change slide",
    indicators: "Show or hide indicators at the bottom of slider",
    infinite: "If true, after last slide first will be shown.",
    items: "List of slide items. Can be any array. Default item should be an image src or object containing `src` and `alt`. You can use item later in `default` slot.",
    loop: "If true, after last slide slider will scroll to first one through all items before.",
    modelValue: "Slide index to be shown.",
    vertical: "Change slider scroll orientation.",
    fadeKeyframe: "Custom keyframe name for fade animation",
    swipable: "Enables swiping behavior.",
    swipeDirection: "Allowed directions for swiping: `all, horizontal, vertical, left, right, up, down`.",
    swipeDistance: "Distance in `px` considered sufficient for the swipe event.",
    ariaLabel: "The aria-label of carousel.",
    ariaGoToSlideLabel: "The aria-label of go to slide button.",
    ariaNextLabel: "The aria-label of next button.",
    ariaPreviousLabel: "The aria-label of previous button.",
    ariaSlideOfLabel: "The aria-label of the slide.",
    contain: "The image is scaled to maintain its aspect ratio while fitting within the carousel's content box.",
    crossorigin: "Proxies the `crossorigin` attribute to the image of the component [MDN](https://developer.mozilla.org/docs/Web/HTML/Element/img#attr-crossorigin)[[target=_blank]].",
    decoding: "Proxies the `decoding` attribute to the image of the component [MDN](https://developer.mozilla.org/docs/Web/HTML/Element/img#attr-decoding)[[target=_blank]].",
    draggable: "Proxies the `draggable` attribute to the image of the component [MDN](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/draggable)[[target=_blank]].",
    fetchpriority: "Proxies the `fetchpriority` attribute to the image of the component [MDN](https://developer.mozilla.org/docs/Web/HTML/Element/img#attr-fetchpriority)[[target=_blank]].",
    fit: "Proxies the `object-fit` attribute to the image of the component [MDN](https://developer.mozilla.org/docs/Web/CSS/object-fit)[[target=_blank]].",
    lazy: "Enables lazy load for the image of the component.",
    maxWidth: "Maximal the width of the image of the component",
    placeholderSrc: "`src` value for the placeholder image of the component.",
    referrerpolicy: "Proxies the `referrerpolicy` attribute to the image of the component [MDN](https://developer.mozilla.org/docs/Web/HTML/Element/img#attr-referrerpolicy)[[target=_blank]].",
    sizes: "Proxies the `sizes` attribute to the image of the component [MDN](https://developer.mozilla.org/docs/Web/HTML/Element/img#using_the_srcset_and_sizes_attributes)[[target=_blank]].",
    srcset: "Proxies the `srcset` attribute to the image of the component [MDN](https://developer.mozilla.org/docs/Web/HTML/Element/img#using_the_srcset_and_sizes_attributes)[[target=_blank]].",
    title: "Proxies the `title` attribute to the image of the component [MDN](https://developer.mozilla.org/docs/Web/HTML/Element/img#the_title_attribute)[[target=_blank]]."
  },
  slots: {
    default: "Custom style for slide item content",
    indicator: "Custom style for indicator button",
    nextArrow: "Custom style for next button",
    prevArrow: "Custom style for previous button"
  }
});
