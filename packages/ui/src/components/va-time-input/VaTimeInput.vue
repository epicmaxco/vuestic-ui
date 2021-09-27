<template>
  <va-dropdown class="va-time-input" v-model="isOpenSync" :offset="[0, 10]" :close-on-content-click="false" :disabled="disabled">
    <template #anchor>
      <va-input v-model="valueText" />
    </template>

    <va-dropdown-content no-padding>
      <va-time-picker v-model="modelValueSync" ref="pickerRef" />
    </va-dropdown-content>
  </va-dropdown>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { VaTimePicker } from '../va-time-picker'
import { useSyncProp } from '../../composables/useSyncProp'

export default defineComponent({
  components: { VaTimePicker },

  props: {
    isOpen: { type: Boolean },
    disabled: { type: Boolean, default: false },
    modelValue: { type: Date, default: undefined },
    format: { type: Function as PropType<(date: Date) => string> },
  },

  setup (props, { emit }) {
    const [isOpenSync] = useSyncProp('isOpen', props, emit)
    const [modelValueSync] = useSyncProp('modelValue', props, emit)
    const pickerRef = ref()

    const valueText = computed(() => {
      if (props.format) { return props.format(modelValueSync.value) }

      if (!modelValueSync.value) { return '' }

      return modelValueSync.value.toLocaleTimeString()
    })

    return {
      pickerRef,
      isOpenSync,
      modelValueSync,
      valueText,
    }
  },
})
</script>
