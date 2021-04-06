<template>
  <div class="DocsTable">
    <h5 v-if="title">{{ title }}</h5>
    <table class="DocsTable__table">
      <thead>
      <tr>
        <th v-for="c in columnsComputed" :key="c.title">{{ c.title }}</th>
      </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in tableData"
          :key="row.toString()"
          class="DocsTable__table__row"
        >
          <td v-for="(colData, index) in row" :key="colData">
            <template v-if="columnsComputed[index].type === 'strong'">
              <strong>{{ colData }}</strong>
            </template>
            <template v-else-if="columnsComputed[index].type === 'markdown'">
              <MarkdownView :value="colData" />
            </template>
            <template v-else-if="columnsComputed[index].type === 'code'">
              <MarkdownView :value="`\`${colData}\``" />
            </template>
            <template v-else-if="columnsComputed[index].type === 'pre'">
              <pre>{{ colData }}</pre>
            </template>
            <template v-else>
              {{ colData }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Options, Vue, prop, mixins } from 'vue-class-component'
import MarkdownView from '@/utilities/markdown-view/MarkdownView.vue'
import { TableData, TableColum } from './DocsTable'

class Props {
  title = prop<string>({ type: String, required: true })
  columns = prop<TableColum[]>({ type: Array, required: true })
  tableData = prop<TableData>({ type: Array, required: true })
}

const PropsMixin = Vue.with(Props)

@Options({
  components: { MarkdownView },
})
export default class DocsTable extends mixins(PropsMixin) {
  get columnsComputed () {
    return this.columns.map((col) => typeof col === 'string' ? { title: col } : col)
  }
}
</script>

<style lang="scss">
@import "~vuestic-ui/src/components/vuestic-sass/resources/resources";

.DocsTable {
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
