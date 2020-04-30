<template>
  <component
    v-if="block.type === BlockType.API"
    :is="block.component"
  />
  <component
    v-else
    :is="tag"
    :class="{'code': isCode}">
  {{ isCode ? block.code : $t(block.text) }}
    <a v-if="isSubtitle"
      :id="textToKebab"
      :style="{'color': primaryColor}"
      :href="`#${textToKebab}`">#</a>
  </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ApiDocsBlock, BlockType } from '../../types/configTypes'
import { kebabCase } from 'lodash'

@Component
export default class DynamicTemplate extends Vue {
  private blockTags: Record<string, any> = {
    [BlockType.TITLE]: 'h1',
    [BlockType.SUBTITLE]: 'h3',
    [BlockType.PARAGRAPH]: 'p',
    [BlockType.CODE]: 'pre',
    [BlockType.HEADLINE]: 'h5',
  }

  @Prop({ required: true }) readonly block!: ApiDocsBlock

  get isCode () {
    return this.block?.type === BlockType.CODE
  }

  get textToKebab () {
    if (!this.block) {
      return null
    }

    return kebabCase(this.$t(this.block.text) as string)
  }

  get isSubtitle () {
    return this.block?.type === BlockType.SUBTITLE
  }

  get tag () {
    if (!this.block) {
      return null
    }

    return this.block.type === BlockType.COMPONENT
      ? this.block.component
      : this.blockTags[this.block.type]
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
