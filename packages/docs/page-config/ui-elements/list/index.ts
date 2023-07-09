import {
  listApiOptions,
  listLabelApiOptions,
  listSeparatorApiOptions,
  listItemApiOptions,
  listItemLabelApiOptions,
  listItemSectionApiOptions,
} from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("List"),
    block.paragraph("The `va-list` component is used to display structured information."),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Basic usage",
      description: "Has no attributes by default. Build a structure by using components `va-list-label`, `va-list-separator`, `va-list-item` and etc."
    }),
    block.example("Disabled", {
      title: "Disabled",
      description: "You can disable any user interaction by using 'disabled' prop."
    }),
    block.example("Clickable", {
      title: "Clickable",
      description: "Support a ability to use a list item as a link."
    }),
    block.example("Fit", {
      title: "Fit",
      description: "Support a fitting of the list item by its content length."
    }),
    block.example("Lines", {
      title: "Lines",
      description: "You can divide item label content on a custom count of lines."
    }),

    block.subtitle("API"),

    block.paragraph("API for `va-list` component."),
    block.api(
      "VaList",
      {
        props: { fit: "Stretches list by its content width" },
        slots: { default: "Contains list items" },
      },
      listApiOptions
    ),

    block.subtitle("List Label API"),
    block.paragraph("API for `va-list-label` component."),
    block.api(
      "VaListLabel",
      { slots: { default: "Contains the label text"} },
      listLabelApiOptions
    ),

    block.subtitle("List Separator API"),
    block.paragraph("API for `va-list-separator` component."),
    block.api(
      "VaListSeparator",
      { props: { fit: "Adds space on the left side", spaced: "Adds spaces over and under the separator" }},
      listSeparatorApiOptions
    ),

    block.subtitle("List Item API"),
    block.paragraph("API for `va-list-item` component."),
    block.api(
      "VaListItem",
      {
        events: {
          focus: "Emitted when item is focused",
          click: "Emitted when user clicked on item"
        },
        slots: { default: "For a list item content" }
      },
      listItemApiOptions
    ),

    block.subtitle("List Item Label API"),
    block.paragraph("API for `va-list-item-label` component."),
    block.api(
      "VaListItemLabel",
      {
        props: {
          caption: "Applies another style to text",
          lines: "Divides item label content on a custom count of lines"
        },
        slots: { default: "Contains the label text" }
      },
      listItemLabelApiOptions
    ),

    block.subtitle("List Item Section API"),
    block.paragraph("API for `va-list-item-section` component."),
    block.api(
      "VaListItemSection",
      {
        props: {
          icon: "Makes section for icon",
          avatar: "Makes section for avatar"
        },
        slots: { default: "For a section content" }
      },
      listItemSectionApiOptions
    ),
  ],
});
