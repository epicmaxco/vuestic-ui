<template>
  <div>
    <va-alert center class="mb-4">
      {{ $t('alert.misc.centered') }}
    </va-alert>
    <va-alert color="success" :title="$t('alert.misc.title')" center class="mb-4">
      {{ $t('alert.misc.centered') }}
    </va-alert>
    <va-alert color="info" closeable :title="$t('alert.misc.title')" center class="mb-4">
      {{ $t('alert.misc.centered') }}
    </va-alert>
    <va-alert color="danger" :title="$t('alert.misc.title')" icon="info" center class="mb-4">
      {{ $t('alert.misc.centered') }}
    </va-alert>
    <va-alert color="warning" closeable :title="$t('alert.misc.title')" icon="info" center class="mb-4">
      {{ $t('alert.misc.centered') }}
    </va-alert>
  </div>
</template>
