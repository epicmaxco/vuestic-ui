<template>
  <table class="ApiDocs striped">
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
        v-for="(prop, key) in componentOptionsReadable.props"
        :key="key"
        :prop-row="getPropRow(key)"
      />
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ComponentOptions } from 'vue'
import { convertComponentToApiDocs } from './api-docs-helpers'
import { ApiOptions, ApiRowOptions } from './ApiOptions'
import ApiDocsRow from './ApiDocsRow.vue'

@Component({
  components: { ApiDocsRow },
})
export default class ApiDocs extends Vue {
  @Prop({
    type: Object,
    required: true,
  }) componentOptions: ComponentOptions<Vue>

  @Prop({ type: Object, default: () => ({}) }) apiOptions: ApiOptions

  get componentOptionsReadable () {
    return convertComponentToApiDocs(this.componentOptions)
  }

  getPropRow (propName: string): ApiRowOptions {
    const componentOptionsProp = this.componentOptionsReadable.props[propName] || {}
    // This prop is the same for multiple component, so we take description
    // from  `all` instead of for exact component.
    const isLocalProp = this.apiOptions?.props[propName]?.local
    return {
      componentName: this.componentOptions.name,
      name: propName,
      version: this.apiOptions?.props[propName]?.version || this.apiOptions.version,
      required: componentOptionsProp.required ? 'required' : '',
      types: componentOptionsProp.types.map(t => `\`${t}\``).join(' | '),
      default: componentOptionsProp.default,
      description: `api.${isLocalProp ? this.componentOptions.name : 'all'}.props.${propName}`,
    }
  }
}
</script>

<style lang="scss">
.ApiDocs {

}
</style>
