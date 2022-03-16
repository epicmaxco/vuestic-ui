import MarkdownView from './MarkdownView/MarkdownView.vue'
import DocsExample from './DocsExample/DocsExample.vue'
import DocsCode from './DocsCode/DocsCode.vue'
import DocsTable from './DocsTable/DocsTable.vue'
import DocsComponentApi from './DocsComponentApi/DocsComponentApi.vue'
import DocsHeadline from './DocsHeadline/DocsHeadline.vue'

export const blockComponents = {
  MarkdownView,
  DocsExample,
  DocsCode,
  DocsTable,
  DocsComponentApi,
  DocsHeadline
}

/** Map for better IDE support */
export type BlockComponents = typeof blockComponents