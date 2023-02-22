<template>
  <div style="display: flex; align-items: center;">
    <va-button-dropdown
      label="label"
      class="mr-2 mb-2"
    >
      Content
    </va-button-dropdown>
    <va-button-dropdown
      preset="primary"
      class="mr-2 mb-2"
    >
      Button without label
    </va-button-dropdown>
    <va-button-dropdown
      preset="secondary"
      class="mr-2 mb-2"
      round
    >
      Button without label
    </va-button-dropdown>
    <va-button-dropdown
      preset="plain"
      class="mr-2 mb-2"
    >
      <template #label>
        <va-icon
          class="fa fa-shopping-cart"
          size="small"
        />
      </template>
      Button with custom label
    </va-button-dropdown>
  </div>
</template>
