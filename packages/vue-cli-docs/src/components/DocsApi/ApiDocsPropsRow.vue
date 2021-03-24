<template>
  <tr class="ApiDocsPropsRow">
    <td>{{ propRow.name }}</td>
    <td><MarkdownView :value="$t(propRow.description)" /></td>
    <td><MarkdownView :value="propRow.types" /></td>
    <td><pre>{{propRow.default}}</pre></td>
    <td>{{ propRow.required }}</td>
    <td><pre>{{propRow.version}}</pre></td>
  </tr>
</template>

<script lang="ts">
import { Options, Vue, prop, mixins } from 'vue-class-component'
import MarkdownView from '@/utilities/markdown-view/MarkdownView.vue'
import { ApiPropRowOptions } from './ApiTableData'

class Props {
  propRow = prop<ApiPropRowOptions>({})
}

const PropsMixin = Vue.with(Props)

@Options({
  components: { MarkdownView },
})
export default class ApiDocsPropsRow extends mixins(PropsMixin) {
}
</script>

<style lang="scss">
.ApiDocsPropsRow {

}
</style>
