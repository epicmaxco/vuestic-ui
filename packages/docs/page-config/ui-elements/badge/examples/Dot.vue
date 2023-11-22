<template>
  <VaBadge
    class="mr-6"
    overlap
    dot
    :offset="[-2, 2]"
  >
    <template #text>
      <VaIcon
        name="warning"
        size="12px"
      />
    </template>
    <VaIcon
      name="account_box"
      size="30px"
    />
  </VaBadge>

  <VaBadge
    overlap
    dot
    :offset="[-2, 2]"
  >
    <template #text>
      <VaIcon
        name="warning"
        size="12px"
      />
    </template>
    <VaIcon
      name="face"
      size="30px"
    />
  </VaBadge>
</template>
<script setup>
</script>
