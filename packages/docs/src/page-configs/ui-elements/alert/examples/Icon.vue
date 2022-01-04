<template>
  <div>
    <va-alert color="warning" icon="info" class="mb-4">
      {{ $t('alert.misc.icon') }}
    </va-alert>
    <va-alert color="info" class="mb-4">
    <template #icon>
        <va-icon name="info" />
    </template>
      {{ $t('alert.misc.slottedIcon') }}
    </va-alert>
  </div>
</template>
