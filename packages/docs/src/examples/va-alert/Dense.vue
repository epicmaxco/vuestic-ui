<template>
  <div>
    <va-alert dense color="success" class="mb-4">
      {{ $t('api.VaAlert.examples.dense.success') }}
    </va-alert>
    <va-alert dense color="info" class="mb-4">
      {{ $t('api.VaAlert.examples.dense.colored') }}
    </va-alert>
    <va-alert dense color="warning" outline class="mb-4">
      {{ $t('api.VaAlert.examples.dense.outlined') }}
    </va-alert>
    <va-alert dense color="danger" border="top" border-color="danger" class="mb-4">
      {{ $t('api.VaAlert.examples.dense.colorfulBorder') }}
    </va-alert>
  </div>
</template>
