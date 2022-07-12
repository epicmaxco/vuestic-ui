<template>
  <div>
    <p class="code-snippet">
      <div>name: <input class="code-input" v-model="name" /></div>
      resolve: ({<span class="params">{{ args }}</span> }) => ({
        <div class="ml-4" v-for="key in Object.keys(resolve)" :key="key">
          {{ key }}: <input class="code-input" v-model="(resolve as any)[key]" />
        </div>
      })
    </p>
    <p>
      Vue:
      <div class="code-snippet">
        <span class="tag">va-icon name="<input class="code-input" v-model="iconName" />" /</span>
      </div>
    </p>
    <p>
      Result:
      <div class="code-snippet">{{ renderHTML() }}</div>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { dynamicSegments } from 'vuestic-ui/src/services/icon-config/utils/dynamic-segment'

// Resolved dynamic segments that must be scope of resolve function
type Scope = Record<string, any>

const getValuesInBrackets = (s: string) => {
  const values = s.match(/{([^}]*)}/g) || []
  return values
    .map((v) => v.replace(/\{|\}/g, ''))
}

const name = ref('fa-{code}')
const args = computed(() => getValuesInBrackets(name.value).reduce((acc, v) => `${acc} ${v},`, '').slice(0, -1))
const resolve = reactive({
  // eslint-disable-next-line no-template-curly-in-string
  class: '`fa-solid fa-${code}`',
  content: '',
  attrs: '',
})
const iconName = ref('fa-plane')

/** Imitate JS execution with scope */
const callStringWithScope = (scope: Record<string, any>, code: string) => {
  const vars = Object.keys(scope).reduce((acc, key) => {
    return acc + `let ${key} = ${JSON.stringify(scope[key])};`
  }, '')

  // TODO: Not sure if CSP will not block it :(
  // eslint-disable-next-line no-new-func
  return new Function(`${vars};return (${code})`)()

  // console.log(code)

  // code = code.replace(/`/g, '"')
  // code = code.replace(/'/g, '"')
  // code = Object.entries(scope).reduce((acc, [key, value]) => {
  //   console.log(key, value, `\${${key}}`)
  //   return acc.replaceAll(`\${${key}}`, value)
  // }, code)

  // console.log(code)

  // console.log('js', JSON.parse(code))

  // return JSON.parse(code)
}

const removeQuotes = (s: string) => {
  ['`', "'", '"'].forEach((a) => {
    if (s.startsWith(a) && s.endsWith(a)) {
      s = s.slice(1, -1)
    }
  })
  return s
}

const isQuoted = (s: string) => {
  return ['`', "'"].some((a) => {
    return s.startsWith(a) && s.endsWith(a)
  })
}

const parseAttrs = (s: string, scope: Scope) => {
  if (s.startsWith('{') && s.endsWith('}')) {
    s = s.slice(1, -1)
  }

  if (!s) { return '' }

  return s.split(',').reduce((acc, v) => {
    let [key, value] = v.split(':')
    if (!key || !value) { return acc }
    key = removeQuotes(key.trim())
    value = value.trim()

    if (!isQuoted(value)) {
      value = scope[value]
    }

    acc[key] = value
    return acc
  }, {} as Record<string, string>)
}

const parsedConfig = computed(() => {
  // const config = resolve.value.split(',')
  const segments = dynamicSegments(iconName.value, name.value) as Record<string, string>

  return Object.entries(resolve).reduce((acc, [key, value]) => {
    // acc[key] = callStringWithScope(seg, value)
    const code = Object.entries(segments).reduce((acc, [key, value]) => {
      return acc.replaceAll(`\${${key}}`, value)
    }, value)

    acc[removeQuotes(key)] = removeQuotes(code)

    if (key === 'attrs') {
      acc[key] = parseAttrs(acc[key], segments)
    }

    return acc
  }, {} as Record<string, any>)
})

const renderHTML = () => {
  const {
    tag = 'i',
    class: className = '',
    attrs = {},
    content = '',
  } = parsedConfig.value

  const attributes = [
    className ? `class="${className}"` : undefined,
    ...Object.entries(attrs).map(([key, value]) => `${key}="${value}"`),
  ].filter(Boolean).join(' ')

  return `<${tag} ${attributes} >${content}</${tag}>`
}
</script>

<style lang="scss" scoped>
  .params {
    color: var(--va-primary);
  }

  .tag {
    &::before {
      content: '<'
    }
    &::after {
      content: '>'
    }
  }

  .code-input {
    background-color: rgba(0, 0, 0, 0.2);
    color: currentColor;
    border: none;
    padding: 2px;
    width: min-content;
    min-width: 300px;
  }
</style>
