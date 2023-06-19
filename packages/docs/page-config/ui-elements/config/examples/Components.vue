<template>
  <va-button-toggle
    v-model="config"
    :options="[
      {
        label: 'Outline',
        value: {
          VaInput: { outline: true },
          VaSelect: { outline: true },
          VaButton: { preset: 'secondary' },
        },
      },
      {
        label: 'Solid',
        value: {
          VaInput: { bordered: true },
          VaSelect: { bordred: true },
        },
      },
    ]"
    class="mb-4"
  />

  <va-config :components="config">
    <va-card>
      <va-card-title>My Card</va-card-title>
      <va-card-content class="flex gap-2 flex-col">
        <va-input label="Login" />
        <va-input label="Password" />
        <va-select :options="['one', 'two', 'three']" label="Country" />
      </va-card-content>
      <va-card-actions align="right">
        <va-button>My Button</va-button>
      </va-card-actions>
    </va-card>
  </va-config>
</template>

<script setup lang="ts">
const config = ref();
</script>
