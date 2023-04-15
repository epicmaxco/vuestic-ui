<script setup lang="ts">
import { VaSelect } from '..'

const options = [
  { id: '0', text: 'Option 1', value: 'Option 1' },
  { id: '1', text: 'Option 2', value: 'Option 2' },
  { id: '2', text: 'Option 3', value: 'Option 3' },
]
</script>

<template>
  <Story title="VaSelect/Visual/Decorators">
    <Variant
      title="With label"
      :initState="() => ({ value: '' })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="With label"
        :options="options"
      />
    </Variant>

    <Variant
      title="Long label"
      :initState="() => ({ value: '' })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
        placeholder="Long label"
        :options="options"
      />
    </Variant>

    <Variant
      title="With placeholder"
      :initState="() => ({ value: '' })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        placeholder="With placeholder"
        :options="options"
      />
    </Variant>

    <Variant
      title="Long placeholder"
      :initState="() => ({ value: '' })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Long placeholder"
        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
        :options="options"
      />
    </Variant>

    <Variant
      title="No options"
      :initState="() => ({ value: '' })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="No options"
        :options="[]"
      />
    </Variant>

    <Variant
      title="No options with custom text"
      :initState="() => ({ value: '' })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="No options with custom text"
        :options="[]"
        no-options-text="Sorry, nothing to show :("
      />
    </Variant>
  </Story>
</template>
