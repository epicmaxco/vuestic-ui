import apiOptions from "./api-options";
import apiDescription from "./api-description";

export default definePageConfig({
  blocks: [
    block.title("Badge"),
    block.paragraph("VaBadge is used to highlight information related to other element, such as missed notifications near the user's avatar."),

    block.component("Playground"),

    block.subtitle("Examples"),
    block.example("Default", {
      title: "Default",
      description: "Useful for information views and tables."
    }),

    block.example("Placement", {
      title: "Placement",
      description: "The `placement` allows you to set placement of the badge relatively to the base element. Available values: `top/bottom/left/right - start/center/end`. The `offset` prop allows you to amend the selected position - it moves badge forward or backward relatively to the main axis (`top/bottom/left/right`)."
    }),

    block.example("Color", {
      title: "Color",
      description: "The `color` prop is used to change the color of the component."
    }),

    block.example("Dot", {
      title: "Dot",
      description: "The `dot` property puts the component in a minimalist mode in order to accentuate the base element."
    }),

    block.example("Offset", {
      title: "Offset",
      description: "The `offset` is used to set a distance between the base element and the badge."
    }),

    block.example("Overlap", {
      title: "Overlap",
      description: "The `overlap` property allows badge to overlap the base element."
    }),

    block.example("WithOtherComponents", {
      title: "Usage with other components",
      description: "By combining a component with others, you can add information to them or focus attention on them."
    }),

    block.example("NoContent", {
      title: "Without content",
      description: "By default, the component is hidden unless content is passed to it via a slot or the `text` property. The `visible-empty` property allows displaying an empty component as a colored square."
    }),

    block.subtitle("API"),
    block.api("VaBadge", apiDescription, apiOptions),
  ],
});
