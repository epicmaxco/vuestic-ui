<template>
  <va-button-toggle
    v-model="model"
    :options="options"
    class="mb-4"
  />

  <va-button-toggle
    preset="primary"
    v-model="model"
    :options="options"
    class="mb-4"
  />

  <va-button-toggle
    preset="plain"
    v-model="model"
    :options="options"
    class="mb-4"
  />

  <va-button-toggle
    round
    v-model="model"
    :options="options"
    class="mb-4"
  />

  <va-button-toggle
    preset="secondary"
    border-color="primary"
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
