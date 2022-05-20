<template>
  <code class="code language-javascript">
    {
    <span class="tab"> name: <va-input v-model="iconName" />,</span>
    <span class="tab">
      resolve:
      (<span class="params">{ {{ params }} }</span>) => ({ class: <span class="params">`{{ resolved }}`</span> })
    </span>
    }
  </code>
  <code class="code language-javascript">
    {
    <span class="tab"> name: <va-input v-model="regexIconName" />,</span>
    <span class="tab">
      resolveFromRegex:
      (<span class="params"> {{ regexParams }} </span>) => ({ class: <span class="params">`{{ resolved }}`</span> })
    </span>
    }
  </code>
</template>

<script>
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'

const getValuesInBrackets = (s) => {
  const values = s.match(/{([^}]*)}/g) || []
  return values
    .map((v) => v.replace(/\{|\}/g, ''))
}

export default {
  setup () {
    const iconName = ref('fa4-{code}-{type}')

    const groups = computed(() => getValuesInBrackets(iconName.value))

    const params = computed(() => {
      return groups.value.reduce((acc, v) => `${acc} ${v},`, '').slice(0, -1)
    })

    const regexIconName = ref('/(fas|far|fal|fad|fab)-(.*)/')
    const regexParams = computed(() => {
      const map = ['code', 'type']

      return regexIconName.value
        .split('(')
        .map((g) => {
          const group = '(' + g

          return (group.match(/\(.*\)/) || [])[0]
        })
        .filter((g) => g)
        .map((g, i) => map[i] || `group${i - 1}`)
        .join(', ')
    })

    const resolved = computed(() => {
      const classes = groups.value.map((item) => 'fa-${' + `${item}` + '}')
      return `fa ${classes.join(' ')}`
    })

    return {
      params,
      iconName,
      resolved,
      regexIconName,
      regexParams,
    }
  },
}
</script>

<style lang="scss" scoped>
.code {
  background: #f4f8fa;
  color: var(--va-dark);
  padding: 0.5rem;
  width: 100%;

  .tab {
    padding-left: 1rem;
    display: block;
  }

  .params {
    color: var(--va-primary);
  }

  p {
    margin: 0;
  }

  .va-input {
    display: inline-block;

    --va-input-color: rgba(0, 0, 0, 0.2);

    border-radius: 0.5rem !important;
  }
}
</style>
