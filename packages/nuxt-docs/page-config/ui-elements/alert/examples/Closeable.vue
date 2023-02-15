<template>
  <va-checkbox
    v-model="isCloseableAlertVisible"
    :label="$t('alert.misc.toggleVisibility')"
    class="mb-6"
  />
  <va-alert
    v-model="isCloseableAlertVisible"
    closeable
    class="mb-6"
  >
    {{ $t("alert.misc.defaultCloseIcon") }}
  </va-alert>

  <va-alert
    v-model="isCloseableAlertVisible"
    color="info"
    closeable
    close-icon="info"
    class="mb-6"
  >
    {{ $t("alert.misc.customCloseIcon") }}
  </va-alert>

  <va-alert
    v-model="isCloseableAlertVisible"
    color="warning"
    closeable
    :close-text="$t('alert.misc.close')"
    class="mb-6"
  >
    {{ $t("alert.misc.messageInsteadIcon") }}
  </va-alert>

  <va-alert
    v-model="isCloseableAlertVisible"
    color="success"
    closeable
    class="mb-6"
  >
    <template #close>
      {{ $t("alert.misc.close") }}
    </template>
    {{ $t("alert.misc.slottedTextInsteadIcon") }}
  </va-alert>
</template>

<script>
export default {
  data() {
    return {
      isCloseableAlertVisible: true,
    };
  },
};
</script>
