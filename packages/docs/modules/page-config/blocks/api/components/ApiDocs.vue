
<script setup lang="ts">
import { type PropType } from 'vue'
import { MarkdownView } from '../../shared/markdown'
import { Anchor } from '../../shared/anchor'
import { CodeView } from '../../shared/code';

defineProps({
  data: {
    type: Array as PropType<Record<string, any>[]>,
    default: () => ([]),
  },
  columns: {
    type: Array as PropType<string[]>,
    default: () => ([]),
  },
  title: {
    type: String,
    default: '',
  }
})
</script>

<template>
  <h3
    v-if="title"
    class="ApiDocs__header va-h4"
  >
    {{ title }}
    <Anchor :text="title" />
  </h3>

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
          v-for="(row, index) in data"
          :key="index"
          class="ApiDocs__table__row"
        >
          <td
            v-for="(value, key) in row"
            :key="key"
          >
            <slot
              :name="key"
              v-bind="{ key, value, row }"
            >
              <MarkdownView
                v-if="typeof value === 'string'"
                :content="value.toString()"
              />
              <div v-if="typeof value === 'object'">
                <MarkdownView
                  v-if="value.text"
                  :content="value.text.toString()"
                />
                <CodeView
                  v-if="value.code"
                  :code="value.code"
                  language="typescript"
                />
              </div>
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
    transition: none;

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
