<template>
  <VbDemo>
    <VbCard title="sortable columns">
      <p>Sorts only by email</p>

      <va-input v-model="filter" />

      <va-data-table
        :items="items"
        :columns="columns"
        :filter="filter"
      />
    </VbCard>
  </VbDemo>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { VaDataTable } from './'
import { VaInput } from '../va-input'

const items = [
  {
    id: 1,
    name: 'Leanne Graham',
    email: 'Sincere@april.biz',
  },
  {
    id: 2,
    name: 'Ervin Howell',
    email: 'Shanna@melissa.tv',
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    email: 'Nathan@yesenia.net',
  },
]

const columns = [
  { key: 'id' },
  { key: 'name' },
  { key: 'email', filterable: true },
]

const filter = ref('')
</script>
