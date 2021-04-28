<template>
  <div style="max-width: 300px;">
    <va-select
      class="mb-4"
      label="Disabled"
      :options="options"
      v-model="value"
      disabled
    />
    <va-select
      class="mb-4"
      label="Loading"
      :options="options"
      v-model="value"
      loading
    />
    <va-select
      class="mb-4"
      label="Error state"
      :options="options"
      v-model="value"
      error
    />
    <va-select
      class="mb-4"
      label="Error state with messages"
      :options="options"
      v-model="value"
      error
      :error-messages="['Error message']"
    />
    <va-select
      class="mb-4"
      label="Success state"
      :options="options"
      v-model="value"
      success
    />
    <va-select
      class="mb-4"
      label="Success state with messages"
      :options="options"
      v-model="value"
      success
      :messages="['Success message']"
    />
  </div>
</template>

<script>
export default {
  name: 'State',
  data () {
    return {
      options: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
      value: '',
    }
  },
}
</script>
