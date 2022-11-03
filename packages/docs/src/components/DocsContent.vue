<template>
  <va-content>
    <template v-for="(block, index) in config">
      <DocsExample
        v-if="block.type === BlockType.EXAMPLE"
        :key="BlockType.EXAMPLE + index"
        :value="block.component"
        :path="block.path"
        :example-options="block.exampleOptions"
      />
      <DocsComponent
        v-if="block.type === BlockType.COMPONENT"
        :key="BlockType.COMPONENT + index"
        :value="block.component"
        :path="block.path"
        :bind="block.bind"
      />
      <DocsCode
        v-else-if="block.type === BlockType.CODE"
        :key="BlockType.CODE + index"
        :code="block.code"
        :language="block.language"
      />
      <ApiDocs
        v-else-if="block.type === BlockType.API"
        :key="BlockType.API + index"
        :component-options="block.componentOptions"
        :api-options="block.apiOptions"
      />
      <MarkdownView
        v-else-if="block.type === BlockType.TITLE"
        class="docs-title"
        :key="BlockType.TITLE + index"
        :value="`# ${$t(block.translationString)}`"
      />
      <DocsSubtitle
        v-else-if="block.type === BlockType.SUBTITLE"
        :key="BlockType.SUBTITLE + index"
        :text="block.translationString"
      />
      <DocsHeadline
        v-else-if="block.type === BlockType.HEADLINE"
        :key="BlockType.HEADLINE + index"
        :text="block.translationString"
      />
      <MarkdownView
        v-else-if="block.type === BlockType.PARAGRAPH"
        :key="BlockType.PARAGRAPH + index"
        :value="`${$tie(block.translationString)}`"
      />
      <MarkdownView
        v-else-if="block.type === BlockType.LIST"
        :key="BlockType.LIST + index"
        :value="translateAndMark(block.translationStringList)"
      />
      <DocsTable
        v-else-if="block.type === BlockType.TABLE"
        :key="BlockType.TABLE + index"
        :columns="block.columns"
        :tableData="block.tableData"
        :title="block.title"
      />
      <DocsLink
        v-else-if="block.type === BlockType.LINK"
        :key="BlockType.LINK + index"
        :href="block.href"
        :text="block.text"
        v-bind="block.options"
      />
      <DocsAlert
        v-else-if="block.type === BlockType.ALERT"
        :key="BlockType.ALERT + index"
        :text="block.translationString"
        :color="block.color"
      />
      <DocsFile
        v-else-if="block.type === BlockType.FILE"
        :key="BlockType.FILE + index"
        :file="block.file"
      />
      <MarkdownView
        v-else-if="block.type === BlockType.MARKDOWN"
        :key="BlockType.MARKDOWN + index"
        :value="block.content"
      />
      <VaCollapse
        v-else-if="block.type === BlockType.COLLAPSE"
        :key="BlockType.COLLAPSE + index"
        :header="block.header"
        solid
      >
        <div class="pa-4">
          <DocsContent :config="block.blocks" />
        </div>
      </VaCollapse>
      <DocsFileStructure
        v-else-if="block.type === BlockType.FILE_STRUCTURE"
        :key="BlockType.FILE_STRUCTURE + index"
        :files="block.files"
      />
    </template>
  </va-content>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ApiDocsBlock, BlockType } from '../types/configTypes'
import { tie } from '../locales/translateIfExistsPlugin'
import MarkdownView from './markdown-view/MarkdownView.vue'
import DocsExample from './DocsExample.vue'
import DocsComponent from './DocsComponent.vue'
import DocsCode from './DocsCode.vue'
import DocsHeadline from './DocsHeadline.vue'
import DocsSubtitle from './DocsSubtitle.vue'
import ApiDocs from './DocsApi/ApiDocs.vue'
import DocsTable from './DocsTable/DocsTable.vue'
import DocsLink from './DocsLink.vue'
import DocsAlert from './DocsAlert.vue'
import DocsFile from './DocsFile.vue'
import DocsFileStructure from './DocsFileStructure.vue'

export default defineComponent({
  name: 'DocsContent',
  props: {
    config: { type: Array as PropType<ApiDocsBlock[]> },
  },
  components: {
    DocsExample,
    DocsComponent,
    DocsCode,
    DocsHeadline,
    DocsSubtitle,
    MarkdownView,
    ApiDocs,
    DocsTable,
    DocsLink,
    DocsAlert,
    DocsFile,
    DocsFileStructure,
  },
  setup: () => {
    const translateAndMark = (translations: string[]): string => translations
      .map((t: string): string => `- ${tie(t)}`)
      .join('\n')

    return {
      BlockType,
      translateAndMark,
    }
  },
})
</script>
