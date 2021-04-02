<template>
  <div class="va-color-palette-advanced">
    <va-color-palette
      class="va-color-palette-advanced__palette mr-2"
      :palette="palette"
      v-model="valueProxy"
      :indicator="indicator"
    />
    <va-color-input-advanced
      class="va-color-palette-advanced__input"
      mode="advanced"
      v-model="valueProxy"
    >
      <va-color-input
        :selected="dotIsSelected"
        v-model="valueProxy"
        :indicator="indicator"
      />
    </va-color-input-advanced>
  </div>
</template>

<script lang="ts">
import VaColorInputAdvanced from '../va-color-input/VaColorInputAdvanced.vue'
import VaColorPalette from './VaColorPalette.vue'
import VaColorInput from '../va-color-input/VaColorInput.vue'
import { Vue, Options, prop } from 'vue-class-component'

class VaColorPaletteAdvancedProps {
  value = prop<string>({ type: String, default: '' })

  indicator = prop<string>({
    type: String,
    default: 'dot',
    validator: (value: string) => {
      return ['dot', 'square'].includes(value)
    },
  })

  palette = prop<string[]>({
    type: Array,
    default: () => [],
  })
}

@Options({
  name: 'VaColorPaletteAdvanced',
  components: {
    VaColorInput,
    VaColorInputAdvanced,
    VaColorPalette,
  },
})
export default class VaColorPaletteAdvanced extends Vue.with(VaColorPaletteAdvancedProps) {
  get valueProxy (): any {
    return this.value
  }

  set valueProxy (value: any) {
    this.$emit('input', value)
  }

  get dotIsSelected (): boolean {
    return this.palette.includes(this.value)
  }
}
</script>

<style lang="scss">
.va-color-palette-advanced {
  display: flex;
  align-items: baseline !important;
}
</style>
