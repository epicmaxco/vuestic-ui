<template>
  <va-button-dropdown label="label">
    Content
  </va-button-dropdown>

  <va-button-dropdown class="ml-2">
    Button without label
  </va-button-dropdown>

  <va-button-dropdown class="ml-2" :rounded="false">
    Button without label
  </va-button-dropdown>

  <va-button-dropdown class="ml-2">
    <template #label>
      <va-icon class="fa fa-shopping-cart" size="small" />
    </template>
    Button with custom label
  </va-button-dropdown>
</template>
