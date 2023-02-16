<template>
  <div style="max-width: 300px">
    <va-input
      v-model="value"
      type="password"
      class="mb-6"
    />
    <va-input
      v-model="value"
      disabled
      class="mb-6"
    />
    <va-input
      v-model="value"
      readonly
      class="mb-6"
    />
    <va-input
      placeholder="First name"
      class="mb-6"
    />
    <va-input
      v-model="value"
      pattern="\d{4,4}"
      class="mb-6"
    />
    <va-input
      v-model="value"
      inputmode="numeric"
      class="mb-6"
    />
    <va-input
      v-model="value"
      minlength="4"
      class="mb-6"
    />
    <va-input
      v-model="value"
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
