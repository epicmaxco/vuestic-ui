<template>
  <va-content>
    <template v-for="(block, index) in config">
      <DocsExample
        v-if="block.type === BlockType.EXAMPLE"
        :key="index"
        :value="block.component"
      />
      <DocsCode
        v-else-if="block.type === BlockType.CODE"
        :key="index"
        :code="block.code"
      />
      <ApiDocs
        v-else-if="BlockType.API === block.type"
        :key="index"
        :component-options="block.componentOptions"
        :api-options="block.apiOptions"
      />
      <DocsFaq
        v-else-if="BlockType.FAQ === block.type"
        :key="index"
        :items="block.items"
      />
      <DocsSubtitle
        v-else-if="block.type === BlockType.SUBTITLE"
        :key="index"
        :text="block.translationString"
      />
      <component v-else :key="index" :is="blockTags[block.type]">
        <MarkdownView :value="$t(block.translationString)" />
      </component>
    </template>
  </va-content>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ApiDocsBlock, BlockType, TextBlockType } from '../types/configTypes'
import MarkdownView from '../utilities/markdown-view/MarkdownView.vue'
import DocsExample from './DocsExample.vue'
import DocsCode from './DocsCode.vue'
import DocsSubtitle from './DocsSubtitle.vue'
import DocsFaq from './DocsFaq.vue'
import ApiDocs from 'vuestic-ui/src/services/api-docs/ApiDocs.vue'

@Component({
  components: {
    DocsExample,
    DocsCode,
    DocsSubtitle,
    DocsFaq,
    MarkdownView,
    ApiDocs,
  },
})
export default class DocsContent extends Vue {
  private blockTags: Pick<
    Record<BlockType, string>,
    Exclude<TextBlockType, BlockType.SUBTITLE>
  > = {
    [BlockType.TITLE]: 'h1',
    [BlockType.PARAGRAPH]: 'p',
    [BlockType.HEADLINE]: 'h5',
  }

  @Prop() config!: ApiDocsBlock[]

  get DocsFaq () {
    return DocsFaq
  }

  get BlockType () {
    return BlockType
  }
}
</script>
