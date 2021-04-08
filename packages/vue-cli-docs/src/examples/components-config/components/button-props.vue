<template>
  <table>
    <tr class="field" v-for="field in buttonProps" :key="field.name">
      <td class="prop">{{ field.name }}: </td>
      <td>
        <template v-if="field.type === String">
          <va-input v-model="field.value" />
        </template>
        <template v-if="field.type === Boolean">
          <va-checkbox v-model="field.value" />
        </template>
      </td>
    </tr>
  </table>
</template>

<script>
import { toRefs } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
export default {
  name: 'ButtonProps',
  emits: ['update:modelValue'],
  props: {
    modelValue: { type: Object },
  },
  setup (props, ctx) {
    const { modelValue: buttonProps } = toRefs(props)

    watch(buttonProps, () => {
      ctx.emit('update:modelValue', buttonProps.value)
    }, { deep: true })

    return {
      buttonProps,
    }
  },
}
</script>

<style lang="scss" scoped>
td {
  padding: 0.2rem 0 0 2rem !important;
}
</style>
