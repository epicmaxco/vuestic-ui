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
              <th>Required</th>
              <th>Version</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(apiPropOption, key) in sortObject(apiTableData.props)"
              :key="key"
              class="ApiDocs__table__row"
            >
              <td>
                <strong>{{ apiPropOption.name }}</strong>
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
              <td>{{ apiPropOption.required ? "+" : "" }}</td>
              <td>{{ apiPropOption.version }}</td>
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
              <th>Version</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(apiEventOption, key) in sortObject(apiTableData.events)"
              :key="key"
              class="ApiDocs__table__row"
            >
              <td>
                <strong>{{ apiEventOption.name }}</strong>
              </td>
              <td>
                <MarkdownView :value="$tie(apiEventOption.description)" />
              </td>
              <td>
                <MarkdownView :value="apiEventOption.types" />
              </td>
              <td>
                {{ apiEventOption.version }}
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
              <th>Version</th>
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
              <td>
                <pre>{{ apiSlotOption.version }}</pre>
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
              <th>Version</th>
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
              <td>
                <pre>{{ apiMethodOption.version }}</pre>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {
  Options,
  Vue,
  prop,
  mixins,
  VueConstructor,
} from 'vue-class-component'
import { DefineComponent } from 'vue'
import { ManualApiOptions } from './ManualApiOptions'
import ApiDocsPropsRow from './ApiDocsPropsRow.vue'
import { getApiTableData } from './api-docs-helpers'
import MarkdownView from '../../utilities/markdown-view/MarkdownView.vue'
import { defaultApiOptions } from './default-api-options'
import DocsTable from '../DocsTable/DocsTable.vue'
import { merge } from 'lodash'
import { sortObjectByPropNames } from '../../helpers/SortHelper'

class Props {
  componentOptions = prop<DefineComponent | VueConstructor>({ required: true });
  apiOptions = prop<ManualApiOptions>({ type: Object, default: () => ({}) });
}

const PropsMixin = Vue.with(Props)

@Options({
  name: 'ApiDocs',
  components: { ApiDocsPropsRow, MarkdownView, DocsTable },
})
export default class ApiDocs extends mixins(PropsMixin) {
  get apiTableData () {
    const options = merge(this.apiOptions, defaultApiOptions)
    return getApiTableData(this.componentOptions, options)
  }

  sortObject = sortObjectByPropNames;

  isEmpty (object: Record<string, any>): boolean {
    return !Object.keys(object).length
  }

  cleanDefaultValue (o: any) {
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
}
</script>

<style lang="scss">
@import "~vuestic-ui/src/styles/resources/resources";

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
