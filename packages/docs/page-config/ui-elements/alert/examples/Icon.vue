<template>
  <va-alert
    color="warning"
    icon="info"
    class="mb-6"
  >
    {{ $t("alert.misc.icon") }}
  </va-alert>
  <va-alert
    color="info"
    class="mb-6"
  >
    <template #icon>
      <va-icon name="info" />
    </template>
    {{ $t("alert.misc.slottedIcon") }}
  </va-alert>
</template>
