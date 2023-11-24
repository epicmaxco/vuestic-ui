<template>
  <div class="flex items-center">
    <VaButtonDropdown
      label="label"
      class="mr-2 mb-2"
    >
      Content
    </VaButtonDropdown>
    <VaButtonDropdown
      preset="primary"
      class="mr-2 mb-2"
    >
      Button without label
    </VaButtonDropdown>
    <VaButtonDropdown
      preset="secondary"
      class="mr-2 mb-2"
      round
    >
      Button without label
    </VaButtonDropdown>
    <VaButtonDropdown
      preset="plain"
      class="mr-2 mb-2"
    >
      <template #label>
        <VaIcon
          class="fa fa-shopping-cart"
          size="small"
        />
      </template>
      Button with custom label
    </VaButtonDropdown>
  </div>
</template>
