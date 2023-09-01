<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <va-select
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

    <va-select
      v-model="multiSelect"
      class="col-span-1"
      label="Multiple select"
      placeholder="Start to write..."
      :options="options"
      multiple
      autocomplete
      highlight-matched-text
    />

    <va-select
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
        <va-chip
          v-for="chip in value"
          :key="chip"
          class="mr-1"
          size="small"
        >
          {{ chip }}
        </va-chip>
      </template>
    </va-select>
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
