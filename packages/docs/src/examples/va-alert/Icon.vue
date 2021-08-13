<template>
  <div>
    <va-alert color="warning" icon="info" class="mb-4">
      {{ $t('api.VaAlert.examples.icon.defaultIcon') }}
    </va-alert>
    <va-alert color="info" class="mb-4">
      <template #icon>
        <va-icon name="info" />
      </template>
      {{ $t('api.VaAlert.examples.icon.slottedIcon') }}
    </va-alert>
  </div>
</template>
