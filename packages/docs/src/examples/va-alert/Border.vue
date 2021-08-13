<template>
  <div>
    <va-alert border="top" class="mb-4">
      {{ $t('api.VaAlert.examples.borders.top') }}
    </va-alert>
    <va-alert color="success" border="right" class="mb-4">
      {{ $t('api.VaAlert.examples.borders.right') }}
    </va-alert>
    <va-alert color="info" border="bottom" class="mb-4">
      {{ $t('api.VaAlert.examples.borders.bottom') }}
    </va-alert>
    <va-alert color="warning" border="left" class="mb-4">
      {{ $t('api.VaAlert.examples.borders.left') }}
    </va-alert>
    <va-alert color="gray" border="top" border-color="danger" class="mb-4">
      {{ $t('api.VaAlert.examples.borders.withBorderColor') }}
    </va-alert>
  </div>
</template>
