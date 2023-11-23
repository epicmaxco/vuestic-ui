<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <VaSelect
      v-model="singleSelect"
      v-model:search="autoCompleteSearchValue"
      class="col-span-1"
      label="Sigle select"
      placeholder="Start to write..."
      :options="options"
      autocomplete
      highlight-matched-text
      :messages="`Search value: ${autoCompleteSearchValue}`"
    />

    <VaSelect
      v-model="multiSelect"
      class="col-span-1"
      label="Multiple select"
      placeholder="Start to write..."
      :options="options"
      multiple
      autocomplete
      highlight-matched-text
    />

    <VaSelect
      v-model="multiSelect"
      class="col-span-1"
      label="Multiple select with content slot"
      placeholder="Start to write..."
      :options="options"
      multiple
      autocomplete
      highlight-matched-text
    >
      <template #content="{ value }">
        <VaChip
          v-for="chip in value"
          :key="chip"
          class="mr-1"
          size="small"
        >
          {{ chip }}
        </VaChip>
      </template>
    </VaSelect>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Can be used to fetch new options from API
const autoCompleteSearchValue = ref('')
const options = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

const singleSelect = ref('one')

const multiSelect = ref([])
</script>
