<template>
  <va-dropdown class="va-dropdown" v-model="doShowDropdown" :stateful="false">
    <template #anchor>
      <VaButton>
        Слава Україні!!!
      </VaButton>
    </template>
    <template #default>
      <VaDropdownContent :no-padding="true">
        <va-menu-list
          :options="options"
          @option-click="$emit('option-click', $event)"
        >
        </va-menu-list>
      </VaDropdownContent>
    </template>
  </va-dropdown>

</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { VaButton } from '../va-button'
import { VaDropdown, VaDropdownContent } from '../va-dropdown/'
import VaMenuList from './components/VaMenuList.vue'
import { useSelectableList, useSelectableListProps } from '../../composables'

export default defineComponent({
  name: 'VaMenu',
  components: { VaDropdown, VaDropdownContent, VaButton, VaMenuList },
  props: {
    ...useSelectableListProps,

  },
  setup (props) {
    const doShowDropdown = ref(false)

    return { doShowDropdown }
  },
})

</script>

<style lang="scss">
.va-dropdown {
  margin: 0;
  padding: 0;
}
</style>
