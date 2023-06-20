import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Data table"),
    block.paragraph("The `va-data-table` component is used for displaying tabular data. Features include sorting, searching, pagination, row selection, ability to add additional row(s) to table header (`thead`), body (`tbody`) or footer (`tfoot`) and other functions."),
    block.paragraph("Also, we provide styles for HTML Table and have own theme for AG-Grid:"),
    block.link("HTML Table", "/ui-elements/table"),
    block.link("AG Grid Theme", "/extensions/ag-grid"),

    block.subtitle("Examples"),
    block.example("Default"),

    block.headline("Slots"),
    block.paragraph("Slots allow you to control the display of data and their views in different parts of the table. The examples below demonstrate some of these slots and what you can do with each of them."),
    block.paragraph("**Using custom slots**. Custom slots (`username`, `street`) display certain data."),
    block.alert("Slot names that are not in `columns` prop will be omitted.", "warning"),
    block.example("CustomSlots", { hideTitle: true }),
    block.paragraph("**Showing header, body and footer's prepend and append static rows**. For added (prepended and appended) static rows an additional `className` with a background color is set."),
    block.example("StaticSlots", { hideTitle: true }),
    block.paragraph("**Using `colgroup` slot to set specific attributes to columns**. For last column an additional `className` with a background color is set."),
    block.example("ColgroupSlots", { hideTitle: true }),

    block.example("Filtering"),

    block.headline("Sorting"),
    block.paragraph("You can specify which columns should be sortable by providing a column definition object (see the `columns` prop below) with the `sortable: true` field. Making a column sortable means allowing to click the column's header to toggle the sorting by that column's values."),
    block.paragraph("You can use the `sortingOptions` property to set the sort order for the table as a whole, as well as for each column individually in the `columns` object."),
    block.paragraph("You can also provide a custom sorting function for a given column using the `sortingFn` field on the column definition object: `sortingFn: (a: any, b: any) => number`. The function takes two cells' initial values (a, b) (**note: initial values** (i.e. in the form the user provided them, rather than stringified)) and must return a number (-1, 0, +1) indicating whether the two rows should be swapped the places or not. See the standard JS's [Array.prototype.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)[[target=_blank]] for details. If you want to runtime-disable the custom function and start making use of the built-in one, pass the `undefined` to the `sortingFn`."),
    block.paragraph("`va-data-table` also optionally accepts the `sort-by` and the `sorting-order` modeled props, which allow users to change sorting settings from-outside and to model the changes introduced to the table's sorting by interacting with the table itself. They also allow to provide initial sorting values. **Properties work through the `v-model`**."),
    block.example("Sorting", { hideTitle: true }),

    block.headline("Selection"),
    block.paragraph("Use the `selectable` prop to indicate whether the `va-data-table` should have selectable rows or not. The highlighting color of the selected row might be changed with the `selected-color` prop."),
    block.paragraph("The selection may optionally be attached to a model with the standard `v-model` (using the `:model-value` prop and the `update:modelValue` event). This also allows to set the initial selection on the `va-data-table`."),
    block.example("Selection", { hideTitle: true }),
    block.paragraph("If you have items that can be updated (from the backend, for example), you must set the `items-track-by` prop to track your selected items properly."),
    block.example("SelectionWithKeys", { hideTitle: true }),

    block.example("Pagination", {
      title: "Pagination",
      description: "Use the `per-page` and `current-page` props to enable pagination.\n\nThe `va-data-table` component is paginator-agnostic. I.e. it can work with any pagination component you'd like. In the example below, it uses both standard inputs and the `va-pagination` component."
    }),
    block.example("Styling", {
      title: "Column styling",
      description: "Should be specified on columns (see the `columns` prop below). Allows to provide different values (`text-align`, `vertical-align` and `width` css properties, custom `class` and `style`) for headers and for columns' cells."
    }),
    block.example("Binding", {
      title: "Row and cell attrs binding",
      description: "Row and cell customization can be achieved by binding attributes for items using `row-bind` and `cell-bind`."
    }),
    block.example("VirtualScroll", {
      title: "Virtual scroll",
      description: "The `virtual-scroller` prop enables virtual scroll for `tbody` rows ([read more](/ui-elements/virtual-scroller)). Pay your attention, that CSS transition is disabled here because of possible performance problems."
    }),

    block.headline("Sticky header and footer"),
    block.paragraph("The sticky header and footer are set by the `sticky-header` and `sticky-footer` properties. Sticky behavior is achieved through CSS with `position: sticky`. This is NOT supported on all browsers. Check [caniuse.com](https://caniuse.com/?search=sticky)[[target=_blank]] before using this technique."),
    block.paragraph("To work correctly, it is important to limit the height (set the value in the `height` property of the component or using the CSS `height` or `max-height` properties) of the table and assign a background color (set the CSS value `background-color`) of the table header."),
    block.example("Sticky", { hideTitle: true }),

    block.example("Other", {
      title: "Other",
      description: "The component has many different properties, some of them are shown below with an example."
    }),
    block.example("CRUD", {
      title: "CRUD actions",
      description: "Example of `va-data-table` with **CRUD** actions using a `va-modal` component for editing each row:"
    }),
    block.example("ExpandableRow", {
      title: "Expandable rows",
      description: "Each row could can be additionally expanded by providing `expandableRow` slot. Slot expansion is triggered by `row.toggleRowDetails` slot property"
    }),
    block.example("InlineEditing", {
      title: "Inline Editing",
      description: "Inline cell editing example. We provide a `#cell` slot for each column. The [VaValue](/ui-elements/value) component provides a boolean variable, which we can use to show/hide input. To change cell data we need access it by reference using `row.rowData[item.key]` - this way vue can track reactivity. Additional CSS is used to make the table look better. This way you can use [VaInput](/ui-elements/input), [VaSelect](/ui-elements/select) or any other component to edit data inline."
    }),
    block.example("ColumnWidth", {
      title: "Column width",
      description: "You can freeze column width with `width` property in column. You can use it with `virtual-scroller` to prevent column size shifting on different data."
    }),

    block.subtitle("API"),
    block.api("VaDataTable", apiDescription, apiOptions),
  ],
});
