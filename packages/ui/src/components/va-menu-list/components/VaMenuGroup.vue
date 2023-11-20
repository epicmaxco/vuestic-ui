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

<style lang="scss" scoped>
.va-menu-list__group-name {
  font-size: 9px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  padding: 0 var(--va-menu-padding-x);
}
</style>
