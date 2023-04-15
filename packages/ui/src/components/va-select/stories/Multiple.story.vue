<script setup lang="ts">
import { VaSelect } from '..'

const options = [
  { id: '0', text: 'One', value: 'one' },
  { id: '1', text: 'Two', value: 'two' },
  { id: '2', text: 'Three', value: 'three' },
  { id: '3', text: 'Four', value: 'four' },
  { id: '4', text: 'Five', value: 'five' },
]
</script>

<template>
  <Story title="VaSelect/Multi-select">
    <Variant
      title="Multi-select with text by value"
      :initState="() => ({ value: [] })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Multi select Text by value"
        :options="options"
        text-by="value"
        multiple
      />
    </Variant>

    <Variant
      title="Searchable multi-select with text by value"
      :initState="() => ({ value: [] })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Searchable multiselect text-by value"
        :options="options"
        text-by="value"
        multiple
        searchable
      />
    </Variant>

    <Variant
      title="Multi-select with value by value"
      :initState="() => ({ value: [] })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Multi select value by value"
        :options="options"
        text-by="value"
        value-by="value"
        multiple
      />
    </Variant>

    <Variant
      title="Multi-select with value by value"
      :initState="() => ({ value: [] })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Multi select value by value"
        :options="options"
        text-by="value"
        value-by="value"
        multiple
        searchable
      />
    </Variant>
    <Variant
      title="Default"
      :initState="() => ({ value: [] })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Default"
        :options="[
          { id: '1', text: 'Option 1' },
          { id: '2', text: 'Option 2' },
          { id: '3', text: 'Option 3' },
          { id: '4', text: 'Option 4' },
        ]"
        multiple
      />
    </Variant>

    <Variant
      title="Default, hide selected"
      :initState="() => ({ value: [] })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Default, hide selected"
        :options="[
          { id: '1', text: 'Option 1' },
          { id: '2', text: 'Option 2' },
          { id: '3', text: 'Option 3' },
          { id: '4', text: 'Option 4' },
        ]"
        multiple
        hide-selected
      />
    </Variant>

    <Variant
      title="Max selections (3)"
      :initState="() => ({ value: [] })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Max selections (3)"
        :options="[
          { id: '1', text: 'Option 1' },
          { id: '2', text: 'Option 2' },
          { id: '3', text: 'Option 3' },
          { id: '4', text: 'Option 4' },
        ]"
        multiple
        :max-selections="3"
      />
    </Variant>
  </Story>
</template>
