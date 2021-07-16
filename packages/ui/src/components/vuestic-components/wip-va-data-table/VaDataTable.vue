<template>
  <div class="va-data-table">
    <va-inner-loading :loading="loading">
      <table>
        <caption v-if="$slots.caption">
          <slot name="caption" />
        </caption>
        <thead v-if="!hideDefaultHeader">
          <tr>
            <slot name="header">
              <th v-for="header in headers"
                :key="header.key"
                :data-table-header="header.key">
                <table-header-cell :header="header" v-model:sort-by="currentSortBy" v-model:sort-desc="currentSortDesc">
                  <template v-if="$slots['header:cell']" #cell="{ options }">
                    <slot name="header:cell" :options="options" />
                  </template>
                  <template v-if="$slots[`header:cell_${header.key}`]" v-slot:[`cell_${header.key}`]="{ options }">
                    <slot :name="`header:cell_${header.key}`" :options="options" />
                  </template>
                </table-header-cell>
              </th>
            </slot>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredItems" :key="item[itemKey] || index">
            <td v-for="header in headers"
              :key="header.key">{{ item[header.key] }}</td>
          </tr>
        </tbody>
      </table>
      <slot name="footer">
        <va-data-table-footer v-bind="paginationProps">
          <template v-if="$slots['footer:items-per-page']" #items-per-page>
            <slot name="footer:items-per-page" />
          </template>
          <template v-if="$slots['footer:pagination']" #pagination>
            <slot name="footer:pagination" />
          </template>
        </va-data-table-footer>
      </slot>
    </va-inner-loading>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs, computed } from 'vue'
import VaInnerLoading from '../va-inner-loading/VaInnerLoading.vue'
import VaIcon from '../va-icon/VaIcon.vue'
import VaSelect from '../va-select/VaSelect.vue'
import VaDataTableFooter from './VaDataTableFooter.vue'
import TableHeaderCell from './TableHeaderCell.vue'
import { useDataTablePagination, paginationOptions } from './hooks/pagination'
import DataTableHeader from './DataTableHeader';
import { useSyncProp } from './hooks/sync-prop'
import _sortBy from 'lodash/sortBy';

export default  defineComponent ({
  name: 'VaDataTable',
  components: {
    VaInnerLoading,
    VaIcon,
    VaSelect,
    VaDataTableFooter,
    TableHeaderCell,
  },
  props: {
    ...paginationOptions.props,
    items: {
      type: Array as PropType<Object[]>,
      required: true,
    },
    headers: {
      type: Array as PropType<DataTableHeader[]>,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    itemKey: {
      type: String,
      default: 'id',
    },
    hideDefaultHeader: {
      type: Boolean,
      default: false,
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
  emits: [...paginationOptions.emits, 'update:sortBy', 'update:sortDesc'],
  setup (props, { emit, slots }) {
    const { sortBy, sortDesc, items, itemsLength } = toRefs(props)
    const { syncProp: currentSortBy } = useSyncProp(sortBy, 'sortBy', emit, '')
    const { syncProp: currentSortDesc } = useSyncProp(sortDesc, 'sortDesc', emit, false)
    const sortedItems = computed(() => {
      if (itemsLength.value || !currentSortBy.value) {
        return items.value
      }
      const sorted = _sortBy(items.value, currentSortBy.value)
      return currentSortDesc.value ? sorted.reverse() : sorted
    });
    const { filteredItems, paginationProps } = useDataTablePagination(props, emit, slots, sortedItems)

    return {
      filteredItems,
      paginationProps,
      currentSortBy,
      currentSortDesc,
    }
  },
})
</script>

<style lang="scss">
@import "variables";

.va-data-table__header-cell {
  display: var(--va-data-table-header-cell-display);
  align-items: var(--va-data-table-header-cell-align-items);
}
</style>
