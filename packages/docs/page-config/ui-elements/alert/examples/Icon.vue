<template>
  <va-alert
    color="warning"
    icon="warning"
    class="mb-6"
  >
    You read this important alert message with an icon
  </va-alert>
  <va-alert
    color="info"
    class="mb-6"
  >
    <template #icon>
      <va-icon name="info" />
    </template>
    You read this important alert message with a slotted icon
  </va-alert>
  <va-alert
    color="warning"
    outline
    class="mb-6"
  >
    <template #icon>
      <va-icon
        name="star"
        color="warning"
      />
    </template>
    If you like Vuestic UI, please give us a star on
    <a
      href="https://github.com/epicmaxco/vuestic-ui"
      target="_blank"
    >GitHub</a>
  </va-alert>
</template>
