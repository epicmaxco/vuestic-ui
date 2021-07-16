<template>
  <div class="va-data-table__header-cell" :class="classesComputed" @click="onCellClick()">
    <slot :name="`cell_${header.key}`" :options="header">
      <slot name="cell" :options="header">
        <div class="va-data-table__header-label">{{ header.label }}</div>
        <va-icon
          v-if="header.sortable"
          class="va-data-table__header-icon"
          :name="iconName"
          size="small"
        />
      </slot>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, PropType, computed } from 'vue'
import VaPagination from '../va-pagination/VaPagination.vue'
import VaSelect from '../va-select/VaSelect.vue'
import DataTableHeader from './DataTableHeader';

export default  defineComponent ({
  name: 'TableHeaderCell',
  components: {
    VaPagination,
    VaSelect,
  },
  props: {
    header: {
      type: Object as PropType<DataTableHeader>,
      required: true,
    },
    sortBy: {
      type: [String, Array as () => String[]],
      default: undefined,
    },
    sortDesc: {
      type: [Boolean, Array as () => Boolean[]],
      default: undefined,
    },
  },
  emits: ['update:sortBy', 'update:sortDesc'],
  setup (props, { emit }) {
    const { header, sortBy, sortDesc } = toRefs(props)
    const isActiveSortable = computed(() => sortBy.value === header.value.key)
    const iconName = computed(() => isActiveSortable.value && sortDesc.value ? 'arrow_drop_up' : 'arrow_drop_down')
    const classesComputed = computed(() => ({
      'va-data-table__header-cell-sortable': header.value.sortable,
      'va-data-table__header-cell-sortable-active': isActiveSortable.value,
    }))

    function onCellClick () {
      if (!isActiveSortable.value) {
        emit('update:sortBy', header.value.key)
      }
      emit('update:sortDesc', isActiveSortable.value && !sortDesc.value)
    }

    return {
      iconName,
      classesComputed,
      onCellClick,
    }
  },
})
</script>

<style lang="scss">
@import "variables";

.va-data-table__header-cell {
  display: var(--va-data-table-header-cell-display);
  align-items: var(--va-data-table-header-cell-align-items);

  .va-data-table__header-icon {
    opacity: var(--va-data-table-header-icon-opacity);
  }

  &-sortable {
    cursor: var(--va-data-table-header-cell-sortable-cursor);

    &-active {
      .va-data-table__header-icon {
        opacity: 1;
      }
    }
  }

  &:hover {
    .va-data-table__header-icon {
      opacity: 1;
    }
  }
}
</style>
