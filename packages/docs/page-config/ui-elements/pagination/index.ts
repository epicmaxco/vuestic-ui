import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Pagination"),
    block.paragraph("The pagination component is used to split big data sets into chunks so that it's simpler for users to use provided information."),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Default",
      description: "By default the component is displayed as a list of pages with length equal to `pages` prop value."
    }),
    block.example("LimitVisible", {
      title: "Limiting the length",
      description: "By using `visible-pages` prop you can set the amount of pages visible on screen."
    }),
    block.example("Presets", {
      title: "Presets",
      description: "We provide several built-in style presets: `default`, `primary`, `secondary` (inherited from [VaButton](/ui-elements/button)). You can switch between them via `buttons-preset` prop."
    }),
    block.example("Colors", {
      title: "Color",
      description: "Set different colors using `color` prop. You can either user theme string HEX color value."
    }),
    block.example("Gapped", {
      title: "Gaps",
      description: "`gapped` prop allows you to add distance between pagination items."
    }),
    block.example("Sizes", {
      title: "Size",
      description: "Utilize `size` prop in order to make component fit your needs. Refer to API section for more in-depth explanation of how to use `size` prop."
    }),
    block.example("Bordered", {
      title: "Borders",
      description: "Specifying `border-color` prop will add borders to the pagination items."
    }),
    block.example("Rounded", {
        title: "Rounded",
        description: "`rounded` prop makes your pagination items rounded."
      }
    ),
    block.example("ActiveColor", {
      title: "Active pagination button color",
      description: "You can specify color of the current pagination item via `active-page-color` prop."
    }),
    block.example("Icons", {
      title: "Custom icons",
      description: "Feeling the need to change icons for arrows? We have 4 props to enable full customization of `va-pagination` component."
    }),
    block.example("WithInput", {
      title: "Using HTML input instead of pages",
      description: "With `input` prop you can have input with arrow buttons instead of default pagination."
    }),
    block.example("TotalAndPageSize", {
      title: "Using `total` and `page-size`",
      description: "You can provide `total` and `page-size` props to `va-pagination` component and let it calculate the length of pagination itself. The value of the component in this case would be equal to the number of the first item at the selected page."
    }),
    block.example("PrevAndNextLinks", {
      title: "Custom links instead of icons",
      description: "The `prevPageLink` and `nextPageLink` slots allow you to set a different look to the buttons to go to the previous/next page."
    }),

    block.subtitle("API"),
    block.api("VaPagination", apiDescription, apiOptions),

    block.subtitle("FAQ"),

    block.headline("What will happen if both `pages` and `total` props are set?"),
    block.paragraph("The error will be thrown into the console. Component is meant to be used only in one of these modes."),

    block.headline("Can I use `total` and `input` props together?"),
    block.paragraph("Yep. In v-model you'll get item number instead of page number."),
  ],
});
