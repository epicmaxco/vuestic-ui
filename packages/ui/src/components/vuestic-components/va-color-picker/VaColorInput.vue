<template>
  <div class="va-color-input">
    <color-dot
      class="va-color-input__dot"
      :selected="selected"
      :color="modelValue"
      @click="onClick"
    />
    <va-input
      class="va-color-input__input"
      v-model="valueProxy"
      :disabled="disabled"
      placeholder="input color"
    />
  </div>
</template>

<script lang="ts">
import { Prop } from 'vue-property-decorator'
import ColorDot from './ColorDot.vue'
import VaInput from '../va-input/VaInput.vue'
import { Vue, Options } from 'vue-class-component'

@Options({
  name: 'VaColorInput',
  components: {
    VaInput,
    ColorDot,
  },
  emits: ['update:modelValue', 'click'],
})
export default class VaColorInput extends Vue {
  @Prop({
    type: String,
    default: '',
  }) readonly modelValue!: string

  @Prop({
    type: Boolean,
    default: false,
  }) readonly selected!: boolean

  @Prop({
    type: Boolean,
    default: false,
  }) readonly disabled!: boolean

  get valueProxy (): any {
    return this.modelValue
  }

  set valueProxy (value: any) {
    this.$emit('update:modelValue', value)
  }

  onClick (): void {
    this.$emit('click')
  }
}
</script>

<style lang="scss" scoped>
.va-color-input {
  display: flex;
  align-items: center !important;

  .form-group {
    margin-bottom: 0;
  }

  &__input {
    margin-bottom: 0;
    width: 9ch;

    &__pointer {
      cursor: pointer;
    }
  }
}

</style>
