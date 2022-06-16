<template>
  <va-button-toggle
    outline
    v-model="model"
    :options="options"
    class="mb-4"
  />

  <va-button-toggle
    flat
    v-model="model"
    :options="options"
    class="mb-4"
  />

  <va-button-toggle
    :rounded="false"
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
