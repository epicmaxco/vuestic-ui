<template>
  <div
    class="color-indicator"
    @click="$emit('click')"
    :class="{'color-indicator--selected': selected}"
    :style="{'border-radius': indicator === 'square' ? 0 : '50%'}"
  >
    <div
      class="color-indicator__core"
      :style="{'background-color': color, 'border-radius': indicator === 'square' ? 0 : '50%'}"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'VaColorIndicator',
})
export default class VaColorIndicator extends Vue {
  @Prop({
    type: String,
    default: '',
  }) readonly color!: string

  @Prop({
    type: String,
    default: 'dot',
    validator: (value: string) => {
      return ['dot', 'square'].includes(value)
    },
  }) readonly indicator!: string

  @Prop({
    type: Boolean,
    default: false,
  }) readonly selected!: boolean
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.color-indicator {
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
    transition: transform 0.1s linear;
    display: inline-block;
    vertical-align: baseline;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;

    &:hover {
      transform: scale(1.3);
      transition: transform 0.1s linear;
    }
  }
}
</style>
