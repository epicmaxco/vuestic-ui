<template>
  <component
    v-if="componentTypes.includes(block.type)"
    :is="block.component"
  />
  <component
    v-else-if="block.type === BlockType.CODE"
    :is="blockTags[BlockType.CODE]"
    :code="block.code"
  />
  <component
    v-else
    :is="blockTags[block.type]">
  {{ $t(block.translationString) }}
    <a v-if="this.block.type === BlockType.SUBTITLE"
      :id="textToKebab"
      :style="{'color': primaryColor}"
      :href="`#${textToKebab}`">#</a>
  </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ApiDocsBlock, BlockType } from '../../types/configTypes'
import Code from '../Code.vue'
import { kebabCase } from 'lodash'

@Component({})
export default class DynamicTemplate extends Vue {
  @Prop({ required: true }) block!: ApiDocsBlock

  data () {
    return {
      componentTypes: [BlockType.API, BlockType.COMPONENT],
      blockTags: {
        [BlockType.TITLE]: 'h1',
        [BlockType.SUBTITLE]: 'h3',
        [BlockType.PARAGRAPH]: 'p',
        [BlockType.CODE]: Code,
        [BlockType.HEADLINE]: 'h5',
      },
    }
  }

  get textToKebab () {
    return kebabCase(this.$t(this.block.translationString))
  }

  get primaryColor () {
    return this.$themes?.primary
  }

  get BlockType () {
    return BlockType
  }
}
</script>
