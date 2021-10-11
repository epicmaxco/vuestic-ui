<template>
  <div class="d-flex">
    <va-time-input v-model="value" manual-input />
    <va-divider vertical />
    <va-time-input v-model="value" ampm manual-input />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: new Date(),
    }
  },
}
</script>
