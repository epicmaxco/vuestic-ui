<template>
  <va-alert
    color="info"
    class="mb-6"
  >
    {{ $t("alert.misc.color") }}
  </va-alert>
  <va-alert
    color="warning"
    outline
    class="mb-6"
  >
    {{ $t("alert.misc.outlined") }}
  </va-alert>
  <va-alert
    color="danger"
    border="top"
    border-color="danger"
    class="mb-6"
  >
    {{ $t("alert.misc.border") }}
  </va-alert>
</template>
