<template>
  <div class="va-color-picker-input">
    <div v-if="validator(this.mode)">
      <va-dropdown-popper fixed>
        <div
          slot="anchor"
          class="va-color-picker-input__slot"
        >
          <slot>
            <va-color-input
              v-model="valueProxy"
              mode="palette"
              :disabled="isInputDisabled"
              :selected="selected"
            />
          </slot>
        </div>
        <div class="va-color-picker-input__dropdown">
          <va-advanced-color-picker
            v-if="this.mode === 'advanced'"
            v-model="valueProxy"
          />
          <va-simple-palette-picker
            v-if="this.mode === 'palette'"
            v-model="valueProxy"
            :palette="palette"
          />
          <va-slider-color-picker
            v-if="this.mode === 'slider'"
            v-model="valueProxy"
          />
        </div>
      </va-dropdown-popper>
    </div>
    <div v-else>
      <slot>
        <va-color-input
          v-model="valueProxy"
          mode="palette"
          :disabled="isInputDisabled"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import VaAdvancedColorPicker from './VaAdvancedColorPicker.vue'
import VaSimplePalettePicker from './VaSimplePalettePicker.vue'
import VaSliderColorPicker from './VaSliderColorPicker.vue'
import VaColorInput from './VaColorInput.vue'
import VaDropdownPopper from '../va-dropdown/VaDropdown.vue'

@Component({
  name: 'VaColorPickerInput',
  components: {
    VaDropdownPopper,
    VaSimplePalettePicker,
    VaAdvancedColorPicker,
    VaSliderColorPicker,
    VaColorInput,
  },
})
export default class VaColorPickerInput extends Vue {
  @Prop({
    type: String,
    default: '',
  }) readonly value!: string

  @Prop({
    type: String,
    default: '',
  }) readonly mode!: string

  @Prop({
    type: Array,
    default: () => [],
  }) readonly palette!: Array<string>

  @Prop({
    type: Boolean,
    default: false,
  }) readonly selected!: boolean

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

.va-color-picker-input {
  &__dropdown {
    background: $white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }

  &__slot {
    cursor: pointer;
  }
}
</style>
