<template>
  <va-button-toggle
    disabled
    v-model="model"
    :options="options"
    class="mb-4"
  />

  <va-button-toggle
    round
    disabled
    v-model="model"
    :options="options"
    class="mb-4"
  />

  <va-button-toggle
    preset="secondary"
    border-color="primary"
    disabled
    v-model="model"
    :options="options"
    class="mb-4"
  />

  <va-button-toggle
    preset="plain"
    disabled
    v-model="model"
    :options="options"
  />
</template>

<script>
export default {
  data () {
    return {
      options: [
        { label: 'One', value: 'one' },
        { label: 'Two', value: 'two' },
        { label: 'Three', value: 'three' },
      ],
      model: 'two',
    }
  },
}
</script>
