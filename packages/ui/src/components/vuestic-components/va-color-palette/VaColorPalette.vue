<template>
  <div class="va-color-palette">
    <ul class="va-color-palette__colors">
      <va-color
        v-for="(color, index) in palette"
        :key="index"
        :color="color"
        @click="handlerClick(color)"
        :indicator="indicator"
        :selected="valueComputed === color"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop, mixins } from 'vue-class-component'
import { StatefulMixin } from '../../vuestic-mixins/StatefulMixin/StatefulMixin'
import VaColor from './VaColorIndicator.vue'

class ColorPaletteProps {
  modelValue = prop<string>({
    type: String,
    default: '',
  })

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

const ColorPalettePropsMixin = Vue.with(ColorPaletteProps)

@Options({
  name: 'VaColorPalette',
  components: { VaColor },
})
export default class VaColorPalette extends mixins(ColorPalettePropsMixin, StatefulMixin) {
  isSelected (color: any): boolean {
    return this.valueComputed === color
  }

  handlerClick (color: any): void {
    this.valueComputed = color
  }
}
</script>

<style lang="scss" scoped>
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
