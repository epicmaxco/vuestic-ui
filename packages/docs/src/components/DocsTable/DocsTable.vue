<template>
  <div class="DocsTable">
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
            <template v-else-if="columnsComputed[index].type === 'translationString'">
              {{  $t(colData) }}
            </template>
            <template v-else>
              {{ $te(colData) ? $t(colData) : colData }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Options, Vue, prop, mixins } from 'vue-class-component'
import { TableData, TableColum } from './DocsTable'
import MarkdownView from '../../utilities/markdown-view/MarkdownView.vue'

class Props {
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
  overflow-x: auto;
  width: 100%;

  &::-webkit-scrollbar {
    width: 4px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: none;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--va-primary);
    border-radius: 2px;
  }

  scrollbar-color: var(--va-primary) transparent;
  scrollbar-width: thin;

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
