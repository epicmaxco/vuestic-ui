<template>
  <tr v-bind="$attrs">
    <td class="va-menu-list__group-name" colspan="99999">
      {{ groupName }}
    </td>
  </tr>
  <slot />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VaMenuGroup',
  props: {
    groupName: {
      type: String,
      required: true,
    },
  },
})
</script>
