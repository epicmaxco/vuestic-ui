<template>
  <VaValue v-slot="v">
    <button
      :style="v.value ? 'color: var(--va-danger)' : 'color: var(--va-primary)'"
      @click="v.value = !v.value"
    >
      Click to burn it!
    </button>
  </VaValue>
</template>
