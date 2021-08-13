<template>
  <div>
    <va-checkbox
      :label="$t('api.VaAlert.examples.closeable.toggle')"
      v-model="isCloseableAlertVisible"
      class="mb-4"
    />
    <va-alert v-model="isCloseableAlertVisible" closeable class="mb-4">
      {{ $t('api.VaAlert.examples.closeable.defaultIcon') }}
    </va-alert>

    <va-alert
      color="info"
      v-model="isCloseableAlertVisible"
      closeable
      close-icon="info"
      class="mb-4"
    >
      {{ $t('api.VaAlert.examples.closeable.customIcon') }}
    </va-alert>

    <va-alert
      color="warning"
      v-model="isCloseableAlertVisible"
      closeable
      :close-text="$t('all.code.close')"
      class="mb-4"
    >
      {{ $t('api.VaAlert.examples.closeable.defaultText') }}
    </va-alert>

    <va-alert
      color="success"
      v-model="isCloseableAlertVisible"
      closeable
      class="mb-4"
    >
      <template #close>
        {{ $t('all.code.close') }}
      </template>
      {{ $t('api.VaAlert.examples.closeable.slottedText') }}
    </va-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCloseableAlertVisible: true,
    }
  },
}
</script>
