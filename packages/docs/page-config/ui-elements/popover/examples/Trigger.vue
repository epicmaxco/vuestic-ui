<template>
  <VaPopover
    class="mr-2 mb-2"
    message="popover text"
    trigger="click"
  >
    <VaButton>Click me</VaButton>
  </VaPopover>
  <VaPopover
    class="mb-2"
    message="popover text (doesn't hide when clicked outside)"
    trigger="click"
    :auto-hide="false"
  >
    <VaButton>Click me</VaButton>
  </VaPopover>
</template>
