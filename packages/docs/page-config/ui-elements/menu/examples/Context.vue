<template>
  <VaMenu
    :options="['Option 1', 'Option 2', 'Option 3']"
    preset="context"
    @selected="(v) => alert(v)"
  >
    <template #anchor>
      <va-image
        class="h-[300px] w-[300px]"
        src="https://picsum.photos/1500"
      >
        <va-badge text="Right click this image" />
      </va-image>
    </template>
  </VaMenu>
</template>

<script setup>
  const alert = (...args) => window.alert(...args)
</script>
