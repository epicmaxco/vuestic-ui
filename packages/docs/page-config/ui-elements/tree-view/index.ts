import { VaTreeViewOptions } from "./api-options";

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
    block.title("treeView.title"),
    block.paragraph("treeView.description"),

    block.example("Default"),

    block.example("CustomizableContent"),

    block.example("Filters"),

    block.example("Selectable"),

    block.example("SelectableColored"),

    // API
    block.api("VaTreeView", VaTreeViewOptions),
    block.collapse("TreeNode type", [block.code(treeNodeType)]),
  ],
});
