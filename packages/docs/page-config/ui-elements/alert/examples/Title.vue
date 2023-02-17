<template>
  <va-alert
    color="info"
    :title="$t('alert.misc.title')"
    class="mb-6"
  >
    {{ $t('alert.misc.titleContent') }}
  </va-alert>
  <va-alert
    color="#265c83"
    class="mb-6"
  >
    <template #title>
      <h4>{{ $t('alert.misc.slottedTitle') }}</h4>
    </template>
    <va-divider />
    {{ $t('alert.misc.slottedTitleContent') }}
  </va-alert>
</template>
