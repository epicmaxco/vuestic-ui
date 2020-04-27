<template>
  <tr class="ApiDocsPropsRow">
    <td>{{ propRow.name }}</td>
    <td><MarkdownView :value="$t(propRow.description)"/></td>
    <td><MarkdownView :value="propRow.types"/></td>
    <td><pre>{{propRow.default}}</pre></td>
    <td>{{ propRow.required }}</td>
    <td><pre>{{propRow.version}}</pre></td>
  </tr>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import MarkdownView from '../../../../docs/utilities/markdown-view/MarkdownView.vue'
import { ApiPropRowOptions } from './ApiTableData'

@Component({
  components: { MarkdownView },
})
export default class ApiDocsPropsRow extends Vue {
  @Prop() propRow!: ApiPropRowOptions
}
</script>

<style lang="scss">
.ApiDocsPropsRow {

}
</style>
