<template>
  <div
    class="va-color-square"
    :style="{'background-color': value}"
  />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Options({
  name: 'VaColorSquare',
})
export default class VaColorSquare extends Vue {
  @Prop({
    type: String,
    default: '',
    required: true,
  }) readonly modelValue!: string
}
</script>

<style lang='scss'>
@import "../../vuestic-sass/resources/resources";

.va-color-square {
  height: 48px;
  width: 48px;
  border: 1px solid $gray-light;
}
</style>
