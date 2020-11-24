<template>
  <div class="va-data-table">
    <va-inner-loading :loading="loading">
      <vuetable
        ref="vuetable"
        :api-mode="false"
        :fields="fields"
        :data="apiMode ? data : undefined"
        :data-manager="apiMode ? undefined : dataManagerComputed"
        :pagination-path="apiMode ? '' : 'pagination'"
        :no-data-template="noDataLabel"
        :css="styles"
        :row-class="rowClass"
        :sort-order="sortOrder"
        @vuetable:row-clicked="rowClicked"
      >
        <!-- https://stackoverflow.com/questions/50891858/vue-how-to-pass-down-slots-inside-wrapper-component   -->
        <template
          v-for="slot in Object.keys($scopedSlots)"
          :slot="slot"
          slot-scope="scope"
        >
          <slot
            :name="slot"
            v-bind="scope"
          />
        </template>
      </vuetable>

      <div
        v-if="!noPagination && paginationTotal > 1"
        class="va-data-table__pagination"
      >
        <va-pagination
          v-model="currentPageProxy"
          :pages="paginationTotal"
          :visible-pages="visiblePages"
          :boundary-links="paginationTotal > visiblePages"
        />
      </div>
    </va-inner-loading>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Mixins, Watch } from 'vue-property-decorator'
// @ts-ignore
import Vuetable from 'vuetable-2/src/components/Vuetable.vue'
import VaPagination from '../va-pagination/VaPagination.vue'
import VaInnerLoading from '../va-inner-loading/VaInnerLoading.vue'
import { LoadingMixin } from '../../vuestic-mixins/LoadingMixin/LoadingMixin'
import _sortBy from 'lodash/sortBy'

@Component({
  components: {
    VaInnerLoading,
    Vuetable,
    VaPagination,
  },
})
export default class VaDataTable extends Mixins(LoadingMixin) {
  @Prop({ type: Array, required: true }) fields!: Array<any>
  @Prop({ type: Array, required: true }) data!: Array<any>
  @Prop({
    type: Array,
  }) sortOrder!: Array<any> | undefined

  @Prop({ type: Number, default: 6 }) perPage!: number
  @Prop({ type: Number, default: 4 }) visiblePages!: number
  @Prop({ type: Number, default: 1 }) currentPage!: number
  @Prop({ type: Number, default: 0 }) totalPages!: number
  @Prop({ type: Boolean }) apiMode!: boolean
  @Prop({ type: Boolean }) clickable!: boolean
  @Prop({ type: Boolean }) hoverable!: boolean
  @Prop({ type: Boolean }) noPagination!: boolean
  @Prop({
    type: Boolean,
    default: undefined,
  }) noDataLabel!: string | undefined

  @Prop({
    type: Function,
    default: undefined,
  }) rowClass!: Function | undefined

  @Prop({
    type: Function,
    default: null,
  }) dataManager!: Function | null

  get currentPageProxy (): number {
    return this.currentPage
  }

  set currentPageProxy (page: number) {
    if (!this.apiMode) {
      (this.$refs.vuetable as Vue & { changePage: (page: number) => void }).changePage(page)
    }
    this.$emit('pageSelected', page)
  }

  get styles () {
    return {
      tableClass: this.buildTableClass(),
      ascendingIcon: 'fa fa-caret-up',
      descendingIcon: 'fa fa-caret-down',
      renderIcon: (classes: any) => {
        return '<span class="' + classes.join(' ') + '"></span>'
      },
    }
  }

  get paginationTotal () {
    return this.apiMode ? this.totalPages : Math.ceil(this.data.length / this.perPage)
  }

  @Watch('perPage')
  onPerPageChanged (): void {
    this.refresh()
  }

  @Watch('data')
  onDataChanged (): void {
    this.refresh()
  }

  @Watch('fields')
  onFieldsChanged (): void {
    this.refreshFields()
  }

  buildTableClass () {
    let name = 'va-data-table__vuetable va-table va-table--striped'

    if (this.clickable) {
      name += ' va-table--clickable'
    }

    if (this.hoverable) {
      name += ' va-table--hoverable'
    }

    return name
  }

  dataManagerComputed (sortOrder: any, pagination: any) {
    if (this.dataManager) {
      return this.dataManager(sortOrder, pagination)
    }

    let sorted = []

    if (!sortOrder.length) {
      sorted = this.data
    } else {
      const { sortField, direction } = sortOrder[0]
      sorted = direction === 'asc' ? this.sortAsc(this.data, sortField) : this.sortDesc(this.data, sortField)
    }

    if (this.noPagination) {
      return {
        data: sorted,
      }
    }

    pagination = this.buildPagination(sorted.length, this.perPage)
    const { from } = pagination
    const sliceFrom = from - 1
    this.$emit('pageSelected', 1)

    return {
      pagination,
      data: sorted.slice(sliceFrom, sliceFrom + this.perPage),
    }
  }

  sortAsc (items: any[], field: string | []) {
    return _sortBy(items, field)
  }

  sortDesc (items: any[], field: string | []) {
    return _sortBy(items, field).reverse()
  }

  buildPagination (length: number, perPage: number) {
    return (this.$refs.vuetable as Vue & { makePagination: (length: number, perPage: number) => any }).makePagination(length, perPage)
  }

  refresh (): void {
    (this.$refs.vuetable as Vue & { refresh: () => any }).refresh()
  }

  refreshFields (): void {
    this.$nextTick(() => {
      (this.$refs.vuetable as Vue & { normalizeFields: () => void }).normalizeFields()
    })
  }

  rowClicked (row: any) {
    this.$emit('rowClicked', row)
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-data-table {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-x: auto;

  &__vuetable {
    width: 100%;

    th {
      &.sortable {
        color: $brand-primary;
      }

      .sort-icon {
        font-size: 0.625rem;
      }
    }

    .vuetable-empty-result {
      padding: 4.5rem 1rem;
      font-size: 1rem;
      color: $gray;
    }
  }

  &__pagination {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
  }
}
</style>
