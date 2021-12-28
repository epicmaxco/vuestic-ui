<template>
  <div>
    <va-alert
      class="mb-4"
      :description="$t('alert.examples.default.prop')"
    />
    <va-alert>
      {{ $t('alert.examples.default.slot') }}
    </va-alert>
  </div>
</template>
