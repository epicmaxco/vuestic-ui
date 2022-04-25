<template>
  <div class="DocsTable">
    <table class="DocsTable__table">
      <thead>
        <tr>
          <th v-for="c in columnsComputed" :key="c.title" :style="c.style">{{ $tie(c.title) }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in tableData"
          :key="row.toString()"
          class="DocsTable__table__row"
        >
          <td v-for="(colData, index) in row" :key="colData">
            <template v-if="colData">
              <template v-if="columnsComputed[index].type === 'strong'">
                <strong>{{ colData }}</strong>
              </template>
              <template v-else-if="columnsComputed[index].type === 'markdown'">
                <MarkdownView v-if="colData" :source="$tie(colData)" />
              </template>
              <template v-else-if="columnsComputed[index].type === 'code'">
                <MarkdownView v-if="colData" :source="`\`${colData}\``" />
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
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { TableData, TableColumn } from './DocsTableTypes'
import MarkdownView from '../MarkdownView/MarkdownView.vue'
import { PropType } from '@vue/runtime-dom';

const { tie: $tie } = useI18n()

const props = defineProps({
  columns: { type: Array as PropType<TableColumn[]>, required: true },
  tableData: { type: Array as PropType<TableData>, required: true },
})

const columnsComputed = computed(() => {
  return props.columns.map((col) => typeof col === 'string' ? { title: col } : col)
})
</script>

<style lang="scss">
@import "vuestic-ui/styles/resources";

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
