<template>
  <div class="text--uppercase display-1">This text is in default case, but should be in uppercase because it has text--uppercase class</div>
  <va-input :modelValue="'test'" />

  <div class="row justify--center">
    <div> We </div>
    <div> are </div>
    <div> inside the row class </div>
    But grid is not imported so we are not.
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({ name: 'App' })
</script>
