<template>
  <div>
    <div class="code">
      <p> { </p>
      <p class="tab"> name: <va-input v-model="fontName" />, </p>
      <p class="tab">
        resolve:
        ({ <span class="params">{{ params }}</span> }) => { ... }
      </p>
      <p> } </p>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'

const getValuesInBrackets = (s) => {
  const values = s.match(/{([^}]*)}/g) || []
  return values
    .map((v) => v.replace(/\{|\}/g, ''))
    .filter((v) => v !== '')
}

export default {
  setup () {
    const fontName = ref('fa4-{code}-{type}')
    const iconName = ref('fa4-phone-o')

    const params = computed(() => {
      const groups = getValuesInBrackets(fontName.value)
      return groups.reduce((acc, v) => `${acc} ${v},`, '').slice(0, -1)
    })

    return {
      params,
      fontName,
      iconName,
    }
  },
}
</script>

<style lang="scss" scoped>
.code {
  background: #f4f8fa;
  color: var(--va-dark);
  padding: 2rem;

  .tab {
    padding-left: 2rem;
  }

  .params {
    color: #73d2de;
  }

  p {
    padding: 0.2rem 0;
    color: var(--va-dark);
    margin: 0;
  }

  .va-input:deep() {
    display: inline-block;

    .va-input__container {
      background: rgba($color: #000000, $alpha: 0.2) !important;
      border-radius: 0.5rem !important;
    }
  }
}
</style>
