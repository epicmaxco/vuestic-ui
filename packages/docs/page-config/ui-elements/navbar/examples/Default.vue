<template>
  <VaNavbar color="#F4F8FA">
    <template #left>
      <VaNavbarItem class="navbar-item-slot">
        Left slot
      </VaNavbarItem>
    </template>
    <template #right>
      <VaNavbarItem class="navbar-item-slot">
        Right slot
      </VaNavbarItem>
    </template>
    <template #center>
      <VaNavbarItem class="navbar-item-slot">
        Center slot
      </VaNavbarItem>
    </template>
  </VaNavbar>
</template>

<style scoped>
.navbar-item-slot {
  border: 1px dashed var(--va-secondary);
  padding: 6px 10px;
}
</style>
