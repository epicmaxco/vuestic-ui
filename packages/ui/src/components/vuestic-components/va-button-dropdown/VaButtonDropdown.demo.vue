<template>
  <VbDemo>
    <VbCard title="default">
      <va-button-dropdown label="label">
        Content
      </va-button-dropdown>
    </VbCard>
    <VbCard title="label slot">
      <va-button-dropdown>
        <template #label>
          label
        </template>
        Content
      </va-button-dropdown>
    </VbCard>
    <VbCard title="split">
      <va-button-dropdown
        split
        label="Split"
      >
        Content
      </va-button-dropdown>
      <va-button-dropdown
        split
        split-to="/"
        label="Split to"
      >
        Content
      </va-button-dropdown>
    </VbCard>
    <VbCard title="button props">
      <va-button-dropdown
        size="small"
        label="small"
      >
        Content
      </va-button-dropdown>
      <va-button-dropdown
        size="large"
        label="large"
      >
        Content
      </va-button-dropdown>
      <va-button-dropdown
        outline
        label="outline"
      >
        Content
      </va-button-dropdown>
      <va-button-dropdown
        flat
        label="flat"
      >
        Content
      </va-button-dropdown>
      <va-button-dropdown
        outline
        split
        label="outline split"
      >
        Content
      </va-button-dropdown>
      <va-button-dropdown
        size="small"
        split
        label="small + split"
      >
        Content
      </va-button-dropdown>
      <va-button-dropdown
        size="large"
        split
        label="large + split"
      >
        Content
      </va-button-dropdown>
    </VbCard>
    <VbCard title="colors">
      <va-button-dropdown
        color="warning"
        label="warning"
      >
        Content
      </va-button-dropdown>
      <va-button-dropdown
        color="danger"
        label="danger"
      >
        Content
      </va-button-dropdown>
      <va-button-dropdown
        color="info"
        label="info"
      >
        Content
      </va-button-dropdown>
      <va-button-dropdown
        color="info"
        split
        label="info + split"
      >
        Content
      </va-button-dropdown>
    </VbCard>
    <VbCard title="Disabled">
      <va-button-dropdown
        disabled
        label="disabled"
      >
        Content
      </va-button-dropdown>
      <va-button-dropdown
        split
        disable-button
        label="disable-button"
      >
        Content
      </va-button-dropdown>
      <va-button-dropdown
        split
        disable-dropdown
        label="disable-dropdown"
      >
        Content
      </va-button-dropdown>
    </VbCard>
    <VbCard title="icon">
      <va-button-dropdown
        label="without icon"
        icon=""
      >
        Content
      </va-button-dropdown>
      <va-button-dropdown
        label="custom icon"
        icon="info"
      >
        Content
      </va-button-dropdown>
      <va-button-dropdown
        label="custom icon && icon-open"
        icon="info"
        opened-icon="check_circle"
      >
        Content
      </va-button-dropdown>
    </VbCard>
    <VbCard title="events">
      <va-button-dropdown
        @click="click"
        label="Click event"
      >
        Content
      </va-button-dropdown>
      <va-button-dropdown
        @mainButtonClick="mainButtonClick"
        split
        label="main button click event"
      >
        Content
      </va-button-dropdown>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaButtonDropdown from './index'

export default {
  name: 'VaButtonDropdownDemo',
  components: { VaButtonDropdown },
  methods: {
    mainButtonClick (e) {
      // eslint-disable-next-line no-console
      console.log('main-button-click', e)
    },
    click (e) {
      // eslint-disable-next-line no-console
      console.log('click', e)
    },
  },
}
</script>

<style scoped lang="scss">

</style>
