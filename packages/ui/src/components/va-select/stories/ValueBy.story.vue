<script setup lang="ts">
import { VaSelect } from '..'

const options = [
  { id: '0', text: 'one', value: 'one' },
  { id: '1', text: 'two', value: 'two' },
  { id: '2', text: 'three', value: 'three' },
  { id: '3', text: 'four', value: 'four' },
  { id: '4', text: 'five', value: 'five' },
]
</script>

<template>
  <Story title="VaSelect/ValueBy">
    <Variant
      title="Single select text by text (default)"
      :initState="() => ({ value: '' })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Single select text by text (default)"
        :options="options"
        text-by="text"
      />
    </Variant>

    <Variant
      title="Text by value"
      :initState="() => ({ value: '' })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Text by value"
        :options="options"
        text-by="value"
      />
    </Variant>

    <Variant
      title="Track by text property"
      :initState="() => ({ value: '' })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Track by text property"
        :options="options"
        track-by="text"
      />
    </Variant>

    <Variant
      title="Track by text property (function)"
      :initState="() => ({ value: '' })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Track by text property (function)"
        :options="options"
        track-by="text"
      />
    </Variant>

    <Variant
      title="Multi select Text by value"
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
      title="Searchable multiselect text-by value"
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
      title="Multi select value by value"
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
  </Story>
</template>
