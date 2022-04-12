import MarkdownView from './MarkdownView/MarkdownView.vue'
import DocsExample from './DocsExample/DocsExample.vue'
import DocsExampleBlock from './DocsExampleBlock/DocsExampleBlock.vue'
import DocsCode from './DocsCode/DocsCode.vue'
import DocsTable from './DocsTable/DocsTable.vue'
import DocsComponentApi from './DocsComponentApi/DocsComponentApi.vue'
import DocsHeadline from './DocsHeadline/DocsHeadline.vue'
import DocsLink from './DocsLink/DocsLink.vue'
import DocsAlert from './DocsAlert/DocsAlert.vue'
import DocsComponent from './DocsComponent/DocsComponent.vue'

export const blockComponents = {
  MarkdownView,
  DocsExample,
  DocsExampleBlock,
  DocsCode,
  DocsTable,
  DocsComponentApi,
  DocsHeadline,
  DocsLink,
  DocsAlert,
  DocsComponent,
}

/** Map for better IDE support */
export type BlockComponents = typeof blockComponents
