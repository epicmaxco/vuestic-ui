<template>
  <div>
    <va-alert
      class="mb-4"
      :description="$t('api.VaAlert.examples.basic.descriptionProp')"
    />
    <va-alert>
      {{ $t('api.VaAlert.examples.basic.defaultSlot') }}
    </va-alert>
  </div>
</template>
