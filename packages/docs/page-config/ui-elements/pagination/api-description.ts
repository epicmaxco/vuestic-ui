import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    value: "Current page (or item if `total` is issued) value.",
    visiblePages: "The amount of displayed pages (when set to 0 all pages are displayed).",
    pages: "The amount of pages.",
    boundaryLinks: "Show controls to move to first and last page.",
    boundaryNumbers: "Always show first and last page (will replace `boundary-links` if both used).",
    directionLinks: "Show buttons to move forward and backward.",
    input: "Use HTML Input instead of buttons to control `va-pagination` state.",
    hideOnSinglePage: "Component won't be displayed if only 1 page is available.",
    total: "Set the amount of data pagination should iterate through. This prop should not be used with `pages` prop.",
    pageSize: "Set the amount of data to be displayed at 1 page. Used to calculate the length of pagination. This prop should not be used with `pages` prop.",
    boundaryIconLeft: "Set the icon name for left boundary icon.",
    boundaryIconRight: "Set the icon name for right boundary icon.",
    directionIconLeft: "Set the icon name for left direction icon.",
    directionIconRight: "Set the icon name for right direction icon.",
    size: "Specify size for component. `small`, `medium`, `large` sizes are available.",
    activePageColor: "Specifies color of the currently active page button.",
    gapped: "Enables gaps between page buttons.",
    buttonsPreset: "Value of the `preset` prop for passing it to the `VaButton` component ([read more](/ui-elements/button)).",
    ariaGoToLastPageLabel: "The aria-label of the \"go to last page\" button",
    ariaGoToNextPageLabel: "The aria-label of the \"go to next page\" button",
    ariaGoToPreviousPageLabel: "The aria-label of the \"go to previous page\" button",
    ariaGoToSpecificPageInputLabel: "The aria-label of the \"go to specific page\" input",
    ariaGoToSpecificPageLabel: "The aria-label of the \"go to specific page\" button",
    ariaGoToTheFirstPageLabel: "The aria-label of the \"go to the first page\" button",
    ariaLabel: "The aria-label of the component"
  },
  slots: {
    firstPageLink: "For the first page link content",
    prevPageLink: "For the prev page link content",
    nextPageLink: "For the next page link content",
    lastPageLink: "For the last page link content"
  }
});
