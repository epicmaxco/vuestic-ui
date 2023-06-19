import apiOptions from "./api-options";
import apiDescription from './api-description';
import specs from "./specs.md?raw";

export default definePageConfig({
  blocks: [
    block.title("Dropdown"),
    block.paragraph("Dropdown component is a **headless** component that allow you to show some content near anchor. It is more utility component. You can use it with `VaDropdownContent` or `VaCard` component. This component looks like popover, but without any additional styling as `VaPopover` has."),

    // examples/
    block.example("Default", { title: "Default usage" }),

    block.example("PlacementAndOffset", {
      title: "Placement and Offset",
      description: "You can place dropdown any direction you want. Offset is calculated relative to `placement` prop. We use `main` and `cross` offset. Means `main` will be relative to `placement` direction while `cross` is perpendicular. `auto` placement will be `bottom` by default, but will change to `top` if it is not possible to display on bottom."
    }),

    block.example("Trigger", {
      title: "Trigger",
      description: "You can use `click`, `hover` or `none` trigger which will open dropdown. If you want dropdown to be opened only programmatically use `none` trigger"
    }),

    block.example("Cursor", {
      title: "Place on cursor",
      description: "You can render dropdown content on cursor position. It is useful to use `cursor` props with `auto-placement` so if content do not fit target it will be placed somewhere else."
    }),

    block.example("PreventOverflow", {
      title: "Prevent overflow",
      description: "By default dropdown content is rendered as body child. This way we prevent any overflow. In example below `overflow: hidden` of green box is ignored. But we still able to respec overflow by changing `target` prop. In example below `overflow: hidden` of red box is hiding dropdown content."
    }),

    block.api("VaDropdown", apiDescription, apiOptions),

    block.collapse("useDropdown hook specs", [block.markdown(specs)]),
  ],
});
