<template>
  <VbDemo>
    <VbCard title="Colorful Notification">
      <va-notification>
        <va-badge color="success" label="Paid"  />
        You successfully read this important alert message.
      </va-notification>
      <va-notification color="info">
        <va-badge color="info" label="Info"  />
        This alert needs your attention, but it's not super important. Longer text.
      </va-notification>
      <va-notification color="warning">
        <va-badge color="warning" label="On Hold"  />
        Better check yourself, you're not looking too good.
      </va-notification>
      <va-notification color="danger">
        <va-badge color="danger" label="Danger" :circle="false"/>
        Change a few things up and try submitting again.
      </va-notification>
      <va-notification color="gray">
        <va-badge color="gray" label="Processing" />
        Better check yourself, you're not looking too good.
      </va-notification>
      <va-notification color="dark">
        <va-badge color="dark" label="New Label" />
        Change a few things up and try submitting again.
      </va-notification>
    </VbCard>
    <VbCard title="Closeable Notification">
      <va-checkbox
        label="Toggle visibility"
        v-model="isCloseableNotificationVisible"
      />
      <va-notification v-model="isCloseableNotificationVisible" closeable>
        <va-badge color="success" label="Paid" />
        You successfully read this important alert message.
      </va-notification>
    </VbCard>
    <VbCard title="Long" style="width: 300px;">
      <va-notification v-model="isCloseableNotificationVisible" closeable>
        <va-badge color="success" label="Paid" />
        You successfully read this important alert message. Long. Long. Long. Long. Long. Long. Long. Long. Long. Long. Long. Long. Long. Long. Long. Long. Long. Long. Long.
      </va-notification>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaCheckbox from '../va-checkbox/VaCheckbox'
import VaNotification from './VaNotification'
import VaBadge from '../va-badge/VaBadge'

export default {
  components: {
    VaCheckbox,
    VaNotification,
    VaBadge,
  },
  data () {
    return {
      isCloseableNotificationVisible: true,
    }
  },
}
</script>

<style lang="scss">

</style>
