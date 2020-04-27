<template>
  <component :is="componentType" :class="{'code': componentType === 'pre'}">
    {{ $t(block.text) }} <a v-if="isSubtitle" :id="textToKebab" :style="{'color': primaryColor}" :href="`#${textToKebab}`">#</a>
  </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Block, BlockType } from '../../types/configTypes.ts'

@Component({})
export default class DynamicTemplate extends Vue {
  data () {
    return {
      textTypes: {
        [BlockType.TITLE]: 'h1',
        [BlockType.SUBTITLE]: 'h3',
        [BlockType.PARAGRAPH]: 'p',
        [BlockType.CODE]: 'pre',
        [BlockType.HEADLINE]: 'h5',
      },
    }
  }

  @Prop({ required: true }) readonly block: Block[]

  get textToKebab () {
    return this.$t(this.block.text)?.toLowerCase().replace(' ', '-')
  }

  get isSubtitle () {
    return this.block.type === BlockType.SUBTITLE
  }

  get componentType () {
    return this.block.type === BlockType.COMPONENT ? this.block.component : this.textTypes[this.block.type]
  }

  get primaryColor () {
    return this.$themes?.primary
  }
}
</script>

<style lang="scss" scoped></style>
