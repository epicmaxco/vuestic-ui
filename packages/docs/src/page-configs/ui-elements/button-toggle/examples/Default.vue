<template>
  <va-button-toggle
    v-model="model"
    :options="[
        { label: 'One', value: 'one' },
        { label: 'Two', value: 'two' },
        { label: 'Three', value: 'three' },
      ]"
  />
</template>

<script>
export default {
  data () {
    return {
      model: 'two',
    }
  },
}
</script>
