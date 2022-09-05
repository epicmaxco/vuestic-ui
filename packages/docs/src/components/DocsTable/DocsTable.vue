<template>
  <div class="DocsTable">
    <table class="DocsTable__table">
      <thead>
      <tr>
        <th v-for="c in columnsComputed" :key="c.title">{{ $tie(c.title) }}</th>
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
            <MarkdownView :value="$tie(colData)" />
          </template>
          <template v-else-if="columnsComputed[index].type === 'code'">
            <MarkdownView :value="`\`${colData}\``" />
          </template>
          <template v-else-if="columnsComputed[index].type === 'pre'">
            <pre>{{ colData }}</pre>
          </template>
          <template v-else-if="columnsComputed[index].type === 'translationString'">
            {{ $tie(colData) }}
          </template>
          <template v-else>
            {{ $tie(colData) }}
          </template>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Options, Vue, prop, mixins } from 'vue-class-component'
import { TableData, TableColumn } from './DocsTableTypes'
import MarkdownView from '../markdown-view/MarkdownView.vue'

class Props {
  columns = prop<TableColumn[]>({ type: Array, required: true })
  tableData = prop<TableData>({ type: Array, required: true })
}

const PropsMixin = Vue.with(Props)

@Options({
  name: 'DocsTable',
  components: { MarkdownView },
  })
export default class DocsTable extends mixins(PropsMixin) {
  get columnsComputed () {
    return this.columns.map((col) => typeof col === 'string' ? { title: col } : col)
  }
}
</script>

<style lang="scss">
  @import "~vuestic-ui/src/styles/resources";

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
        border-bottom: 1px solid var(--va-background-secondary);

        & .MarkdownView {
          code,
          p {
            font-size: inherit;
            margin-bottom: 0;
          }
        }
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
