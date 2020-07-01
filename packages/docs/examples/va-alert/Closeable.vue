<template>
  <div>
    <va-checkbox
      label="Toggle visibility"
      v-model="isCloseableAlertVisible"
    />
    <va-alert
      v-model="isCloseableAlertVisible"
      closeable
    >
      You successfully read this important alert message.
    </va-alert>

    <va-alert
      v-model="isCloseableAlertVisible"
      closeable
      close-icon="info"
    >
      You successfully read this important alert message.
    </va-alert>

    <va-alert
      v-model="isCloseableAlertVisible"
      closeable
      close-text="close"
    >
      You successfully read this important alert message.
    </va-alert>

    <va-alert
      v-model="isCloseableAlertVisible"
      closeable
    >
      <template slot="close">
        slotted close
      </template>
      You successfully read this important alert message.
    </va-alert>
  </div>
</template>

<script>
import VaCheckbox from '../../../ui/src/components/vuestic-components/va-checkbox/VaCheckbox'
export default {
  components: {
    VaCheckbox,
  },
  data () {
    return {
      isCloseableAlertVisible: true,
    }
  },
}
</script>
