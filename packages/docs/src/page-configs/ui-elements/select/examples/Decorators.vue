<template>
  <div style="max-width: 300px;">
    <va-select
      class="mb-4"
      label="With label"
      :options="options"
      v-model="value"
    />
    <va-select
      class="mb-4"
      label="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
      placeholder="Long label"
      v-model="value"
      :options="options"
    />
    <va-select
      class="mb-4"
      placeholder="With placeholder"
      :options="options"
      v-model="value"
    />
    <va-select
      class="mb-4"
      label="Long placeholder"
      placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
      v-model="value"
      :options="options"
    />
    <va-select
      class="mb-4"
      label="No options"
      v-model="value"
      :options="[]"
    />
    <va-select
      class="mb-4"
      label="No options with custom text"
      v-model="value"
      :options="[]"
      noOptionsText="Sorry, nothing to show :("
    />
    <va-select
      class="mb-4"
      label="Clearable"
      :options="options"
      v-model="value"
      clearable
    />
    <va-select
      class="mb-4"
      label="Clearable and custom clear icon"
      :options="options"
      v-model="value"
      clearable
      clearableIcon="cancel"
    />
    <va-select
      class="mb-4"
      label="Hint messages"
      :options="options"
      v-model="value"
      :messages="['Hint message 1', 'Hint message 2']"
    />
    <va-select
      class="mb-4"
      label="Hide selected"
      :options="options"
      v-model="value"
      hideSelected
    />
    <va-select
      class="mb-4"
      label="Custom list position (top)"
      :options="options"
      v-model="value"
      position="top"
    />
    <va-select
      class="mb-4"
      label="Custom list position (bottom)"
      :options="options"
      v-model="value"
      position="bottom"
    />
    <va-select
      class="mb-4"
      label="Custom list height (320px)"
      :options="options"
      v-model="value"
      maxHeight="320px"
    />
  </div>
</template>

<script>
export default {
  name: 'Decorators',
  data () {
    return {
      options: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
      value: '',
    }
  },
}
</script>
