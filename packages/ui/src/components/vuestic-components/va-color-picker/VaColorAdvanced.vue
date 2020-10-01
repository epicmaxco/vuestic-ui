<template>
  <ChromePicker
    v-model="valueProxy"
    class="va-color-advanced"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
// @ts-ignore
import { Chrome } from 'vue-color'

@Component({
  name: 'VaColorAdvanced',
  components: { ChromePicker: Chrome },
})
export default class VaColorAdvanced extends Vue {
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
.va-color-advanced {
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
