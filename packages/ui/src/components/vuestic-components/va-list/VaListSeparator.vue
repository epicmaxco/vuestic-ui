<template>
  <div
    class="va-list-separator"
    :class="computedClass"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'VaListSeparator',
})
export default class VaListSeparator extends Vue {
  @Prop({ type: Boolean, default: false }) fit!: boolean
  @Prop({ type: Boolean, default: false }) spaced!: boolean

  get computedClass () {
    return {
      'va-list-separator--offset': !this.fit,
      'va-list-separator--spaced': this.spaced,
    }
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-list-separator {
  height: 1px;
  background-color: $separator-color;

  &--offset {
    margin-left: 1.5rem;
  }

  &--spaced {
    margin: 1.5rem 0;
  }
}
</style>
