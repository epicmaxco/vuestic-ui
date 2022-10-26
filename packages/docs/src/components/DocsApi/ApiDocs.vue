<template>
  <div class="ApiDocs">
    <template v-if="!isEmpty(apiTableData.props)">
      <h5>Props</h5>

      <div class="ApiDocs__table-wrapper">
        <table class="ApiDocs__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th style="min-width: 200px;">Types</th>
              <th>Default</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(apiPropOption, key) in sortObject(apiTableData.props)"
              :key="key"
              class="ApiDocs__table__row"
            >
              <td>
                <div class="d-flex align-center">
                  <strong>{{ apiPropOption.name }}</strong>
                  <va-badge  v-if="apiPropOption.required" class="ml-2" text="required" color="primary" />
                </div>
              </td>
              <td>
                <MarkdownView :value="$t(apiPropOption.description)" />
              </td>
              <td>
                <MarkdownView :value="apiPropOption.types" />
              </td>
              <td>
                <MarkdownView :value="cleanDefaultValue(apiPropOption.default)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <template v-if="!isEmpty(apiTableData.events)">
      <h5>Events</h5>

      <div class="ApiDocs__table-wrapper">
        <table class="ApiDocs__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Types</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(apiEventOption, key) in sortObject(apiTableData.events)"
              :key="key"
              class="ApiDocs__table__row"
            >
              <td>
                <div class="d-flex align-center">
                  <strong>{{ apiEventOption.name }}</strong>
                  <va-badge class="ml-2" color="info" v-if="apiEventOption.isDOMEvent" text="native" />
                </div>
              </td>
              <td>
                <MarkdownView :value="$tie(apiEventOption.description)" />
              </td>
              <td>
                <MarkdownView :value="apiEventOption.types" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <div v-if="!isEmpty(apiTableData.slots)">
      <h5>Slots</h5>

      <div class="ApiDocs__table-wrapper">
        <table class="ApiDocs__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(apiSlotOption, key) in sortObject(apiTableData.slots)"
              :key="key"
              class="ApiDocs__table__row"
            >
              <td>
                <strong>{{ apiSlotOption.name }}</strong>
              </td>
              <td>
                <MarkdownView :value="$tie(apiSlotOption.description)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <template v-if="!isEmpty(apiTableData.methods)">
      <h5>Methods</h5>

      <div class="ApiDocs__table-wrapper">
        <table class="ApiDocs__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Types</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(apiMethodOption, key) in sortObject(apiTableData.methods)"
              :key="key"
              class="ApiDocs__table__row"
            >
              <td>
                <strong>{{ apiMethodOption.name }}</strong>
              </td>
              <td>
                <MarkdownView :value="$tie(apiMethodOption.description)" />
              </td>
              <td>
                <MarkdownView :value="apiMethodOption.types" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, DefineComponent, PropType, computed } from 'vue'
import { merge } from 'lodash'
import { sortObjectByPropNames } from '../../helpers/SortHelper'
import { ManualApiOptions } from './ManualApiOptions'
import { getApiTableData } from './api-docs-helpers'
import { defaultApiOptions } from './default-api-options'
import MarkdownView from '../markdown-view/MarkdownView.vue'
import { VueConstructor } from 'vue-class-component'

export default defineComponent({
  name: 'ApiDocs',
  components: { MarkdownView },
  props: {
    componentOptions: { type: [Object, Function] as PropType<VueConstructor | DefineComponent>, required: true },
    apiOptions: { type: Object as PropType<ManualApiOptions>, default: () => ({}) },
  },
  setup (props) {
    const apiTableData = computed(() => {
      const options = merge(props.apiOptions, defaultApiOptions)
      return getApiTableData(props.componentOptions, options)
    })

    const isEmpty = (object: Record<string, any>): boolean => !Object.keys(object).length

    const cleanDefaultValue = (o: Record<string, any> | string) => {
      const str: string = o.toString()

      const defaultFnStartRegex = /function _default\(\) \{\n\s*return\s*/

      if (defaultFnStartRegex.test(str)) {
        const defaultFnEndRegex = /\s*}$/

        return str
          .replace(defaultFnStartRegex, '')
          .replace(defaultFnEndRegex, '')
      }

      return str
    }

    return {
      apiTableData,
      isEmpty,
      cleanDefaultValue,
      sortObject: sortObjectByPropNames,
    }
  },
})
</script>

<style lang="scss">
  @import "~vuestic-ui/src/styles/resources";

  .ApiDocs {
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
        border-bottom: 1px solid var(--va-background-element);

        & .MarkdownView {
          code,
          p {
            font-size: inherit;
            margin-bottom: 0;
          }
        }
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
