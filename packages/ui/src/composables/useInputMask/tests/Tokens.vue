<script setup lang="ts">
import { PropType, computed } from 'vue'
import type { Token } from '../masks/parser'

const props = defineProps({
  tokens: {
    type: Array as PropType<Token[]>,
    required: true,
  },
  value: {
    type: String,
  },
})

defineOptions({
  name: 'Tokens',
})

const colors: Record<Token['type'], string> = {
  group: '#F7F7F9',
  char: '#ffa69e',
  regex: '#b8f2e6',
  repeated: '#faf3dd',
  'or regex': '#073b4c',
}
</script>

<template>
  <div class="inline-flex items-center">
    <div
      v-for="token in tokens" :key="token.expect"
      class="inline-flex min-w-8 flex-1 box-content"
      :style="{ background: colors[token.type] }"
    >
      <span v-if="token.type === 'char'" class="bg-grey-200 p-2 h-8">{{ token.expect }}</span>
      <span v-if="token.type === 'regex'" class="p-2 h-8">{{ token.expect }}</span>
      <span v-if="token.type === 'group'"></span>

      <template v-if="token.type === 'or regex'">
        <span class="p-1 flex items-center">
          <Tokens :tokens="token.left" />
          <span class="text-white h-8">|</span>
          <Tokens :tokens="token.right" />
        </span>
      </template>

      <template v-if="token.type === 'repeated'">
        <div class="inline-flex" v-for="i in token.max" :class="i > token.min ? 'opacity-50' : ''" :key="i">
          <Tokens :tokens="token.tree" v-if="'tree' in token" />
        </div>
      </template>
      <template v-else>
        <Tokens :tokens="token.tree" v-if="'tree' in token" />
      </template>
    </div>
  </div>
</template>
