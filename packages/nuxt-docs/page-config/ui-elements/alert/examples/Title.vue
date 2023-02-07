<template>
  <va-alert color="success" :title="$t('alert.misc.title')" class="mb-6">
    {{ $t("alert.misc.primary") }}
  </va-alert>
  <va-alert color="info" class="mb-6">
    <template #title>
      {{ $t("alert.misc.slottedTitle") }}
    </template>
    {{ $t("alert.misc.primary") }}
  </va-alert>
</template>
