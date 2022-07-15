<template>
  <va-alert color="success" :title="$t('alert.misc.title')" class="mb-4">
    {{ $t('alert.misc.primary') }}
  </va-alert>
  <va-alert color="info" class="mb-4">
    <template #title>
      {{ $t('alert.misc.slottedTitle') }}
    </template>
    {{ $t('alert.misc.primary') }}
  </va-alert>
</template>
