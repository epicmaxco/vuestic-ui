<template>
  <VaMenu
    :options="options"
    @selected="(v) => alert(v)"
  >
    <template #anchor>
      <VaButton>Open menu</VaButton>
    </template>
  </VaMenu>
</template>

<script setup>
  const alert = (...args) => window.alert(...args)

  const options = [
    { text: 'copy', value: 'one', icon: 'content_copy' },
    { text: 'paste', value: 'two', icon: 'content_paste' },
    { text: 'cut', value: 'three', icon: 'content_cut' },
    { text: 'share', value: 'four', rightIcon: 'share' },
    { text: 'delete', value: 'five', icon: 'delete' },
  ]
</script>
