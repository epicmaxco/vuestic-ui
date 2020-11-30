<template>
  <div class="va-color-input-advanced">
    <div v-if="validator(this.mode)">
      <va-dropdown-popper fixed>
        <div
          slot="anchor"
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
        <div class="va-color-input-advanced__dropdown">
          <va-color-picker
            v-if="this.mode === 'advanced'"
            v-model="valueProxy"
          />
          <va-color-palette
            v-if="this.mode === 'palette'"
            v-model="valueProxy"
            :palette="palette"
          />
          <va-color-slider
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
          :indicator="indicator"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop } from 'vue-property-decorator'
import { Vue, Options } from 'vue-class-component'
import VaColorPicker from '../va-color-picker/VaColorPicker.vue'
import VaColorPalette from '../va-color-palette/VaColorPalette.vue'
import VaColorSlider from '../va-color-slider/VaColorSlider.vue'
import VaColorInput from '../va-color-input/VaColorInput.vue'
import VaDropdownPopper from '../va-dropdown/VaDropdown.vue'

@Options({
  name: 'VaColorInputAdvanced',
  components: {
    VaDropdownPopper,
    VaColorPalette,
    VaColorPicker,
    VaColorSlider,
    VaColorInput,
  },
})
export default class VaColorInputAdvanced extends Vue {
  @Prop({
    type: String,
    default: '',
  }) readonly value!: string

  @Prop({
    type: String,
    default: 'dot',
    validator: (value: string) => {
      return ['dot', 'square'].includes(value)
    },
  }) readonly indicator!: string

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
