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
      <MarkdownView
        v-else-if="block.type === BlockType.TITLE"
        :key="index"
        :value="`# ${$t(block.translationString)}`"
      />
      <DocsSubtitle
        v-else-if="block.type === BlockType.SUBTITLE"
        :key="index"
        :text="block.translationString"
      />
      <MarkdownView
        v-else-if="block.type === BlockType.HEADLINE"
        :key="index"
        :value="`##### ${$t(block.translationString)}`"
      />
      <MarkdownView
        v-else-if="block.type === BlockType.PARAGRAPH"
        :key="index"
        :value="`${$t(block.translationString)}`"
      />
    </template>
  </va-content>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ApiDocsBlock, BlockType } from '../types/configTypes'
import MarkdownView from '../utilities/markdown-view/MarkdownView.vue'
import DocsExample from './DocsExample.vue'
import DocsCode from './DocsCode.vue'
import DocsSubtitle from './DocsSubtitle.vue'
import ApiDocs from 'vuestic-ui/src/services/api-docs/ApiDocs.vue'

@Component({
  components: {
    DocsExample,
    DocsCode,
    DocsSubtitle,
    MarkdownView,
    ApiDocs,
  },
})
export default class DocsContent extends Vue {
  @Prop() config!: ApiDocsBlock[]

  get BlockType () {
    return BlockType
  }
}
</script>
