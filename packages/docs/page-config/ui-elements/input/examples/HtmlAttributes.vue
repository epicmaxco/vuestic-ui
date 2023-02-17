<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <va-input
      v-model="value"
      label="password"
      type="password"
      class="mb-6"
    />
    <va-input
      v-model="value"
      label="disabled"
      disabled
      class="mb-6"
    />
    <va-input
      v-model="value"
      label="readonly"
      readonly
      class="mb-6"
    />
    <va-input
      placeholder="Some text"
      label="Placeholder"
      class="mb-6"
    />
    <va-input
      v-model="value"
      pattern="\d{4,4}"
      label="pattern"
      class="mb-6"
    />
    <va-input
      v-model="value"
      label="inputmode"
      inputmode="numeric"
      class="mb-6"
    />
    <va-input
      v-model="value"
      label="minlength"
      minlength="4"
      class="mb-6"
    />
    <va-input
      v-model="value"
      label="maxlength"
      maxlength="10"
    />
  </div>
</template>

<script>
export default {
  name: 'HtmlAttributes',
  data: () => ({
    value: '',
  }),
}
</script>
