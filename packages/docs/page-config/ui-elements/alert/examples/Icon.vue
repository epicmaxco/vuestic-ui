<template>
  <VaAlert
    color="warning"
    icon="warning"
    class="mb-6"
  >
    You read this important alert message with an icon
  </VaAlert>
  <VaAlert
    color="info"
    class="mb-6"
  >
    <template #icon>
      <VaIcon name="info" />
    </template>
    You read this important alert message with a slotted icon
  </VaAlert>
  <VaAlert
    color="warning"
    outline
    class="mb-6"
  >
    <template #icon>
      <VaIcon
        name="star"
        color="warning"
      />
    </template>
    If you like Vuestic UI, please give us a star on
    <a
      href="https://github.com/epicmaxco/vuestic-ui"
      target="_blank"
    >GitHub</a>
  </VaAlert>
</template>
