<template>
  <div class="flex lg3 xs12">
    <div class="mb-4">{{ selection }}</div>
    <va-checkbox
      v-model="selection"
      array-value="one"
      label="one"
    />
    <va-checkbox
      v-model="selection"
      array-value="two"
      label="two"
    />
    <va-checkbox
      v-model="selection"
      array-value="three"
      label="three"
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
