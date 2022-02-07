<template>
  <div class="d-flex">
    <va-time-input v-model="value" />
    <va-divider vertical />
    <va-time-input v-model="value" ampm />
  </div>
</template>

<script>
export default {
  data () {
    return { value: new Date() }
  },
}
</script>
