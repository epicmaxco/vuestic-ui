<template>
  <VbDemo>
    <VbCard title="Default">
      <va-alert description="You successfully read this important alert message." />
      <va-alert>
        You successfully read this important slotted alert message.
      </va-alert>
    </VbCard>

    <VbCard title="With title">
      <va-alert title="Title">
        You successfully read this important alert message.
      </va-alert>
      <va-alert>
        <template #title>
          Slotted title
        </template>
        You successfully read this important alert message.
      </va-alert>
    </VbCard>

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

    <VbCard title="Border">
      <va-alert border="top">
        You successfully read this important alert message.
      </va-alert>
      <va-alert color="info" border="right">
        This alert needs your attention, but it's not super important. Longer text.
      </va-alert>
      <va-alert color="warning" border="bottom">
        Better check yourself, you're not looking too good.
      </va-alert>
      <va-alert color="danger" border="left">
        Change a few things up and try submitting again.
      </va-alert>
      <va-alert color="gray" border="top" border-color="danger">
        Better check yourself, you're not looking too good.
      </va-alert>
      <va-alert color="dark" border="top" border-color="#117ae4">
        Change a few things up and try submitting again.
      </va-alert>
    </VbCard>

    <VbCard title="Closeable Alert">
      <label for="isCloseableAlertVisible">
        Toggle visibility
      </label>
      <input
        id="isCloseableAlertVisible"
        type="checkbox"
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
        close-icon="warning"
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
        <template #close>
          slotted close
        </template>
        You successfully read this important alert message.
      </va-alert>
    </VbCard>

    <VbCard title="Center">
      <va-alert center>
        You successfully read this important alert message.
      </va-alert>
      <va-alert title="Title" center>
        You successfully read this important alert message.
      </va-alert>
      <va-alert closeable title="Title" icon="warning" center>
        You successfully read this important alert message.
      </va-alert>
      <va-alert closeable title="Title" center>
        You successfully read this important alert message.
      </va-alert>
      <va-alert title="Title" icon="warning" center>
        You successfully read this important alert message.
      </va-alert>
    </VbCard>

    <VbCard title="With icon">
      <va-alert icon="warning">
        You successfully read this important alert message.
      </va-alert>

      <va-alert>
        <template #icon>
          Slotted icon
          <va-icon name="warning" />
        </template>
        You successfully read this important alert message.
      </va-alert>
    </VbCard>

    <VbCard
      title="Long"
      style="width: 300px;"
    >
      <va-alert
        closeable
      >
        <va-badge
          color="success"
          label="Paid"
        />
        You successfully read this important alert message. Long. Long. Long. Long. Long. Long. Long. Long. Long. Long. Long. Long. Long. Long. Long. Long. Long. Long. Long.
      </va-alert>
    </VbCard>

    <VbCard
      title="Stateful"
    >
      <va-alert
        closeable
        stateful
      >
        You successfully read this important alert message.
      </va-alert>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaAlert from './index'
import VaBadge from '../va-badge'
import VaIcon from '../va-icon'

export default {
  components: {
    VaAlert,
    VaBadge,
    VaIcon,
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
