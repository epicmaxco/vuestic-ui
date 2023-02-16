<template>
  <va-alert
    color="warning"
    icon="warning"
    class="mb-6"
  >
    {{ $t('alert.misc.icon') }}
  </va-alert>
  <va-alert
    color="info"
    class="mb-6"
  >
    <template #icon>
      <va-icon name="info" />
    </template>
    {{ $t('alert.misc.slottedIcon') }}
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
    {{ $t('alert.misc.starVuestic') }}
    <a
      href="https://github.com/epicmaxco/vuestic-ui"
      target="_blank"
    >GitHub</a>
  </va-alert>
</template>
