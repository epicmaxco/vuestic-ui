import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Image"),
    block.paragraph("The `va-image` component is used to display responsive images. It has some features to make your work with images easier."),

    block.component('Playground'),

    block.subtitle("Examples"),

    block.example("Default", { title: "Default" }),
    block.example("Ratio", {
      title: "Ratio",
      description: "The `ratio` prop changes image original ratio, showing part of image to fit new ratio."
    }),
    block.example("Fit", {
      title: "Object Fit",
      description: "Proxies `object-fit` CSS property. Available values are: `contain`, `fill`, `cover`, `scale-down`, `none`."
    }),
    block.example("Slots", {
      title: "Status slots",
      description: "We're providing 3 status slots: `error` (visible when `src` path is incorrect), `loading` (visible when image is loading) and `placeholder` (works as both previous). As an alternative for error handling, we provide the `fallback-icon`, `fallback-text`, `fallback-image` and `fallback-renderer` props, that will be called if error slot wasn't passed. Also you're able to set global fallback settings via [components config](/getting-started/configuration-guide#components-config)."
    }),
    // TODO Disabled because loading doesn't work properly.
    // block.example(  //   'LoaderSlot',
    // ),
    block.example("SrcSet", {
      title: "Srcset",
      description: "The `srcset` and `sizes` properties allows you to use native srcset attribute with our component."
    }),
    block.example("Lazy", {
      title: "Lazy Load",
      description: "The `lazy` prop allows you to use lazy-load behavior. In this case the image will be loaded only when it becomes visible (intersection)."
    }),

    block.headline('How to deal with images in Vite based apps'),
    block.paragraph('When you will work with `va-image` component, you possibly can meet an issue with missing images in Vite based applications.'),
    block.paragraph('To resolve this issue, you need to import your image into the script tag and use imported image as a source for the `va-image` component.'),
    block.code('import-image.vue', 'html'),
    block.paragraph('Also, you can place your images under your `public` directory to avoid importing images.'),
    block.code('use-public-dir.vue', 'html'),

    block.subtitle("API"),
    block.api("VaImage", apiDescription, apiOptions),
  ],
});
