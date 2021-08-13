<template>
  <div class="va-color-input">
    <va-color-indicator
      class="va-color-input__dot"
      :color="context.valueComputed"
      :indicator="indicator"
    />
    <va-input
      class="va-color-input__input"
      v-model="context.valueComputed"
      :disabled="disabled"
      placeholder="input color"
    />
  </div>
</template>

<script lang="ts">
import { useStateful, statefulComponentOptions } from '../../mixins/StatefulMixin/cStatefulMixin'
import { Vue, Options, prop, setup } from 'vue-class-component'
import VaColorIndicator from '../va-color-indicator'
import VaInput from '../va-input'

class ColorInputProps {
  modelValue = prop<string>({
    type: String,
    default: '',
  })

  indicator = prop<string>({
    type: String,
    default: 'dot',
    validator: (value: string) => {
      return ['dot', 'square'].includes(value)
    },
  })

  disabled = prop<boolean>({
    type: Boolean,
    default: false,
  })
}

@Options({
  name: 'VaColorInput',
  components: {
    VaInput,
    VaColorIndicator,
  },
  ...statefulComponentOptions,
})
export default class VaColorInput extends Vue.with(ColorInputProps) {
  context = setup(() => useStateful(this.$props, this.$emit))
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
    min-width: 5.6rem;

    &__pointer {
      cursor: pointer;
    }
  }
}

</style>
