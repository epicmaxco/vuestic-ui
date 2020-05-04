<template>
  <Example
    v-if="block.type === BlockType.EXAMPLE"
    :value="block.component"
    :namespace="block.namespace"
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
import { ApiDocsBlock, BlockType, TextBlock } from '../../types/configTypes'
import Example from '../../components/Example.vue'
import { kebabCase } from 'lodash'

@Component({
  components: {
    Example,
  },
})
export default class DynamicTemplate extends Vue {
  private blockTags: Pick<
    Record<BlockType, string>,
    TextBlock
  > = {
    [BlockType.TITLE]: 'h1',
    [BlockType.SUBTITLE]: 'h3',
    [BlockType.PARAGRAPH]: 'p',
    [BlockType.HEADLINE]: 'h5',
  }

  @Prop({ required: true }) readonly block!: ApiDocsBlock

  get anchor () {
    if (this.block.type !== BlockType.SUBTITLE) {
      return undefined
    }
    return kebabCase(this.$t(this.block.translationString) as string)
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
