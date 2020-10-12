<template>
  <div>
    <va-button-toggle
      color="primary"
      v-model="model"
      :options="options"
    />

    <div class="mb-2" />

    <va-button-toggle
      color="success"
      v-model="model"
      :options="options"
    />

    <div class="mb-2" />

    <va-button-toggle
      toggle-color="warning"
      color="danger"
      v-model="model"
      :options="options"
    />

    <div class="mb-2" />

    <va-button-toggle
      toggle-color="#5600ff"
      color="#7e06ae"
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
