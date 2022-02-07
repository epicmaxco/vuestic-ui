<template>
  <div>
    <va-alert color="info" class="mb-4">
      {{ $t('alert.misc.color') }}
    </va-alert>
    <va-alert color="warning" outline class="mb-4">
      {{ $t('alert.misc.outlined') }}
    </va-alert>
    <va-alert color="danger" border="top" border-color="danger" class="mb-4">
      {{ $t('alert.misc.border') }}
    </va-alert>
  </div>
</template>
