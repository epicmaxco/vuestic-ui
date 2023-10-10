<template>
  <!-- <va-dropdown class="va-dropdown" v-bind="dropdownProps" stick-to-edges v-model="doShowDropdown">
    <template #anchor>
      <slot name="anchor">
        <VaButton>
          Слава Україні!!!
        </VaButton>
      </slot>
    </template>
    <template #default>
      <VaDropdownContent :no-padding="true">
        <va-menu-list :options="options" @option-click="$emit('option-click', $event)">
          <template #left-icon>
            <slot name="left-icon" />
          </template>
        </va-menu-list>
      </VaDropdownContent>
    </template>
  </va-dropdown> -->
  <va-menu-list :options="options" @option-click="$emit('option-click', $event)">
    <template #left-icon>
      <slot name="left-icon" />
    </template>
  </va-menu-list>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { VaButton } from '../va-button'
import { VaDropdown, VaDropdownContent } from '../va-dropdown/'
import VaMenuList from './components/VaMenuList.vue'
import { useSelectableList, useSelectableListProps } from '../../composables'
import { extractComponentProps, filterComponentProps } from '../../utils/component-options'

const VaDropdownProps = extractComponentProps(VaDropdown)
export default defineComponent({
  name: 'VaMenu',
  components: { VaDropdown, VaDropdownContent, VaButton, VaMenuList },
  props: {
    ...useSelectableListProps,
    ...VaDropdownProps,

  },
  setup (props) {
    const doShowDropdown = ref(false)

    return {
      doShowDropdown,
      dropdownProps: filterComponentProps(VaDropdownProps),
    }
  },
})

</script>

<style lang="scss">
.va-dropdown {
  margin: 0;
  padding: 0;
}
</style>
