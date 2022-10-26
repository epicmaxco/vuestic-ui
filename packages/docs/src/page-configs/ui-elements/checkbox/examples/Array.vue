<template>
  <div class="d-flex flex-direction-column">
    <div class="mb-4">{{ selection }}</div>
    <va-checkbox
      v-model="selection"
      array-value="one"
      label="one"
      class="mb-4"
    />
    <va-checkbox
      v-model="selection"
      array-value="two"
      label="two"
      class="mb-4"
    />
    <va-checkbox
      v-model="selection"
      array-value="three"
      label="three"
      class="mb-4"
    />
    <va-checkbox
      v-model="selection"
      array-value="four"
      label="four"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      selection: ['one', 'four'],
    }
  },
}
</script>
