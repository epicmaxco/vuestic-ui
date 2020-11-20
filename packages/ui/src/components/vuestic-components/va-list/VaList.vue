<template>
  <div
    class="va-list"
    :class="computedClass"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'VaList',
})
export default class VaList extends Vue {
  @Prop({ type: Boolean, default: false }) fit!: boolean

  get computedClass () {
    return { 'va-list--fit': this.fit }
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-list {
  padding: $list-padding;
  background-color: #ffffff;
  width: 100%;

  &--fit {
    width: fit-content;
  }
}
</style>
