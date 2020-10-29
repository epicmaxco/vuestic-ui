<template>
  <ChromePicker
    v-model="valueProxy"
    class="va-advanced-color-picker"
  />
</template>

<script lang="ts">
import { Prop } from 'vue-property-decorator'
// @ts-ignore
import { Chrome } from 'vue-color'
import { Vue, Options } from 'vue-class-component'

@Options({
  name: 'VaAdvancedColorPicker',
  components: { ChromePicker: Chrome },
  emits: ['update:modelValue'],
})
export default class VaAdvancedColorPicker extends Vue {
  @Prop({
    type: String,
    default: '',
  }) readonly modelValue!: string

  get valueProxy (): any {
    return this.modelValue
  }

  set valueProxy (value: any) {
    this.$emit('update:modelValue', value.hex)
  }
}
</script>

<style lang="scss">
.va-advanced-color-picker {
  .vc-chrome-alpha-wrap {
    display: none;
  }

  .vc-chrome-hue-wrap {
    margin-top: 10px;
  }

  .vc-chrome-toggle-btn {
    display: none;
  }
}
</style>
