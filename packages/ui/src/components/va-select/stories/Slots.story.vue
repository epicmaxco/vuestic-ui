<script setup lang="ts">
import { VaSelect, VaChip, VaIcon } from '../..'

const alert = (message: string) => window.alert(message)

const options = ['one', 'two', 'three']
</script>

<template>
  <Story title="VaSelect/Visual/Slots">
    <Variant
      title="Prepend slot"
      :initState="() => ({ value: null })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Prepend slot"
        :options="options"
      >
        <template #prepend>
          <va-icon name="share" />
        </template>
      </va-select>
    </Variant>

    <Variant
      title="Prepend inner slot"
      :initState="() => ({ value: null })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Prepend inner slot"
        :options="options"
      >
        <template #prependInner>
          <va-icon name="share" />
        </template>
      </va-select>
    </Variant>

    <Variant
      title="Append inner slot"
      :initState="() => ({ value: null })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Append inner slot"
        :options="options"
      >
        <template #appendInner>
          <va-icon name="share" />
        </template>
      </va-select>
    </Variant>

    <Variant
      title="Append slot"
      :initState="() => ({ value: null })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Append slot"
        :options="options"
      >
        <template #append>
          <va-icon name="share" />
        </template>
      </va-select>
    </Variant>

    <Variant
      title="All slots"
      :initState="() => ({ value: null })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="All slots"
        :options="options"
        clearable
        :messages="['Hint message 1', 'Hint message 2']"
      >
        <template #prepend>
          <va-icon name="share" />
        </template>
        <template #prependInner>
          <va-icon name="share" />
        </template>
        <template #appendInner>
          <va-icon name="share" />
        </template>
        <template #append>
          <va-icon name="share" />
        </template>
      </va-select>
    </Variant>

    <Variant
      title="Content slot"
      :initState="() => ({ value: [] })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Content slot"
        :options="options"
        multiple
      >
        <template #content="{ value }">
          <va-chip>{{ value || "no value :(" }}</va-chip>
          <span class="ml-6">
            Click on share ;)
            <va-icon name="share" @click="alert('Thank you for click!')" />
          </span>
        </template>
      </va-select>
    </Variant>
  </Story>
</template>
