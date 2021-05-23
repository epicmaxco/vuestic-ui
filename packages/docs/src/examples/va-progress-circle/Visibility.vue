<template>
  <div class="flex lg6 xs12 py-4">
    <va-checkbox
      v-model="invisible"
      label="Hide the progress circle"
    />
    <br>
    <va-progress-circle
      :modelValue="60"
      :invisible="invisible"
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
