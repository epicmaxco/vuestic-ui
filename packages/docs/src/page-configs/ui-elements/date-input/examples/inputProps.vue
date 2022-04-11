<template>
  <va-date-input
    class="mb-4"
    label="readonly"
    readonly
  />

  <va-date-input
    class="mb-4"
    label="disabled"
    disabled
  />

  <va-date-input
    class="mb-4"
    label="color"
    color="#ff00ff"
  />

  <va-date-input
    class="mb-4"
    label="placeholder"
    placeholder="Custom placeholder"
  />

  <va-date-input
    class="mb-4"
    label="clearable"
    stateful
    clearable
  />

  <va-date-input
    class="mb-4"
    label="outline"
    outline
  />

  <va-date-input
    label="bordered"
    bordered
  />
</template>

<style>
.va-date-input {
  max-width: 240px;
}
</style>
