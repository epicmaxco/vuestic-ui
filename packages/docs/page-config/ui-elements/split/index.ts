import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Split"),
    block.paragraph("`va-split` component splits container into 2 horizontal"),

    block.subtitle("Examples"),

    block.example("Default", { title: "Basic usage", }),

    block.example("Vertical", {
      title: "Vertical",
      description: "Prop `vertical` changes components orientation to vertical."
    }),

    block.example("CustomGrabber", {
      title: "Custom grabber",
      description: "You can pass via `grabber` slot any content which will overwrite default grabber (`va-divider`)."
    }),

    block.example("CustomLimits", {
      title: "Limits",
      description: "`limits` prop allows you to set up panels min-max sizes. For example, `[[10, 'any'], ['50px', '30rem']]` (sum of different panels min and max size should be equal to 100%) will set up min size of the start panel to 10%, max - 100%. For the end panel - 50px and 30rem accordingly. If you don't need max sizes limits but only min ones, you can use this record form: `[10px, 50%]`."
    }),

    block.example("Snapping", {
      title: "Snapping",
      description: "`snapping` and `snapping-range` props allow you to set up a virtual marks, splitter will be 'jumping' to when it will be near of them. For example, `snapping` with value `['20', 80]` and `snapping-range` with value `5` will set up 2 marks - 20 and 80 percents of the splitter container size. Meanwhile, splitter will 'jump' to it when there is at least 5 percents of the container size between them."
    }),

    block.example("Nested", {
      title: "Nested",
      description: "Passing another `va-split` component via `start`/`end` slot you can gain different panels combinations."
    }),

    block.example("Maximization", {
      title: "Maximization",
      description: "Prop `maximization` allows to maximize end panel size via double click on dragger (additional prop `maximizeStart` changes this logic - start panel maximizing instead)."
    }),

    block.example("Disabled", {
      title: "Disabled",
      description: "`disabled` prop restricts to change panels size (including option via `maximization` prop)."
    }),

    block.subtitle("API"),
    block.api("VaSplit", apiDescription, apiOptions),
  ],
});
