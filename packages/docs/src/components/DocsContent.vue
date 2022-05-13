<template>
  <va-content>
    <template v-for="(block, index) in config">
      <DocsExample
        v-if="block.type === BlockType.EXAMPLE"
        :key="block.type + index"
        :value="block.component"
        :path="block.path"
        :example-options="block.exampleOptions"
      />
      <DocsComponent
        v-if="block.type === BlockType.COMPONENT"
        :key="block.type + index"
        :value="block.component"
        :path="block.path"
      />
      <DocsCode
        v-else-if="block.type === BlockType.CODE"
        :key="block.type + index"
        :code="block.code"
        :language="block.language"
      />
      <ApiDocs
        v-else-if="block.type === BlockType.API"
        :key="block.type + index"
        :component-options="block.componentOptions"
        :api-options="block.apiOptions"
      />
      <MarkdownView
        v-else-if="block.type === BlockType.TITLE"
        :key="block.type + index"
        :value="`# ${$t(block.translationString)}`"
      />
      <DocsSubtitle
        v-else-if="block.type === BlockType.SUBTITLE"
        :key="block.type + index"
        :text="block.translationString"
      />
      <DocsHeadline
        v-else-if="block.type === BlockType.HEADLINE"
        :key="block.type + index"
        :text="block.translationString"
      />
      <MarkdownView
        v-else-if="block.type === BlockType.PARAGRAPH"
        :key="block.type + index"
        :value="`${$tie(block.translationString)}`"
      />
      <MarkdownView
        v-else-if="block.type === BlockType.LIST"
        :key="block.type + index"
        :value="translateAndMark(block.translationStringList)"
      />
      <DocsTable
        v-else-if="block.type === BlockType.TABLE"
        :key="block.type + index"
        :columns="block.columns"
        :tableData="block.tableData"
        :title="block.title"
      />
      <DocsLink
        v-else-if="block.type === BlockType.LINK"
        :key="block.type + index"
        :href="block.href"
        :text="block.text"
        v-bind="block.options"
      />
      <DocsAlert
        v-else-if="block.type === BlockType.ALERT"
        :key="block.type + index"
        :text="block.translationString"
        :color="block.color"
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

<style lang="scss">
.va-content p {
  font-size: 1.2rem;
}

.va-content h5 {
  margin-top: 4rem;
  line-height: 1.25;

  &:first-of-type {
    margin-top: 1.25rem;
    margin-bottom: 0.75rem;
  }
}
</style>
