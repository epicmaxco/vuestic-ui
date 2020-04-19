<template>
  <div class="ApiDocs">
    <table class="va-table">
      <tr>
        <th>Name</th>
        <th>Required</th>
        <th>Types</th>
        <th>Default</th>
      </tr>
      <tr
        v-for="(prop, key) in componentOptionsReadable.props"
        :key="key"
      >
        <td>{{ key }}</td>
        <td>{{ prop.required ? 'required' : '' }}</td>
        <td>{{ prop.types.join(' | ') }}</td>
        <td>{{ prop.default }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { convertComponentToApiDocs } from './api-docs-helpers'

export default {
  name: 'ApiDocs',
  props: {
    componentOptions: {
      type: Object,
      required: true,
    },
  },
  computed: {
    componentOptionsReadable () {
      return convertComponentToApiDocs(this.componentOptions)
    },
  },
}
</script>

<style lang="scss">
.ApiDocs {

}
</style>
