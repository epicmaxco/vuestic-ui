<template>
  <VaMenuList
    :options="options"
    @selected="(v) => alert(v)"
  />
</template>

<script setup>
  const alert = (...args) => window.alert(...args)

  const options = [
    { id: '0', text: 'copy', value: 'one', icon: 'content_copy', rightIcon: '' },
    { id: '1', text: 'paste', value: 'two', icon: 'content_paste', rightIcon: '' },
    { id: '2', text: 'cut', value: 'three', icon: 'content_cut', rightIcon: '' },
    { id: '3', text: 'share', value: 'four', icon: '', rightIcon: 'share' },
    { id: '4', text: 'delete', value: 'five', icon: 'delete' },
  ]
</script>
