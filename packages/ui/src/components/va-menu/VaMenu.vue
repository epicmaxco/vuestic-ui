<template>
  <va-dropdown v-model="doShowDropdown" :stateful="false">
    <template #anchor>
      <VaButton>
        Слава Україні!!!
      </VaButton>
    </template>
    <template #default>
      <VaDropdownContent>
        <va-menu-list
          v-slot="slotData">
          <slot name="options" v-bind="slotData || {}"></slot>
        </va-menu-list>
      </VaDropdownContent>
    </template>
  </va-dropdown>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { VaButton } from '../va-button'
import { VaDropdown, VaDropdownContent } from '../va-dropdown/'
import { VaMenuList } from './components/VaMenuList'
export default defineComponent({
  name: 'VaMenu',
  components: { VaDropdown, VaDropdownContent, VaButton },
  props: {

  },
  setup (props) {
    const doShowDropdown = ref(false)

    return { doShowDropdown }
  },
})

</script>

<style lang="scss">

</style>
