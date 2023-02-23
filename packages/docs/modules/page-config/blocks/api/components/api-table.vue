
<script setup lang="ts">
import { type PropType } from 'vue'
import { MarkdownView } from '../../shared/markdown'
import { Anchor } from '../../shared/anchor'

defineProps({
  data: {
    type: Array as PropType<Record<string, any>[]>
  },
  columns: {
    type: Array as PropType<string[]>
  },
  title: {
    type: String,
  }
})
</script>

<template>
  <h4 class="ApiDocs__header">
    {{ title }}
    <Anchor :text="title" />
  </h4>

  <div class="ApiDocs__table-wrapper">
    <table class="ApiDocs__table">
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="col"
          >
            {{ col }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, key) in data"
          :key="key"
          class="ApiDocs__table__row"
        >
          <td
            v-for="(data, key) in row"
            :key="data"
          >
            <slot
              :name="key"
              v-bind="{ key, data }"
            >
              <MarkdownView
                v-if="data"
                :content="data.toString()"
              />
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
.ApiDocs {
  &__header {
    margin-top: 2rem !important;
  }

  &__table-wrapper {
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
  }

  &__table {
    width: 100%;
    font-family: "Source Code Pro";
    font-size: 16px;

    &__row {
      border-bottom: 1px solid var(--va-background-element);

      & .MarkdownView {
        code,
        p {
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
