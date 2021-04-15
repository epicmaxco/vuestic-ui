<template>
  <div>
    <va-button-toggle
      outline
      v-model="model"
      :options="options"
    />

    <div class="mb-2" />

    <va-button-toggle
      flat
      v-model="model"
      :options="options"
    />

    <div class="mb-2" />

    <va-button-toggle
      :round="false"
      v-model="model"
      :options="options"
    />
  </div>
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
