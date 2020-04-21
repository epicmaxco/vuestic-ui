<template>
  <tr class="ApiDocsRow">
    <td>{{ propRow.name }}</td>
    <td><MdView :value="$t(propRow.description)"/></td>
    <td><MdView :value="propRow.types"/></td>
    <td><pre>{{propRow.default}}</pre></td>
    <td>{{ propRow.required }}</td>
    <td><pre>{{propRow.version}}</pre></td>
  </tr>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import MdView from './MarkdownView/MarkdownView.vue'
import { ApiRowOptions } from './ApiOptions'

@Component({
  components: { MdView },
})
export default class ApiDocsRow extends Vue {
  @Prop() propRow: ApiRowOptions
}
</script>

<style lang="scss">
.ApiDocsRow {

}
</style>
