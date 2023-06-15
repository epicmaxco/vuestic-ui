import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    vertical: "Changes `va-split` orientation to vertical.",
    limits: "Min-max size limits of the each panel.",
    maximization: "End panel size maximization via separator double click.",
    maximizeStart: "Maximize size of the start panel instead of end one.",
    snapping: "Marks array the splitter will be 'jumping' to.",
    snappingRange: "Distance (% of components container size, px or rem) between splitter and snapping mark, which will call 'jumping' to it.",
    ariaLabel: "The aria-label of the component"
  },
  slots: {
    dragger: "Changes default separator-dragger (`va-divider` component) to custom.",
    start: "Start panel content.",
    end: "End panel content."
  }
});
