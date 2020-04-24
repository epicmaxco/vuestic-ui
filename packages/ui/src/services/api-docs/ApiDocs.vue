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
      <ApiDocsRow
        v-for="(prop, key) in apiTableData.props"
        :key="key"
        :propRow="prop"
      />
      </tbody>
    </table>

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
      <tr
        v-for="(apiEventOption, eventName) in events"
        :key="eventName"
      >
        <td>{{ eventName }}</td>
        <td><MdView :value="$t(apiEventOption.description)"/></td>
        <td><MdView :value="propRow.types"/></td>
        <td><pre>{{propRow.default}}</pre></td>
        <td>{{ propRow.required }}</td>
        <td><pre>{{propRow.version}}</pre></td>
      </tr>
      <ApiDocsRow
      />
      </tbody>
    </table>

    <h2>Events</h2>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ComponentOptions } from 'vue'
import { ManualApiOptions, ManualEventApiOptions } from './ManualApiOptions'
import ApiDocsRow from './ApiDocsRow.vue'
import { ApiPropRowOptions } from './ApiTableData'
import { getApiTableData } from './api-docs-helpers'

@Component({
  components: { ApiDocsRow },
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
}
</script>

<style lang="scss">
.ApiDocs {

}
</style>
