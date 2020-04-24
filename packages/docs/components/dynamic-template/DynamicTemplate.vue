<template>
  <component :is="componentType">
    {{ block.text }}
  </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Block, BlockType } from '../../types/configTypes.ts'

@Component({})
export default class DynamicTemplate extends Vue {
  data () {
    return {
      textTypes: { [BlockType.TITLE]: 'h1' },
    }
  }

  @Prop({ required: true }) readonly block: Block[]

  get componentType () {
    return this.block.type === BlockType.COMPONENT ? this.block.component : this.textTypes[this.block.type]
  }
}
</script>

<style lang="scss" scoped></style>
