<template>
  <table ref="table" class="w-full">
    <thead class="demo-thead">
      <tr>
        <th>Header 1</th>
        <th>Header 2</th>
        <th>Header 3</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="i in 20" :key="i">
        <td>Row {{ i }}</td>
        <td>Col 2</td>
        <td>Col 3</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { useStickyTableHeaders } from 'vuestic-ui'

const table = ref()

useStickyTableHeaders(table, 75)
</script>

<style>
  .demo-thead {
    outline: 1px solid var(--va-focus);
    outline-offset: -2px;
  }
</style>
