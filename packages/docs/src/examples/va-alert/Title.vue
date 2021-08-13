<template>
  <div>
    <va-alert
      color="success"
      :title="$t('api.VaAlert.examples.title.defaultTitle')"
      class="mb-4"
    >
      {{ $t('api.VaAlert.examples.title.defaultBody') }}
    </va-alert>
    <va-alert color="info" class="mb-4">
      <template #title>
        {{ $t('api.VaAlert.examples.title.slottedTitle') }}
      </template>
      {{ $t('api.VaAlert.examples.title.slottedBody') }}
    </va-alert>
  </div>
</template>
