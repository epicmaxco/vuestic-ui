<template>
  <va-button-dropdown label="label" class="mr-2 mb-2">
    Content
  </va-button-dropdown>

  <va-button-dropdown class="mr-2 mb-2">
    Button without label
  </va-button-dropdown>

  <va-button-dropdown class="mr-2 mb-2" :rounded="false">
    Button without label
  </va-button-dropdown>

  <va-button-dropdown class="mr-2 mb-2">
    <template #label>
      <va-icon class="fa fa-shopping-cart" size="small" />
    </template>
    Button with custom label
  </va-button-dropdown>
</template>
