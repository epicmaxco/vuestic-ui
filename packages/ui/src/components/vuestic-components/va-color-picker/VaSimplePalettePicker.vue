<template>
  <div class="va-simple-palette-picker">
    <ul class="va-simple-palette-picker__colors">
      <color-dot
        v-for="(color, index) in palette"
        :key="index"
        :color="color"
        @click="handlerClick(color)"
        :selected="isSelected(color)"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import ColorDot from './ColorDot.vue'

@Options({
  name: 'VaSimplePalettePicker',
  components: {
    ColorDot,
  },
  emits: ['update:modelValue'],
})
export default class VaSimplePalettePicker extends Vue {
  @Prop({
    type: String,
    default: '',
  }) readonly modelValue!: string

  @Prop({
    type: Array,
    default: () => [],
  }) readonly palette!: Array<string>

  get valueProxy (): any {
    return this.modelValue
  }

  set valueProxy (value: any) {
    this.$emit('update:modelValue', value)
  }

  isSelected (color: any): boolean {
    return this.modelValue === color
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
