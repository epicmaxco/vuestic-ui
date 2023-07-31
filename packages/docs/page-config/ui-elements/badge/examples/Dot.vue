<template>
  <va-badge
    class="mr-6"
    overlap
    dot
    :offset="[-2, 2]"
  >
    <template #text>
      <va-icon
        name="warning"
        size="12px"
      />
    </template>
    <va-icon
      name="account_box"
      size="30px"
    />
  </va-badge>

  <va-badge
    overlap
    dot
    :offset="[-2, 2]"
  >
    <template #text>
      <va-icon
        name="warning"
        size="12px"
      />
    </template>
    <va-icon
      name="face"
      size="30px"
    />
  </va-badge>
</template>
<script setup>
</script>
