<template>
  <div>
    <va-alert center class="mb-4">
      {{ $t('api.VaAlert.examples.center.body') }}
    </va-alert>
    <va-alert color="success" :title="$t('api.VaAlert.examples.center.title')" center class="mb-4">
      {{ $t('api.VaAlert.examples.center.body') }}
    </va-alert>
    <va-alert color="info" closeable :title="$t('api.VaAlert.examples.center.title')" center class="mb-4">
      {{ $t('api.VaAlert.examples.center.body') }}
    </va-alert>
    <va-alert color="danger" :title="$t('api.VaAlert.examples.center.title')" icon="info" center class="mb-4">
      {{ $t('api.VaAlert.examples.center.body') }}
    </va-alert>
    <va-alert
      color="warning"
      closeable
      :title="$t('api.VaAlert.examples.center.title')"
      icon="info"
      center
      class="mb-4"
    >
      {{ $t('api.VaAlert.examples.center.body') }}
    </va-alert>
  </div>
</template>
