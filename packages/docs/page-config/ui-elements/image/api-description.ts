import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    src: "Initial image URL.",
    alt: "Image alternative text.",
    ratio: "Image width to height ratio.",
    fit: "Proxies the `object-fit` attribute to the image [MDN](https://developer.mozilla.org/docs/Web/CSS/object-fit)[[target=_blank]].",
    crossorigin: "Proxies the `crossorigin` attribute to the image [MDN](https://developer.mozilla.org/docs/Web/HTML/Element/img#attr-crossorigin)[[target=_blank]].",
    decoding: "Proxies the `decoding` attribute to the image [MDN](https://developer.mozilla.org/docs/Web/HTML/Element/img#attr-decoding)[[target=_blank]].",
    fetchpriority: "Proxies the `fetchpriority` attribute to the image [MDN](https://developer.mozilla.org/docs/Web/HTML/Element/img#attr-fetchpriority)[[target=_blank]].",
    loading: "Proxies the `loading` attribute to the image [MDN](https://developer.mozilla.org/docs/Web/HTML/Element/img#attr-loading)[[target=_blank]].",
    referrerpolicy: "Proxies the `referrerpolicy` attribute to the image [MDN](https://developer.mozilla.org/docs/Web/HTML/Element/img#attr-referrerpolicy)[[target=_blank]].",
    sizes: "Proxies the `sizes` attribute to the image [MDN](https://developer.mozilla.org/docs/Web/HTML/Element/img#using_the_srcset_and_sizes_attributes)[[target=_blank]].",
    srcset: "Proxies the `srcset` attribute to the image [MDN](https://developer.mozilla.org/docs/Web/HTML/Element/img#using_the_srcset_and_sizes_attributes)[[target=_blank]].",
    title: "Proxies the `title` attribute to the image [MDN](https://developer.mozilla.org/docs/Web/HTML/Element/img#the_title_attribute)[[target=_blank]].",
    lazy: "Enables lazy load for the image.",
    draggable: "Proxies the `draggable` attribute to the image [MDN](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/draggable)[[target=_blank]].",
    placeholderSrc: "`src` value for the placeholder image (can be replaced with `placeholder` slot).",
    contain: "The image is scaled to maintain its aspect ratio while fitting within the element's content box.",
    maxWidth: "Maximal image's width"
  },
  events: {
    loaded: "Emitted when image loading is finished.",
    error: "Emitted on loading error."
  },
  slots: {
    sources: "Slot for passing one or more `source` tags [MDN](https://developer.mozilla.org/docs/Web/HTML/Element/picture)[[target=_blank]].",
    loading: "Shown when image is loading.",
    error: "Shown if loading returns an error.",
    default: "Image overlay content. Won't be shown on loading or error.",
    placeholder: "Shown in case of loading/error and if no specific for these states slots were passed."
  }
});
