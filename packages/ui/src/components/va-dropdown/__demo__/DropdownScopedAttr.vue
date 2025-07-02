<script setup>
import { VaDateInput, VaInput, VaDropdown } from '../../../main'
</script>

<template>
  <VaDateInput />
  <VaInput />

  <VaDropdown>
    <template #anchor>
      <div>
        <VaInput />
      </div>
    </template>
  </VaDropdown>
</template>

<style scoped>
.va-input-wrapper {
  border: 1px solid red;
}
</style>
