<template>
  <div class="ApiDocs">

    <h5>Props</h5>

    <table class="ApiDocs__table">
      <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Types</th>
        <th>Default</th>
        <th>Required</th>
        <th>Version</th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="(propRow, key) in apiTableData.props"
        :key="key"
        class="ApiDocs__table__row"
      >
        <td><strong>{{ propRow.name }}</strong></td>
        <td>
          <MarkdownView :value="$t(propRow.description)" />
        </td>
        <td>
          <MarkdownView :value="propRow.types" />
        </td>
        <td>
          <MarkdownView :value="propRow.default" />
        </td>
        <td>{{ propRow.required ? '+' : '' }}</td>
        <td>{{ propRow.version }}</td>
      </tr>
      </tbody>
    </table>

    <template v-if="!isEmpty(apiTableData.events)">
      <h5>Events</h5>

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
          v-for="(apiEventOption, eventName) in apiTableData.events"
          :key="eventName"
          class="ApiDocs__table__row"
        >
          <td><strong>{{ eventName }}</strong></td>
          <td>
            <MarkdownView :value="$t(apiEventOption.description)" />
          </td>
          <td>
            <MarkdownView :value="apiEventOption.types" />
          </td>
          <td>
            {{apiEventOption.version}}
          </td>
        </tr>
        </tbody>
      </table>
    </template>

    <div v-if="!isEmpty(apiTableData.slots)">
      <h5>Slots</h5>
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
            v-for="(apiSlotOption, slotName) in apiTableData.slots"
            :key="slotName"
            class="ApiDocs__table__row"
          >
            <td><strong>{{ slotName }}</strong></td>
            <td>
              <MarkdownView :value="$t(apiSlotOption.description)" />
            </td>
            <td>
              <pre>{{apiSlotOption.version}}</pre>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <template v-if="!isEmpty(apiTableData.methods)">
      <h5>Methods</h5>
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
          v-for="(apiMethodOption, methodName) in apiTableData.methods"
          :key="methodName"
          class="ApiDocs__table__row"
        >
          <td><strong>{{ methodName }}</strong></td>
          <td>
            <MarkdownView :value="$t(apiMethodOption.description)" />
          </td>
          <td>
            <MarkdownView :value="apiMethodOption.types" />
          </td>
          <td>
            <pre>{{apiMethodOption.version}}</pre>
          </td>
        </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script lang="ts">
import { Options, Vue, prop, mixins, VueConstructor } from 'vue-class-component'
import { DefineComponent } from 'vue'
import { ManualApiOptions } from './ManualApiOptions'
import ApiDocsPropsRow from './ApiDocsPropsRow.vue'
import { getApiTableData, mergeInDefaults } from './api-docs-helpers'
import MarkdownView from '@/utilities/markdown-view/MarkdownView.vue'
import { defaultApiOptions } from './default-api-options'

class Props {
  componentOptions = prop<DefineComponent | VueConstructor>({ type: Object, required: true })
  apiOptions = prop<ManualApiOptions>({ type: Object, default: () => ({}) })
}

const PropsMixin = Vue.with(Props)

@Options({
  components: { ApiDocsPropsRow, MarkdownView },
})
export default class ApiDocs extends mixins(PropsMixin) {
  get apiTableData () {
    const options = mergeInDefaults(this.apiOptions, defaultApiOptions)
    return getApiTableData(this.componentOptions, options)
  }

  isEmpty (object: Record<string, any>): boolean {
    return !Object.keys(object).length
  }
}
</script>

<style lang="scss">
@import "~vuestic-ui-dev/src/components/vuestic-sass/resources/resources";

.ApiDocs {
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
