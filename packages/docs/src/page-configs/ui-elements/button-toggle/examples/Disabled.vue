<template>
  <va-button-toggle
    disabled
    v-model="model"
    :options="options"
    class="mb-4"
  />

  <va-button-toggle
    :rounded="false"
    disabled
    v-model="model"
    :options="options"
    class="mb-4"
  />

  <va-button-toggle
    outline
    disabled
    v-model="model"
    :options="options"
    class="mb-4"
  />

  <va-button-toggle
    flat
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
