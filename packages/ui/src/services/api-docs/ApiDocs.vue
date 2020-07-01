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

    <template v-if="!isEmpty(apiTableData.slots)">
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
    </template>

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
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ComponentOptions } from 'vue'
import { ManualApiOptions } from './ManualApiOptions'
import ApiDocsPropsRow from './ApiDocsPropsRow.vue'
import { getApiTableData, mergeInDefaults } from './api-docs-helpers'
import MarkdownView
  from '../../../../docs/utilities/markdown-view/MarkdownView.vue'
import { defaultApiOptions } from './default-api-options'

@Component({
  components: { ApiDocsPropsRow, MarkdownView },
})
export default class ApiDocs extends Vue {
  @Prop({
    type: Object,
    required: true,
  }) componentOptions!: ComponentOptions<Vue>

  @Prop({ type: Object, default: () => ({}) }) apiOptions!: ManualApiOptions

  get apiTableData () {
    // TODO Modifies parent object, which is not ideal.
    mergeInDefaults(this.apiOptions, defaultApiOptions)
    return getApiTableData(this.componentOptions, this.apiOptions)
  }

  isEmpty (object: Record<string, any>): boolean {
    return !Object.keys(object).length
  }
}
</script>

<style lang="scss">
.ApiDocs {
  &__table {
    width: 100%;
    font-family: "Source Code Pro";
    font-size: 16px;

    th {
      font-family: Source Sans Pro !important;
      font-weight: 700 !important;
      font-weight: bold !important;
      padding: 0.75rem !important;
    }
  }
}
</style>
