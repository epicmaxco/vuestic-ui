import apiOptions from "./api-options";
import apiDescription from "./api-description";

export default definePageConfig({
  blocks: [
    block.title("Button Dropdown"),
    block.paragraph("Component with a button that displays dropdown content when getting clicked. It inherits properties, provided by [VaButton](/ui-elements/button) and [VaDropdown](/ui-elements/dropdown) components."),

    block.component("Playground"),

    block.subtitle("Examples"),
    block.example("Default", {
      title: "Basic usage",
      description: "Just wrap your content with `va-button-dropdown` component and it will become available only via click."
    }),
    block.example("Split", {
      title: "Split",
      description: "The `split` prop allows you to split the button into two, with different purposes of using. One of them can be a link (you can set href for it via `split-to` or `split-href` props, which are analogues of the `to` and `href` attributes)."
    }),
    block.example("Colors", {
      title: "Colors",
      description: "The component can be colored via `color`, `gradient` and `text-color` props."
    }),
    block.example("Sizes", {
      title: "Sizes",
      description: "You are able to set component's size via `size` prop (`small`, `medium` or `large` presets are available, `px` and `rem` values are also suitable)."
    }),
    block.example("Presets", {
      title: "Presets",
      description: '' //TODO: Add description?
    }),
    block.example("Disabled", {
      title: "Disabled",
      description: "The component can be disabled via `disabled` prop. For the `split` state can be disabled both or only one button (via `disableButton` and `disableDropdown` props)."
    }),
    block.example("Icons", {
      title: "Icons",
      description: "You can set the dropdown icon and its color via `icon` and `icon-color` props. Also you are able to change icon's position from right to  left side of the button via `left-icon` boolean prop. If you want to remove icon at all, use the `hide-icon` property. Opened-state icon can be changed using `openedIcon` prop."
    }),
    block.example("ClickInside", {
      title: "Click inside",
      description: "You are able to set up the dropdown to be closed or not after clicking on its content using the `close-on-content-click` prop."
    }),

    block.subtitle("API"),
    block.api("VaButtonDropdown", apiDescription, apiOptions),
  ],
});
