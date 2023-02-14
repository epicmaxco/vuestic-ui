<template>
  <va-button-toggle
    color="primary"
    v-model="model"
    :options="options"
    class="mb-6"
  />

  <va-button-toggle
    color="success"
    v-model="model"
    :options="options"
    class="mb-6"
  />

  <va-button-toggle
    color="warning"
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
