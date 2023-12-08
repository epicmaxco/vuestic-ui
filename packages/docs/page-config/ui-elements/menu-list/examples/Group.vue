<template>
  <VaMenuList
    :options="options"
    @selected="(v) => alert(v)"
  />
</template>

<script setup>
  const alert = (...args) => window.alert(...args)

  const options = [
    { id: '0', text: 'one', value: 'one', group: '' },
    { id: '1', text: 'two', value: 'two', group: 'Group 1' },
    { id: '2', text: 'three', value: 'three', group: '' },
    { id: '3', text: 'four', value: 'four', group: 'Group 2' },
    { id: '4', text: 'five', value: 'five', group: 'Group 2' },
  ]
</script>
