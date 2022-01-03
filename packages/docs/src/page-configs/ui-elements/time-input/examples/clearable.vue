<template>
  <div class="d-flex">
    <va-time-input v-model="value" clearable />
    <va-divider vertical />
    <va-time-input v-model="value" leftIcon clearable />
    <va-divider vertical />
    <va-time-input v-model="value" clearable clearableIcon="cancel" color="warning" />
    <va-divider vertical />
    <va-time-input v-model="value" clearable readonly />
  </div>
</template>

<script>
export default {
  data () {
    return { value: new Date() }
  },
}
</script>
