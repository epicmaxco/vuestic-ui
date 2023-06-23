<template>
  <va-menu
    v-model="defaultSingleSelect.value"
    class="mb-6"
    :options="defaultSingleSelect.options"
  />
</template>

<script lang="ts">
import VaMenu from "./VaMenu.vue"

export default {
  components: { VaMenu },
  data () {
    return {
      defaultSingleSelect: {
        options: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
        value: 'one',
      },
    }
  }
}

</script>