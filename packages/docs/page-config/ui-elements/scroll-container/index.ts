import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Scroll container"),
    block.paragraph("Scroll container with custom colored scrollbar. Useful in case you have long list."),

    block.subtitle("Examples"),

    block.example("Default", { title: "Default usage" }),

    block.example("Color", {
      title: "Color",
      description: "You can change color of scrollbar by passing `color` prop. Try it by choosing colors listed below."
    }),

    block.example("Horizontal", {
      title: "Horizontal",
      description: "You can specify if scroll container has `horizontal` scroll in the same way as `vertical` one."
    }),

    block.example("Size", {
      title: "Size",
      description: "You are able to set scrollbar's size (width or height) via `size` prop (`small`, `medium` or `large` presets are available, `px` and `rem` values are also suitable)."
    }),

    // TODO: Doesn't work in Firefox
    // block.example("Gradient", {
    //   title: "Gradient",
    //   description: "The `gradient` prop enables gradient for scrollbar's background."
    // }),

    block.example("Rtl", {
      title: "RTL",
      description: "The `rtl` prop enables RTL-mode."
    }),

    block.api("VaScrollContainer", apiDescription, apiOptions),
  ],
});
