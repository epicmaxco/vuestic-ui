<script setup lang="ts">
import { VaIcon, VaProgressCircle } from 'vuestic-ui';

const props = defineProps<{
  icon?: string,
  loading?: boolean,
  outline?: boolean,
}>()

// const $forProp = (name: string, cb: (value: string,) => void) => void 0

const $onCompile = <T>(cb: (props: Record<string, any>) => T) => void 0 as T

// const $defineProp = <T>(name: string) => void

// $defineProp<string>('icon')

// $forProp('cool', (value) => {
//   if (props.cool) {

//   }
// })

const { buttonClass } = $onCompile((props) => {
  if (props.outline) {
    return {
      buttonClass: 'w-full border p-2 rounded hover:bg-gray-100'
    }
  } else {
    return {
      buttonClass: 'w-full bg-blue-500 text-white p-2 rounded mb-2 hover:bg-blue-600'
    }
  }
})
</script>

<template>
  <button :class="buttonClass">
    <VaIcon $v-if="icon" :name="$props.icon" />
    <slot></slot>
    <VaProgressCircle class="inline-flex" $v-if="loading" indeterminate />
  </button>
</template>
