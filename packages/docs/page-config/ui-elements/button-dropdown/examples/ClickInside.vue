<template>
  <VaButtonDropdown
    class="mr-6"
    label="Will not close dropdown on click"
    :close-on-content-click="false"
  >
    Content
  </VaButtonDropdown>

  <VaButtonDropdown
    label="Will close dropdown on click"
    :close-on-content-click="true"
  >
    Content
  </VaButtonDropdown>
</template>
