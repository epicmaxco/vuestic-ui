<template>
  <Story title="va-button/icon" :layout="{ type: 'grid', width: '100%' }">
    <Variant title="icon to the side">
      <va-button icon="create">Edit Button</va-button>
      <va-button preset="secondary" icon="gavel" iconRight="clear">Mixed Button</va-button>
      <va-button preset="plainOpacity" icon="gavel">Plain with icon</va-button>
      <va-button preset="primary" size="small" icon="create">Small Edit Button</va-button>
      <va-button preset="primary" icon="gavel" icon-color="warning">Mixed Colors</va-button>
      <va-button preset="primary" icon-right="clear">Dropdown Button</va-button>
    </Variant>
    <Variant title="icon only">
      <va-button icon="block" />
      <va-button preset="primary" icon="block" />
      <va-button preset="secondary" icon="block" />
      <va-button preset="plain" icon="block" />
      <va-button preset="plainOpacity" icon="block" />
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
import { VaButton } from '../index'
</script>

<style scoped>
.va-button + .va-button {
  margin-left: 1rem;
}
</style>
