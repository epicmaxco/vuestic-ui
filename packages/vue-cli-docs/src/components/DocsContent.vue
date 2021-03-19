<template>
  <va-content>
    <template v-for="(block, index) in config">
      <DocsExample
        v-if="block.type === BlockType.EXAMPLE"
        :key="block.type + index"
        :value="block.component"
      />
      <DocsCode
        v-else-if="block.type === BlockType.CODE"
        :key="block.type + index"
        :code="block.code"
      />
      <ApiDocs
        v-else-if="BlockType.API === block.type"
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
      <MarkdownView
        v-else-if="block.type === BlockType.HEADLINE"
        :key="block.type + index"
        :value="`##### ${$t(block.translationString)}`"
      />
      <MarkdownView
        v-else-if="block.type === BlockType.PARAGRAPH"
        :key="block.type + index"
        :value="`${$t(block.translationString)}`"
      />
    </template>
  </va-content>
</template>

<script lang="ts">
import { Options, Vue, prop, mixins } from 'vue-class-component'
import { ApiDocsBlock, BlockType } from '../types/configTypes'
import MarkdownView from '../utilities/markdown-view/MarkdownView.vue'
import DocsExample from './DocsExample.vue'
import DocsCode from './DocsCode.vue'
import DocsSubtitle from './DocsSubtitle.vue'
import ApiDocs from './DocsApi/ApiDocs.vue'

class Props {
  config = prop<ApiDocsBlock[]>({})
}

const PropsMixin = Vue.with(Props)

@Options({
  components: {
    DocsExample,
    DocsCode,
    DocsSubtitle,
    MarkdownView,
    ApiDocs,
  },
})
export default class DocsContent extends mixins(PropsMixin) {
  get BlockType () {
    return BlockType
  }
}
</script>
