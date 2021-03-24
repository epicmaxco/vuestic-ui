<template>
  <div class="va-color-input-advanced">
    <div v-if="validator(mode)">
      <va-dropdown fixed>
        <template #anchor>
          <div
            class="va-color-input-advanced__slot"
          >
            <slot>
              <va-color-input
                v-model="valueProxy"
                mode="palette"
                :disabled="isInputDisabled"
                :selected="selected"
                :indicator="indicator"
              />
            </slot>
          </div>
        </template>
        <div class="va-color-input-advanced__dropdown">
          <va-color-picker
            v-if="mode === 'advanced'"
            v-model="valueProxy"
          />
          <va-color-palette
            v-if="mode === 'palette'"
            v-model="valueProxy"
            :palette="palette"
          />
          <va-color-slider
            v-if="mode === 'slider'"
            v-model="valueProxy"
          />
        </div>
      </va-dropdown>
    </div>
    <div v-else>
      <slot>
        <va-color-input
          v-model="valueProxy"
          mode="palette"
          :disabled="isInputDisabled"
          :indicator="indicator"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop, mixins } from 'vue-class-component'
import VaColorPicker, { VaColorInput } from '../va-color-picker'
import VaColorPalette from '../va-color-palette'
import VaColorSlider from '../va-color-slider'
import VaDropdown from '../va-dropdown'

class ColorInputAdvancedProps {
  value = prop<string>({
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

  mode = prop<string>({
    type: String,
    default: '',
  })

  palette = prop<any[]>({
    type: Array,
    default: () => [],
  })

  selected = prop<boolean>({
    type: Boolean,
    default: false,
  })
}

const ColorInputAdvancedPropsMixin = Vue.with(ColorInputAdvancedProps)

@Options({
  name: 'VaColorInputAdvanced',
  components: {
    VaDropdown,
    VaColorPalette,
    VaColorPicker,
    VaColorSlider,
    VaColorInput,
  },
  emits: ['input'],
})
export default class VaColorInputAdvanced extends mixins(ColorInputAdvancedPropsMixin) {
  get valueProxy (): any {
    return this.value
  }

  set valueProxy (value: any) {
    this.$emit('input', value)
  }

  get isInputDisabled () {
    return !!(this.mode === 'palette' && this.palette)
  }

  validator (value: string): boolean {
    return ['palette', 'slider', 'advanced'].includes(value)
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-color-input-advanced {
  &__dropdown {
    background: $white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }

  &__slot {
    cursor: pointer;
  }
}
</style>
