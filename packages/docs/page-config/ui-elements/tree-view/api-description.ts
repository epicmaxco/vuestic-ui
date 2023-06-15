import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    nodes: "Tree nodes array.",
    selectable: "Selectable.",
    selectionType: "Selection type where is a `leaf` current and all children nodes, `independent` - single selectable nodes.",
    valueBy: "The key to track the value.",
    textBy: "The key to show the value of node item.",
    trackBy: "The key to index nodes.",
    iconBy: "The key where is node placed.",
    disabledBy: "The key which describes the disabled property.",
    childrenBy: "Child nodes key.",
    expandedBy: "The where is placed the expanded property.",
    expandAll: "Expand or hide all nodes by default.",
    filter: "Tree view filter.",
    filterMethod: "Custom tree view filter method.",
    checked: "Array of pre-selected tree nodes.",
    checkedBy: "The key to set the checked field in the tree view model.",
    color: "The checkboxes color.",
    expanded: "Array of pre-expanded tree nodes.",
    expandNodeBy: "Click target to expand node, can be `node` or `leaf` icon."
  },
  slots: {
    notFound: "No matching nodes to the filter message.",
    content: "Configurable node content.",
    checkbox: "Checkbox icon placeholder.",
    icon: "Additional icon placeholder.",
    iconToggle: "Node leaf icon."
  },
  events: {
    updateChecked: "The array of checked tree nodes.",
    updateExpanded: "The array of expanded tree nodes."
  }
});
