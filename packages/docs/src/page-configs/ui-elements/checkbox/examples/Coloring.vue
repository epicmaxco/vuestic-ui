<template>
  <va-checkbox class="mb-2" color="primary" v-model="value" label="Primary" />
  <va-checkbox class="mb-2" color="#9c27b0" v-model="value" label="Custom color with icon" checked-icon="loop" />
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
