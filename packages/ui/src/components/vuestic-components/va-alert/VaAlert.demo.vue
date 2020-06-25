<template>
  <VbDemo>
    <VbCard title="Colorful Alert">
      <va-alert>
        <va-badge
          color="success"
          label="Paid"
        />
        You successfully read this important alert message.
      </va-alert>
      <va-alert color="info">
        <va-badge
          color="info"
          label="Info"
        />
        This alert needs your attention, but it's not super important. Longer text.
      </va-alert>
      <va-alert color="warning">
        <va-badge
          color="warning"
          label="On Hold"
        />
        Better check yourself, you're not looking too good.
      </va-alert>
      <va-alert color="danger">
        <va-badge
          color="danger"
          label="Danger"
          :circle="false"
        />
        Change a few things up and try submitting again.
      </va-alert>
      <va-alert color="gray">
        <va-badge
          color="gray"
          label="Processing"
        />
        Better check yourself, you're not looking too good.
      </va-alert>
      <va-alert color="dark">
        <va-badge
          color="dark"
          label="New Label"
        />
        Change a few things up and try submitting again.
      </va-alert>
    </VbCard>
    <VbCard title="Closeable Alert">
      <va-checkbox
        label="Toggle visibility"
        v-model="isCloseableAlertVisible"
      />
      <va-alert
        v-model="isCloseableAlertVisible"
        closeable
      >
        <va-badge
          color="success"
          label="Paid"
        />
        You successfully read this important alert message.
      </va-alert>
    </VbCard>
    <VbCard
      title="Long"
      style="width: 300px;"
    >
      <va-alert
        v-model="isCloseableAlertVisible"
        closeable
      >
        <va-badge
          color="success"
          label="Paid"
        />
        You successfully read this important alert message. Long. Long. Long. Long. Long. Long. Long. Long. Long. Long. Long. Long. Long. Long. Long. Long. Long. Long. Long.
      </va-alert>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaCheckbox from '../va-checkbox/VaCheckbox'
import VaAlert from './VaAlert'
import VaBadge from '../va-badge/VaBadge'

export default {
  components: {
    VaCheckbox,
    VaAlert,
    VaBadge,
  },
  data () {
    return {
      isCloseableAlertVisible: true,
    }
  },
}
</script>

<style lang="scss">

</style>
