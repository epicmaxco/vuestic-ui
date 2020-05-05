<template>
  <DocsExample
    v-if="block.type === BlockType.EXAMPLE"
    :value="block.component"
  />
  <DocsCode
    v-else-if="block.type === BlockType.CODE"
    :code="block.code"
  />
  <component v-else-if="block.type === BlockType.API" :is="block.component" />
  <component
    v-else-if="block.type === BlockType.SUBTITLE"
    :is="blockTags[block.type]"
  >
    {{ $t(block.translationString) }}
    <a :id="anchor" :style="{ color: primaryColor }" :href="`#${anchor}`">#</a>
  </component>
  <component v-else :is="blockTags[block.type]">
    {{ $t(block.translationString) }}
  </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ApiDocsBlock, BlockType, TextBlockType, TextBlock } from '../../types/configTypes'
import DocsExample from '../DocsExample.vue'
import DocsCode from '../DocsCode.vue'
import { kebabCase } from 'lodash'

@Component({
  components: {
    DocsExample, DocsCode,
  },
})
export default class DynamicTemplate extends Vue {
  private blockTags: Pick<
    Record<BlockType, string>,
    TextBlockType
  > = {
    [BlockType.TITLE]: 'h1',
    [BlockType.SUBTITLE]: 'h3',
    [BlockType.PARAGRAPH]: 'p',
    [BlockType.HEADLINE]: 'h5',
  }

  @Prop({ required: true }) readonly block!: ApiDocsBlock

  get anchor () {
    return kebabCase(this.$t((this.block as TextBlock).translationString) as string)
  }

  get primaryColor () {
    return this.$themes?.primary
  }

  get BlockType () {
    return BlockType
  }
}
</script>

<style lang="scss" scoped></style>
