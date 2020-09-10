<template>
  <div
    class="color-dot"
    @click="$emit('click')"
    :class="{'color-dot--selected': selected}"
  >
    <div
      class="color-dot__core"
      :style="{'background-color': color}"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'ColorDot',
})
export default class ColorDot extends Vue {
  @Prop({
    type: String,
    default: '',
  }) readonly color!: string

  @Prop({
    type: Boolean,
    default: false,
  }) readonly selected!: boolean
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.color-dot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  min-width: 1.5rem;
  cursor: pointer;
  border-radius: 50%;
  text-align: center;
  border: solid 0.125rem transparent;

  &--selected {
    border-color: $vue-darkest-blue;
  }

  &__core {
    display: inline-block;
    vertical-align: baseline;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
  }
}
</style>
