<template>
  <VaFormField v-slot="{ modelValue }" v-model="values" :rules="[(v) => selectedValuesCount <=2 || 'Maximum 2 items can be selected']">
    <div class="flex gap-2">
      <div
        v-for="v, i in modelValue.ref"
        :key="i"
        class="w-8 h-8"
        :class="{
          'bg-[var(--va-primary)]': v,
          'bg-[var(--va-secondary)]': !v,
        }"
        @click="modelValue.ref[i] = !modelValue.ref[i]"
      />
    </div>
  </VaFormField>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const values = ref([false, false, false])
const selectedValuesCount = computed(() => values.value.filter(Boolean).length)
</script>
