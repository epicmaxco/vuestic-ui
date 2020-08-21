<template>
  <div class="va-simple-palette-picker">
    <ul class="va-simple-palette-picker__colors">
      <color-dot
        v-for="(color, index) in palette"
        :key="index"
        :color="color"
        @click.native="handlerClick(color)"
        :selected="isSelected(color)"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ColorDot from './ColorDot.vue'

@Component({
  name: 'VaSimplePalettePicker',
  components: {
    ColorDot,
  },
})
export default class VaSimplePalettePicker extends Vue {
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

  isSelected (color: any): boolean {
    return this.value === color
  }

  handlerClick (color: any): void {
    this.valueProxy = color
  }
}
</script>

<style lang="scss">
.va-simple-palette-picker {
  padding-top: 3px;

  &__colors {
    padding: 3px;
    display: flex;
  }
}

</style>
