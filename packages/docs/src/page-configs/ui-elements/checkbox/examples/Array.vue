<template>
  <div class="flex lg3 xs12">
    <div class="mb-4">{{ selection }}</div>
    <va-checkbox
      v-model="selection"
      array-value="one"
      label="one"
      class="mb-2"
    />
    <va-checkbox
      v-model="selection"
      array-value="two"
      label="two"
      class="mb-2"
    />
    <va-checkbox
      v-model="selection"
      array-value="three"
      label="three"
      class="mb-2"
    />
    <va-checkbox
      v-model="selection"
      array-value="four"
      label="four"
      class="mb-2"
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
