<template>
  <div class="flex lg6 xs12 py-4">
    <va-checkbox
      v-model="invisible"
      label="Hide the large progress bar"
    />
    <br>
    <va-progress-bar
      :invisible="invisible"
      size="large"
    />
  </div>
</template>

<script lang="ts">
export default {
  data () {
    return {
      invisible: true,
    }
  },
}
</script>
