<script setup lang="ts">
import { VaSelect } from '..'

const options = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
]
</script>

<template>
  <Story title="VaSelect/State">
    <Variant
      title="Readonly"
      :initState="() => ({ value: 'one' })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Readonly"
        placeholder="Try to type in ..."
        :options="options"
        readonly
      />
    </Variant>

    <Variant
      title="Disabled"
      :initState="() => ({ value: 'one' })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Disabled"
        placeholder="Try to focus ..."
        :options="options"
        disabled
      />
    </Variant>

    <Variant
      title="Loading"
      :initState="() => ({ value: 'one' })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Loading"
        :options="options"
        loading
      />
    </Variant>

    <Variant
      title="Error state"
      :initState="() => ({ value: 'one' })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Error state"
        :options="options"
        error
      />
    </Variant>

    <Variant
      title="Error state with messages"
      :initState="() => ({ value: 'one' })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Error state with messages"
        :options="options"
        error
        :error-messages="['Error message']"
      />
    </Variant>

    <Variant
      title="Success state"
      :initState="() => ({ value: 'one' })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Success state"
        :options="options"
        success
      />
    </Variant>

    <Variant
      title="Success state"
      :initState="() => ({ value: '' })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Success state"
        :options="[
          { id: '0', text: 'one', value: 'one' },
          { id: '1', text: 'two', value: 'two' },
          { id: '2', text: 'three', value: 'three' },
          { id: '3', text: 'four', value: 'four' },
          { id: '4', text: 'five', value: 'five' },
        ]"
        success
      />
    </Variant>

    <Variant
      title="Success state with messages"
      :initState="() => ({ value: '' })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Success state with messages"
        :options="[
          { id: '0', text: 'one', value: 'one' },
          { id: '1', text: 'two', value: 'two' },
          { id: '2', text: 'three', value: 'three' },
          { id: '3', text: 'four', value: 'four' },
          { id: '4', text: 'five', value: 'five' },
        ]"
        success
        :messages="['Success message']"
      />
    </Variant>
  </Story>
</template>
