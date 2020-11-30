<template>
  <div class="va-color-input">
    <va-color-indicator
      class="va-color-input__dot"
      :selected="selected"
      :color="value"
      :indicator="indicator"
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
import { Vue, Options } from 'vue-class-component'
import VaColorIndicator from '../va-color-palette/VaColorIndicator.vue'
import VaInput from '../va-input/VaInput.vue'

@Options({
  name: 'VaColorInput',
  components: {
    VaInput,
    VaColorIndicator,
  },
})
export default class VaColorInput extends Vue {
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
    type: Boolean,
    default: false,
  }) readonly selected!: boolean

  @Prop({
    type: Boolean,
    default: false,
  }) readonly disabled!: boolean

  get valueProxy (): any {
    return this.value
  }

  set valueProxy (value: any) {
    this.$emit('input', value)
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
