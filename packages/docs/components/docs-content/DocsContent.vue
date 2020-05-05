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
      <component
        v-else-if="[BlockType.API, BlockType.FAQ].includes(block.type)"
        :key="index"
        :is="block.component"
      />
      <DocsSubtitle
        v-else-if="block.type === BlockType.SUBTITLE"
        :key="index"
        :text="block.translationString"
      />
      <component v-else :key="index" :is="blockTags[block.type]">
        {{ $t(block.translationString) }}
      </component>
    </template>
  </va-content>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ApiDocsBlock, BlockType, TextBlockType } from '../../types/configTypes'
import DocsExample from '../DocsExample.vue'
import DocsCode from '../DocsCode.vue'
import DocsSubtitle from '../DocsSubtitle.vue'

@Component({
  components: {
    DocsExample,
    DocsCode,
    DocsSubtitle,
  },
})
export default class DocsContent extends Vue {
  private blockTags: Pick<
    Record<BlockType, string>,
    TextBlockType
  > = {
    [BlockType.TITLE]: 'h1',
    [BlockType.SUBTITLE]: 'h3',
    [BlockType.PARAGRAPH]: 'p',
    [BlockType.HEADLINE]: 'h5',
  }

  @Prop() config!: ApiDocsBlock[]

  get BlockType () {
    return BlockType
  }
}
</script>
