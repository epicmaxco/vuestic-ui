<script setup lang="ts">
import { VaSelect } from '..'

const options = [
  { id: '0', text: 'one', value: 'one' },
  { id: '1', text: 'two', value: 'two' },
  { id: '2', text: 'three', value: 'three' },
  { id: '3', text: 'four', value: 'four' },
  { id: '4', text: 'five', value: 'five' },
]

const addNewOption = (newOption: string, state: { options: any[] }) => {
  const option = {
    id: String(state.options.length),
    text: newOption,
    value: newOption,
  }
  state.options.push(option)
}
</script>

<template>
  <Story title="VaSelect/AutoComplete">
    <Variant
      title="Autocomplete"
      :initState="() => ({ value: null })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        autocomplete
        :options="[
          { id: '1', text: 'Option 1' },
          { id: '2', text: 'Option 2' },
          { id: '3', text: 'Option 3' },
          { id: '4', text: 'Option 4' },
        ]"
      />
    </Variant>

    <Variant
      title="Autocomplete readonly"
      :initState="() => ({ value: null })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        autocomplete
        readonly
        :options="[
          { id: '1', text: 'Option 1' },
          { id: '2', text: 'Option 2' },
          { id: '3', text: 'Option 3' },
          { id: '4', text: 'Option 4' },
        ]"
      />
    </Variant>

    <Variant
      title="Autocomplete disabled"
      :initState="() => ({ value: null })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        autocomplete
        disabled
        :options="[
          { id: '1', text: 'Option 1' },
          { id: '2', text: 'Option 2' },
          { id: '3', text: 'Option 3' },
          { id: '4', text: 'Option 4' },
        ]"
      />
    </Variant>

    <Variant
      title="Multiple autocomplete"
      :initState="() => ({ value: [] })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        autocomplete
        multiple
        :options="[
          { id: '1', text: 'Option 1' },
          { id: '2', text: 'Option 2' },
          { id: '3', text: 'Option 3' },
          { id: '4', text: 'Option 4' },
        ]"
      />
    </Variant>

    <Variant
      title="Multiple autocomplete with max visible options"
      :initState="() => ({ value: [] })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        autocomplete
        multiple
        :max-visible-options="2"
        :options="[
          { id: '1', text: 'Option 1' },
          { id: '2', text: 'Option 2' },
          { id: '3', text: 'Option 3' },
          { id: '4', text: 'Option 4' },
        ]"
      />
    </Variant>

    <Variant
      title="Autocomplete with create new option"
      :initState="
        () => ({
          value: '',
          options,
        })
      "
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        :options="state.options"
        autocomplete
        allow-create
        @create-new="addNewOption($event, state)"
      />
    </Variant>

    <Variant
      title="'unique' mode and single select"
      :initState="() => ({ value: '', options })"
      #default="{ state }"
    >
      <va-select
        v-model="state.allowUniqueValue"
        class="mb-6"
        :options="options"
        @create-new="addNewOption($event, state)"
        track-by="id"
        allow-create="unique"
      />
    </Variant>

    <Variant
      title="'true' mode and multi select"
      :initState="() => ({ value: [], options })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        :options="options"
        @create-new="addNewOption($event, state)"
        track-by="id"
        allow-create
        multiple
      />
    </Variant>

    <Variant
      title="'unique' mode and multi select"
      :initState="() => ({ value: [], options })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        :options="options"
        @create-new="addNewOption($event, state)"
        track-by="id"
        allow-create="unique"
        multiple
      />
    </Variant>

    <Variant
      title="'true' mode and multi select, Max 3 selections"
      :initState="() => ({ value: [], options })"
      #default="{ state }"
    >
      <va-select
        v-model="state.valueMultipleMax"
        class="mb-6"
        :options="options"
        @create-new="addNewOption($event, state)"
        track-by="id"
        allow-create
        multiple
        :max-selections="3"
      />
    </Variant>
  </Story>
</template>
