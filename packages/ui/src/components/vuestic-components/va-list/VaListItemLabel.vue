<template>
  <div
    class="va-list-item-label"
    :class="computedClass"
    :style="computedStyle"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'

@Component({
  name: 'VaListItemLabel',
})
export default class VaListItemLabel extends Vue {
  @Prop({ type: Boolean, default: false }) caption!: boolean
  @Prop({ type: Number, default: 1 }) lines!: number

  get computedClass () {
    return { 'va-list-item-label--caption': this.caption }
  }

  get computedStyle () {
    return {
      '-webkit-line-clamp': this.lines,
    }
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-list-item-label {
  color: $vue-darkest-blue;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;

  &--caption {
    font-size: $font-size-smaller;
    color: $brand-secondary;
    line-height: 1.3rem;
  }
}
</style>
