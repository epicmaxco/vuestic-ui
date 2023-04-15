<script setup lang="ts">
import { VaSelect } from '../..'

const options = [
  { id: '1', text: 'Option 1' },
  { id: '2', text: 'Option 2' },
  { id: '3', text: 'Option 3' },
  { id: '4', text: 'Option 4' },
]
</script>

<template>
  <Story title="VaSelect/Visual/Dropdown">
    <Variant
      title="Custom list placement (top)"
      :initState="() => ({ value: '' })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Custom list placement (top)"
        :options="options"
        placement="top"
      />
    </Variant>

    <Variant
      title="Custom list placement (bottom)"
      :initState="() => ({ value: '' })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Custom list placement (bottom)"
        :options="options"
        placement="bottom"
      />
    </Variant>

    <Variant
      title="Custom list height (320px)"
      :initState="() => ({ value: '' })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Custom list height (320px)"
        :options="options"
        max-height="320px"
      />
    </Variant>

    <Variant
      title="Custom select width (50%)"
      :initState="() => ({ value: '' })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Custom select width (50%)"
        :options="options"
        width="50%"
      />
    </Variant>
  </Story>
</template>
