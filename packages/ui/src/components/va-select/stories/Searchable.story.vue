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
  <Story title="VaSelect/Searchable">
    <Variant
      title="Searchable select"
      :initState="() => ({ value: '' })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Searchable single select"
        :options="options"
        searchable
      />
    </Variant>

    <Variant
      title="Searchable multi-select"
      :initState="() => ({ value: [] })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Searchable multi select"
        :options="options"
        multiple
        searchable
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
        label="Searchable changed text"
        :options="options"
        searchable
        searchtext="test"
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
        label="Search with throttling"
        :options="options"
        :delay="1000"
        searchable
      />
    </Variant>
  </Story>
</template>
