<template>
  <ChromePicker
    v-model="valueProxy"
    class="va-color-picker"
  />
</template>

<script lang="ts">
import { Prop } from 'vue-property-decorator'
import { Vue, Options } from 'vue-class-component'
// @ts-ignore
import { Chrome } from 'vue-color'

@Options({
  name: 'VaColorPicker',
  components: { ChromePicker: Chrome },
})
export default class VaColorPicker extends Vue {
  @Prop({
    type: String,
    default: '',
  }) readonly value!: string

  get valueProxy (): any {
    return this.value
  }

  set valueProxy (value: any) {
    this.$emit('input', value.hex)
  }
}
</script>

<style lang="scss">
.va-color-picker {
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
