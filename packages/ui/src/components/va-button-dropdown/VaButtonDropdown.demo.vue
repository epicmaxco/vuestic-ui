<template>
  <VbDemo class="va-button-dropdown-demo">
    <VbCard title="default">
      <va-button-dropdown label="label">
        Content
      </va-button-dropdown>
    </VbCard>
    <VbCard title="without label">
      <va-button-dropdown>
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
      <va-button-dropdown
        split
        split-href="/"
        label="Split href"
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
        label="outline"
        preset="secondary"
        border-color="primary"
      >
        Content
      </va-button-dropdown>
      <va-button-dropdown
        label="plain"
        preset="plain"
      >
        Content
      </va-button-dropdown>
      <va-button-dropdown
        label="outline split"
        preset="secondary"
        border-color="primary"
        split
      >
        Content
      </va-button-dropdown>
      <va-button-dropdown
        label="small + split"
        size="small"
        split
      >
        Content
      </va-button-dropdown>
    </VbCard>
    <VbCard title="colors">
      <va-button-dropdown
        color="warning"
        textColor="danger"
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
      <div style="display: flex; align-items: center;">
        <va-button-dropdown
          label="without icon"
          hideIcon
        >
          Content
        </va-button-dropdown>
        <va-button-dropdown
          label="left icon"
          leftIcon
        >
          Content
        </va-button-dropdown>
        <va-button-dropdown
          label="custom icon"
          icon="done"
        >
          Content
        </va-button-dropdown>
        <va-button-dropdown
          label="custom icon && icon-open"
          icon="arrow_forward_ios"
          opened-icon="arrow_back_ios"
        >
          Content
        </va-button-dropdown>
      </div>
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
    <VbCard title="Click inside">
      <va-button-dropdown
        label="Open"
        :closeOnContentClick="false"
      >
        Clicking here won't close dropdown content
      </va-button-dropdown>
    </VbCard>
    <VbCard title="Stateless">
      <va-button-dropdown
        label="Stateless without v-model"
        :stateful="false"
        v-model="value"
      >
        Content
      </va-button-dropdown>
    </VbCard>
  </VbDemo>
</template>

<script>
import { VaButtonDropdown } from './index'

export default {
  name: 'VaButtonDropdownDemo',
  components: { VaButtonDropdown },
  methods: {
    mainButtonClick (e) {
      console.log('main-button-click', e)
    },
    click (e) {
      console.log('click', e)
    },
  },
  data: () => ({
    value: true,
  }),
}
</script>

<style lang="scss">
.va-button-dropdown-demo {
  .va-button-dropdown {
    margin-right: 16px;
    margin-bottom: 16px;
  }
}
</style>
