<template>
  <div class="va-color-palette">
    <ul class="va-color-palette__colors">
      <va-color-indicator
        v-for="(color, index) in palette"
        :modelValue="context.valueComputed === color"
        :key="index"
        :color="color"
        :square="indicator === 'square'"
        @update:modelValue="context.valueComputed = color"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop, setup } from 'vue-class-component'
import { statefulComponentOptions, useStateful } from '../../mixins/StatefulMixin/cStatefulMixin'
import VaColorIndicator from '../va-color-indicator'

class ColorPaletteProps {
  indicator = prop<string>({
    type: String,
    default: 'dot',
    validator: (value: string) => {
      return ['dot', 'square'].includes(value)
    },
  })

  palette = prop<Array<string>>({
    type: Array,
    default: () => [],
  })
}

@Options({
  name: 'VaColorPalette',
  components: { VaColorIndicator },
  ...statefulComponentOptions,
})
export default class VaColorPalette extends Vue.with(ColorPaletteProps) {
  context = setup(() => useStateful(this.$props, this.$emit))

  isSelected (color: any): boolean {
    return this.context.valueComputed === color
  }
}
</script>

<style lang="scss">
.va-color-palette {
  padding-top: 3px;

  &__colors {
    display: flex;

    & > * {
      margin-right: 0.25rem;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
