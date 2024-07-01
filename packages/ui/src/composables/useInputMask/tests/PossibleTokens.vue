<script setup lang="ts">
import { PropType, computed, ref, triggerRef, watch } from 'vue'
import { type Token } from '../masks/parser'
import { normalizeTokens, compareWithMask, RegexToken } from '../masks/regex'

const props = defineProps({
  tokens: {
    type: Array as PropType<Token[]>,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
})

defineOptions({
  name: 'PossibleTokens',
})

const compareWithMaskEachSymbol = (mask: RegexToken[]) => {
  let prevInvalid = false
  let valueOffset = 0

  return mask.map((token, i) => {
    const text = props.value[valueOffset]

    if (prevInvalid) {
      return {
        text: token.expect,
        valid: false,
      }
    }

    if (props.value[valueOffset] === undefined) {
      prevInvalid = true
      return {
        text: token.expect,
        valid: false,
      }
    }
    if (token.type === 'char') {
      if (token.expect !== props.value[valueOffset]) {
        if (token.static) {
          return {
            text: token.expect,
            valid: true,
          }
        }

        prevInvalid = true
        return {
          text: token.expect,
          valid: false,
        }
      }

      valueOffset++
      return {
        text,
        valid: true,
      }
    }

    if (token.type === 'regex') {
      if (!new RegExp(token.expect).test(text)) {
        prevInvalid = true
        return {
          text: token.expect,
          valid: false,
        }
      }

      valueOffset++
      return {
        text,
        valid: true,
      }
    }

    return {
      text,
      valid: true,
    }
  })
}

const buildWithResult = (tokens: Token[]) => {
  return normalizeTokens(tokens)
    .filter((mask) => compareWithMask(mask, props.value))
    .map((mask) => {
      return {
        mask,
        maskText: mask.map((m) => m.expect).join(''),
        result: compareWithMask(mask, props.value),
        chars: compareWithMaskEachSymbol(mask),
      }
    })
    .reduce((acc, token, index, arr) => {
      if (index === 0) {
        return [token]
      }

      if (token.maskText === arr[index - 1].maskText) {
        return acc
      }

      return [...acc, token]
    }, [] as { mask: Token[], maskText: string, result: boolean, chars: { text: string, valid: boolean }[] }[])
}
</script>

<template>
  <div class="flex flex-col">
   <div v-for="{ maskText, chars } in buildWithResult(tokens)" :key="maskText" class="pa-2">
     <span v-for="char in chars" :key="char.text" :style="{ background: char.valid ? 'green' : ''}">
      {{ char.text }}
     </span>
    </div>
  </div>
</template>
