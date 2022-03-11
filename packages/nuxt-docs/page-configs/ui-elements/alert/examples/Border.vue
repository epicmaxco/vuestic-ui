<template>
  <div>
    <va-alert border="top" class="mb-4">
      {{ $t('alert.misc.primary') }}
    </va-alert>
    <va-alert color="success" border="right" class="mb-4">
      {{ $t('alert.misc.success') }}
    </va-alert>
    <va-alert color="info" border="bottom" class="mb-4">
      {{ $t('alert.misc.info') }}
    </va-alert>
    <va-alert color="warning" border="left" class="mb-4">
      {{ $t('alert.misc.warning') }}
    </va-alert>
    <va-alert color="gray" border="top" border-color="danger" class="mb-4">
      {{ $t('alert.misc.danger') }}
    </va-alert>
  </div>
</template>
