<script setup lang="ts">
import { VaSelect } from '..'

const options = [
  { id: '1', text: 'Option 1' },
  { id: '2', text: 'Option 2' },
  { id: '3', text: 'Option 3' },
  { id: '4', text: 'Option 4' },
]
</script>

<template>
  <Story title="VaSelect/Validation">
    <Variant
      title="At least 1 option should be selected"
      :initState="() => ({ value: [] })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="At least 1 option should be selected"
        :options="options"
        :rules="[
          (val) =>
            (val && val.length > 0) || 'Please select at least one option',
        ]"
        multiple
      />
    </Variant>

    <Variant
      title="Exactly 2 options should be selected"
      :initState="() => ({ multipleValue: [] })"
      #default="{ state }"
    >
      <va-select
        v-model="state.multipleValue"
        class="mb-6"
        label="Exactly 2 options should be selected"
        :options="options"
        :rules="[
          (val) =>
            (val && val.length === 2) || 'Please select exactly two options',
        ]"
        multiple
      />
    </Variant>
  </Story>
</template>
