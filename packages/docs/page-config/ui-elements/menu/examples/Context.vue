<template>
  <VaMenu
    :options="['Option 1', 'Option 2', 'Option 3']"
    preset="context"
    @selected="(v) => alert(v)"
  >
    <template #anchor>
      <VaImage
        class="h-[300px] w-[300px]"
        src="https://picsum.photos/1500"
      >
        <VaBadge text="Right click this image" />
      </VaImage>
    </template>
  </VaMenu>
</template>

<script setup>
  const alert = (...args) => window.alert(...args)
</script>
