<template>
  <div class="ApiDocs">

    <h2>Props</h2>

    <table class="striped">
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
      <ApiDocsPropsRow
        v-for="(prop, key) in apiTableData.props"
        :key="key"
        :propRow="prop"
      />
      </tbody>
    </table>

    <template v-if="!isEmpty(apiTableData.events)">
      <h2>Events</h2>

      <table class="striped">
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
          <td>{{ eventName }} {{apiEventOption}}</td>
          <td>
            <MarkdownView :value="$t(apiEventOption.description)"/>
          </td>
          <td>
            <MarkdownView :value="apiEventOption.types"/>
          </td>
          <td>
            <pre>{{apiEventOption.version}}</pre>
          </td>
        </tr>
        </tbody>
      </table>
    </template>

    <template v-if="!isEmpty(apiTableData.slots)">
      <h2>Slots</h2>
      <table class="striped">
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
          <td>{{ slotName }}</td>
          <td>
            <MarkdownView :value="$t(apiSlotOption.description)"/>
          </td>
          <td>
            <pre>{{apiSlotOption.version}}</pre>
          </td>
        </tr>
        </tbody>
      </table>
    </template>

    <template v-if="!isEmpty(apiTableData.methods)">
      <h2>Slots</h2>
      <table class="striped">
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
          <td>{{ methodName }}</td>
          <td>
            <MarkdownView :value="$t(apiMethodOption.description)"/>
          </td>
          <td>
            <MarkdownView :value="apiMethodOption.types"/>
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
import { getApiTableData } from './api-docs-helpers'
import MarkdownView
  from '../../../../docs/utilities/markdown-view/MarkdownView.vue'

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
    return getApiTableData(this.componentOptions, this.apiOptions)
  }

  isEmpty (object: Record<string, any>): boolean {
    return !Object.keys(object).length
  }
}
</script>

<style lang="scss">
.ApiDocs {

}
</style>
