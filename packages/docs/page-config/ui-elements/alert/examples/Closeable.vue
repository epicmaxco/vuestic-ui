<template>
  <VaCheckbox
    v-model="isCloseableAlertVisible"
    label="Toggle visibility"
    class="mb-6"
  />
  <VaAlert
    v-model="isCloseableAlertVisible"
    closeable
    class="mb-6"
  >
    Dismissible Alert! Click the close button over there ⇒
  </VaAlert>

  <VaAlert
    v-model="isCloseableAlertVisible"
    color="info"
    closeable
    close-icon="info"
    class="mb-6"
  >
    You read this important alert message with a custom close icon
  </VaAlert>

  <VaAlert
    v-model="isCloseableAlertVisible"
    color="warning"
    closeable
    close-text="close"
    class="mb-6"
  >
    You read this important alert message with a text instead of an icon
  </VaAlert>

  <VaAlert
    v-model="isCloseableAlertVisible"
    color="success"
    closeable
    class="mb-6"
  >
    <template #close>
      close
    </template>
    You read this important alert message with a slotted text instead of an icon
  </VaAlert>
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
