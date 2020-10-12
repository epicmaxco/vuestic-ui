<template>
  <div>
    <va-button-toggle
      disabled
      v-model="model"
      :options="options"
    />

    <div class="mb-2" />

    <va-button-toggle
      :round="false"
      disabled
      v-model="model"
      :options="options"
    />

    <div class="mb-2" />

    <va-button-toggle
      outline
      disabled
      v-model="model"
      :options="options"
    />

    <div class="mb-2" />

    <va-button-toggle
      flat
      disabled
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
