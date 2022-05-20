<template>
  <div class="DocsComponentApi">
    <template v-if="tableData.props.length > 0">
      <h5>Props</h5>
      <DocsTable :columns="columns.props" :tableData="tableData.props" />     
    </template>
    <template v-if="tableData.events.length > 0">
      <h5>Events</h5>
      <DocsTable :columns="columns.events" :tableData="tableData.events" />     
    </template>
    <template v-if="tableData.slots.length > 0">
      <h5>Slots</h5>
      <DocsTable :columns="columns.slots" :tableData="tableData.slots" />     
    </template>
    <template v-if="tableData.methods.length > 0">
      <h5>Methods</h5>
      <DocsTable :columns="columns.methods" :tableData="tableData.methods" />     
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, DefineComponent, PropType, computed, Ref } from 'vue'
import DocsTable from '../DocsTable/DocsTable.vue'
import { ManualApiOptions } from '~/types/page-config'
import { useComponentApiTable } from './useComponentApiTable'
import { useComponentApi } from './useComponentApi'
import merge from 'lodash/merge.js'

const defaultApiOptions: ManualApiOptions = {
  props: {
    sizesConfig: {
      hidden: true,
    },
    fontSizesConfig: {
      hidden: true,
    },
  },
  methods: {}, slots: {}, events: {}
}

export default defineComponent({
  name: 'DocsComponentApi',
  components: { DocsTable },
  props: {
    component: { type: [Object, Function] as PropType<DefineComponent>, required: true },
    apiOptions: { type: Object as PropType<ManualApiOptions>, default: () => ({} as ManualApiOptions) },
  },
  setup (props) {
    const componentApi = useComponentApi(props.component)

    const manualApi = merge({}, defaultApiOptions, props.apiOptions)
    
    const { columns, tableData } = useComponentApiTable(componentApi, manualApi)

    return {
      columns, tableData
    }
  },
})
</script>

<style lang="scss">
@import "vuestic-ui/styles/resources";

.DocsComponentApi {
  &__table-wrapper {
    overflow-x: auto;
    width: 100%;

    &::-webkit-scrollbar {
      width: 4px;
      height: 8px;
    }

    &::-webkit-scrollbar-track {
      box-shadow: none;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--va-primary);
      border-radius: 2px;
    }

    scrollbar-color: var(--va-primary) transparent;
    scrollbar-width: thin;
  }

  &__table {
    width: 100%;
    font-family: "Source Code Pro";
    font-size: 16px;

    &__row {
      border-bottom: 1px solid $prism-background;
    }

    th {
      font-family: Source Sans Pro !important;
      font-weight: 700 !important;
      font-weight: bold !important;
      padding: 0.75rem !important;
    }
  }
}
</style>
