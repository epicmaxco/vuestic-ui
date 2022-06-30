<template>
  <va-popover
    class="mr-2 mb-2"
    message="popover text"
    trigger="click"
  >
    <va-button>Click me</va-button>
  </va-popover>
  <va-popover
    message="popover text (doesn't hide when clicked outside)"
    trigger="click"
    :auto-hide="false"
  >
    <va-button>Click me</va-button>
  </va-popover>
</template>
