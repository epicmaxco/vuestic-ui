<template>
  <va-alert
    color="warning"
    class="mb-6"
  >
    {{ $t('alert.misc.warning') }}
  </va-alert>
  <va-alert
    color="danger"
    class="mb-6"
  >
    {{ $t('alert.misc.danger') }}
  </va-alert>
  <va-alert
    color="#ce6e67"
    class="mb-6"
  >
    {{ $t('alert.misc.info') }}
  </va-alert>
  <va-alert
    color="#fdeae7"
    text-color="#940909"
  >
    {{ $t('alert.misc.customized') }}
  </va-alert>
</template>
