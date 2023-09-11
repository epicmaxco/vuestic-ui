<template>
  <va-navbar color="#F4F8FA">
    <template #left>
      <va-navbar-item class="navbar-item-slot">
        Left slot
      </va-navbar-item>
    </template>
    <template #right>
      <va-navbar-item class="navbar-item-slot">
        Right slot
      </va-navbar-item>
    </template>
    <template #center>
      <va-navbar-item class="navbar-item-slot">
        Center slot
      </va-navbar-item>
    </template>
  </va-navbar>
</template>

<style scoped>
.navbar-item-slot {
  border: 1px dashed var(--va-secondary);
  padding: 6px 10px;
}
</style>
