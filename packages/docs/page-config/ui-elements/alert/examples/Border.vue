<template>
  <va-alert
    color="info"
    border="bottom"
    class="mb-6"
  >
    {{ $t("alert.misc.info") }}
  </va-alert>
  <va-alert
    color="warning"
    border="left"
    class="mb-6"
  >
    {{ $t("alert.misc.warning") }}
  </va-alert>
  <va-alert
    color="danger"
    border="top"
    class="mb-6"
  >
    {{ $t("alert.misc.danger") }}
  </va-alert>
</template>
