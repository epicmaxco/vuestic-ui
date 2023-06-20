import { VaTreeViewOptions } from "./api-options";
import apiDescription from './api-description';

const treeNodeType = `
interface TreeNode {
  id: number | string
  children: TreeNode[]
  level?: number
  checked?: boolean | null
  disabled?: boolean
  expanded?: boolean
  hasChildren?: boolean
  matchesFilter?: boolean
  indeterminate?: boolean
  [key: string]: any
}
`;

export default definePageConfig({
  blocks: [
    block.title("Tree view"),
    block.paragraph("Component for the hierarchical and nested data"),

    block.example("Default", { title: "Basic usage" }),

    block.example("CustomizableContent", {
      title: "Customizable content",
      description: "You can customize the body of node"
    }),

    block.example("Filters", { title: "Filters" }),

    block.example("Selectable", { title: "Selectable" }),

    block.example("SelectableColored", { title: "Colored checkboxes" }),

    // API
    block.api("VaTreeView", apiDescription, VaTreeViewOptions),
    block.collapse("TreeNode type", [block.code(treeNodeType)]),
  ],
});
