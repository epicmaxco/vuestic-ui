<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
    <VaInput
      v-model="value"
      label="password"
      type="password"
    />
    <VaInput
      v-model="value"
      label="disabled"
      disabled
    />
    <VaInput
      v-model="value"
      label="readonly"
      readonly
    />
    <VaInput
      placeholder="Some text"
      label="Placeholder"
    />
    <VaInput
      v-model="value"
      pattern="\d{4,4}"
      label="pattern"
    />
    <VaInput
      v-model="value"
      label="inputmode"
      inputmode="numeric"
    />
    <VaInput
      v-model="value"
      label="minlength"
      minlength="4"
    />
    <VaInput
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
