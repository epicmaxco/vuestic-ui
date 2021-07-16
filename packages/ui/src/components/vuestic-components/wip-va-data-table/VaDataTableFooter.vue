<template>
  <div v-if="showItemsPerPage || showPagination" class="va-data-table__footer">
    <div v-if="showItemsPerPage" class="va-data-table__select">
      <slot name="items-per-page">
        <va-select
          v-model="currentItemsPerPage"
          :label="itemsPerPageLabel"
          :options="itemsPerPageOptions"
          :disabled="disabledItemsPerPage"
        />
      </slot>
    </div>
    <div
      v-if="showPagination"
      class="va-data-table__pagination"
    >
      <slot name="pagination">
        <va-pagination
          v-model="page"
          :pages="paginationTotal"
          :disabled="disabledPagination"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, PropType, computed, inject, WritableComputedRef, ComputedRef } from 'vue'
import VaPagination from '../va-pagination/VaPagination.vue'
import VaSelect from '../va-select/VaSelect.vue'

type RowsPerPageOptionType = { text: string, value: number }

export default  defineComponent ({
  name: 'VaDataTableFooter',
  components: {
    VaPagination,
    VaSelect,
  },
  props: {
    itemsPerPageLabel: {
      type: String,
      default: 'Rows per page:',
    },
    itemsPerPageOptions: {
      type: Array as PropType<RowsPerPageOptionType[]>,
      default: () => [{ text: '5', value: 5 }, { text: '10', value: 10 }, { text: '15', value: 15 }, { text: 'All', value: 0 }],
    },
    hideItemsPerPage: {
      type: Boolean,
      default: false,
    },
    disabledItemsPerPage: {
      type: Boolean,
      default: false,
    },
    disabledPagination: {
      type: Boolean,
      default: false,
    },
  },
  setup (props, { slots }) {
    const { itemsPerPageOptions, hideItemsPerPage } = toRefs(props)
    const page = inject<WritableComputedRef<number>>('page')
    const itemsPerPage = inject<WritableComputedRef<number>>('itemsPerPage')
    const paginationTotal = inject<ComputedRef<number>>('paginationTotal')
    const currentItemsPerPage = computed({
      get: () => itemsPerPageOptions.value.find(option => option.value === itemsPerPage?.value) || {} as RowsPerPageOptionType,
      set: (option) => {
        if (itemsPerPage) {
          itemsPerPage.value = option.value
        }
      },
    });
    const showItemsPerPage = computed(() => !hideItemsPerPage.value || slots.itemsPerPage)
    const showPagination = computed(() => paginationTotal && paginationTotal.value > 1 || slots.pagination)

    return {
      page,
      paginationTotal,
      currentItemsPerPage,
      showItemsPerPage,
      showPagination,
    }
  },
})
</script>

<style lang="scss">
@import "variables";

.va-data-table__footer {
  display: var(--va-data-table-footer-display);
  flex-direction: var(--va-data-table-footer-flex-direction);
  justify-content: var(--va-data-table-footer-justify-content);
  align-items: var(--va-data-table-footer-align-items);
  margin-top: var(--va-data-table-footer-margin-top);
}
</style>
