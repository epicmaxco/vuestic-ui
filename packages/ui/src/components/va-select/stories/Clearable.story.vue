<script setup lang="ts">
import { VaSelect } from '..'
</script>

<template>
  <Story title="VaSelect/Clearable">
    <Variant
      title="Clearable"
      :initState="
        () => ({
          value: null,
          options: [
            { id: 1, text: 'one', value: 1 },
            { id: 2, text: 'two', value: 2 },
            { id: 3, text: 'three', value: 3 },
          ],
        })
      "
      #default="{ state }"
    >
      <va-select v-model="state.value" :options="state.options" clearable />
    </Variant>

    <Variant
      title="Clearable with custom clear value as string"
      :initState="
        () => ({
          value: null,
          options: [
            { id: 1, text: 'one', value: 1 },
            { id: 2, text: 'two', value: 2 },
            { id: 3, text: 'three', value: 3 },
          ],
        })
      "
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        :options="state.options"
        clear-value="None"
        clearable
      />
    </Variant>

    <Variant
      title="Clearable with custom clear value as object"
      :initState="
        () => ({
          value: null,
          options: [
            { id: 1, text: 'one', value: 1 },
            { id: 2, text: 'two', value: 2 },
            { id: 3, text: 'three', value: 3 },
          ],
        })
      "
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        :options="state.options"
        :clear-value="{ id: 0, text: 'None', value: null }"
        clearable
      />
    </Variant>
  </Story>
</template>
