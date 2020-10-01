<template>
  <div class="va-palette-custom">
    <va-color-palette
      class="va-palette-custom__palette mr-2"
      :palette="palette"
      v-model="valueProxy"
    />
    <va-color-picker
      class="va-palette-custom__input"
      mode="advanced"
      v-model="valueProxy"
    >
      <va-color-input
        :selected="dotIsSelected"
        v-model="valueProxy"
      />
    </va-color-picker>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import VaColorPicker from './VaColorPicker.vue'
import VaColorPalette from './VaColorPalette.vue'
import VaColorInput from './VaColorInput.vue'

@Component({
  name: 'VaPaletteCustom',
  components: {
    VaColorInput,
    VaColorPicker,
    VaColorPalette,
  },
})
export default class VaPaletteCustom extends Vue {
  @Prop({
    type: String,
    default: '',
  }) readonly value!: string

  @Prop({
    type: Array,
    default: () => [],
  }) readonly palette!: Array<string>

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
.va-palette-custom {
  display: flex;
  align-items: baseline !important;
}
</style>
