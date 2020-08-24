<template>
  <div
    class="va-color-square"
    :style="{'background-color': value}"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'VaColorSquare',
})
export default class VaColorSquare extends Vue {
  @Prop({
    type: String,
    default: '',
    required: true,
  }) readonly value!: string
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
