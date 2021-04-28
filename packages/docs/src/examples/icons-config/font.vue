<template>
  <div>
    <div class="code">
      <p> { </p>
      <p class="tab"> name: <va-input v-model="fontName" />, </p>
      <p class="tab">
        iconClass:
        ({ <span class="params">{{ params }}</span> }) =>
        `<va-input v-model="classCode" style="display: inline-block;" />`,
      </p>
      <p> } </p>
    </div>
    <!-- TODO show result icon class -->
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
    // eslint-disable-next-line no-template-curly-in-string
    const classCode = ref('fa4 fa-${code} fa-${type}')
    const iconName = ref('fa4-phone-o')

    const params = computed(() => {
      const groups = getValuesInBrackets(fontName.value)
      return groups.reduce((acc, v) => `${acc} ${v},`, '').slice(0, -1)
    })

    return {
      params,
      fontName,
      classCode,
      iconName,
    }
  },
}
</script>

<style lang="scss" scoped>
.code {
  background: #f4f8fa;
  padding: 2rem;
  .tab {
    padding-left: 2rem;
  }
  .params {
    color: #73D2DE
  }
  p {
    padding: 0.2rem 0;
  }
  .va-input:deep() {
    display: inline-block;
    .va-input__container {
      background: rgba($color: #000000, $alpha: .2) !important;
      border-radius: 0.5rem !important;
    }
  }
}
</style>
