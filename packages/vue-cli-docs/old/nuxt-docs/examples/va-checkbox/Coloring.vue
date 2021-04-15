<template>
  <div>
    <va-checkbox color="purple" v-model="value" label="Purple" />
    <va-checkbox color="primary" v-model="value" label="Primary" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: true,
    }
  },
}
</script>
