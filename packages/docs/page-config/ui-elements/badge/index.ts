import apiOptions from "./api-options";
import apiDescription from "./api-description";

export default definePageConfig({
  blocks: [
    block.title("Badge"),
    block.paragraph("VaBadge is used to showcase information related to other element, such as missed notifications near the user's avatar."),

    block.component("Playground"),

    block.subtitle("Examples"),
    block.example("Default", {
      title: "Default",
      description: "Useful for information views and tables."
    }),

    block.example("Placement", {
      title: "Placement",
      description: "The `placement` prop allows you to set placement of the badge relatively to the base element. Available values are: `top/bottom/left/right - start/center/end`. The `offset` prop allows you to amend the selected position - it moves badge forward or backward relatively to the main axis (`top/bottom/left/right`)."
    }),

    block.example("Color", {
      title: "Color",
      description: "The `color` prop is used to change the color of the component."
    }),

    block.example("Dot", {
      title: "Dot",
      description: "The `dot` property minimizes badge to accentuate the base element."
    }),

    block.example("Overlap", {
      title: "Overlap",
      description: "The `overlap` property allows badge to overlap the base element."
    }),

    block.example("WithOtherComponents", {
      title: "Usage with other components",
      description: "By combining a badge with other components, you can add information or focus attention."
    }),

    block.subtitle("API"),
    block.api("VaBadge", apiDescription, apiOptions),
  ],
});
