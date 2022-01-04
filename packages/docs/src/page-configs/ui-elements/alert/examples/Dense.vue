<template>
  <div>
    <va-alert dense color="success" class="mb-4">
      {{ $t('alert.misc.dense') }}
    </va-alert>
    <va-alert dense color="info" class="mb-4">
      {{ $t('alert.misc.color') }}
    </va-alert>
    <va-alert dense color="warning" outline class="mb-4">
      {{ $t('alert.misc.outlined') }}
    </va-alert>
    <va-alert dense color="danger" border="top" border-color="danger" class="mb-4">
      {{ $t('alert.misc.border') }}
    </va-alert>
  </div>
</template>
