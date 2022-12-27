<template>
  <va-button-dropdown
    class="mr-4"
    label="Will not close dropdown on click"
    :close-on-content-click="false"
  >
    Content
  </va-button-dropdown>

  <va-button-dropdown
    label="Will close dropdown on click"
    :close-on-content-click="true"
  >
    Content
  </va-button-dropdown>
</template>
