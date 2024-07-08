<script setup lang="ts">
  import { computed, withCtx, createTextVNode } from 'vue'
  import { VaInput, VaCheckbox, VaScrollContainer, VaSelect, VaAlert } from 'vuestic-ui'
  import { useVueElement } from '../composables/useVueElement'

  const {
    element,
    parsed,
    props: componentProps,
    slots: componentSlots,
    settings,
    meta,
  } = useVueElement()

  const attrs = computed(() => {
    if (!element.value) { return null }
    if (!parsed.value) { return null }

    const parsedEl = parsed.value?.children[0]

    if (parsedEl.type === 'content') { return null }

    const attrs = {
      class: parsedEl.attributes.class ?? ''
    }

    return new Proxy(attrs, {
      get: (target, key: keyof typeof attrs) => {
        if (key in settings.newProps) {
          return settings.newProps[key]
        }

        if (key === 'class') {
          if (typeof target['class'] !== 'string') {
            return ''
          }

          return target['class'].replace(' va-devtools-target-node', '')
        }

        return target[key]
      },
      set: (target, key: keyof typeof attrs, value) => {
        target[key] = value

        settings.newProps[key] = value

        return true
      },
      ownKeys(target) {
        return Object.keys(target).sort((a, b) => a.localeCompare(b))
      },
    })
  })

  const props = computed(() => {
    if (componentProps.value === null) {
      return null
    }

    const propsCopy = { ...componentProps.value }

    return new Proxy(propsCopy, {
      get: (target, key: string) => {
        if (key in settings.newProps) {
          return settings.newProps[key]
        }

        return target[key as string]
      },
      set: (target, key: string, value) => {
        target[key] = value

        settings.newProps[key] = value

        return true
      },
      ownKeys(target) {
        return Object.keys(target).sort((a, b) => a.localeCompare(b))
      },
    })
  })

  const propNames = computed(() => {
    if (!props.value) {
      return []
    }

    return Object
      .keys(props.value)
      .sort((a, b) => a.localeCompare(b))
  })

  const getPropDefault = (key: string) => {
    const propDeclaration = meta.value.component?.props[key]

    if (!propDeclaration) {
      return ''
    }

    if (!('default' in propDeclaration)) {
      return ''
    }

    return String(propDeclaration.default)
  }
</script>

<template>
  <VaScrollContainer vertical style="height: auto">
    <div class="c-component-settings">
      <VaAlert color="warning">
        Component might be in v-for,
        <br />meaning all changes will be
        <br />applied to all instances
        <br /> of the component.
      </VaAlert>
      <template v-if="componentSlots">
        <h6>Content</h6>

        <template v-for="slot in componentSlots">
          <VaInput :label="slot.name" stateful :model-value="slot.content" @update:model-value="slot.update" />
        </template>
      </template>

      <template v-if="attrs">
        <h6>Attributes</h6>

        <template v-for="value, key in attrs">
          <VaInput v-if="typeof attrs[key] === 'string'" v-model="attrs[key] as string" :label="key" />
        </template>
      </template>

      <template v-if="propNames.length > 0">
        <h6>Props</h6>

        <template v-if="props">
          <template v-for="key in propNames">
            <VaSelect v-if="key === 'color'" v-model="props[key]" :placeholder="getPropDefault(key)" :label="key" :options="['primary', 'secondary', 'success', 'warning', 'danger']" />

            <VaInput v-else-if="typeof props[key] === 'string'" v-model="props[key]" :placeholder="getPropDefault(key)" :label="key" />

            <div v-else-if="typeof props[key] === 'boolean'" class="c-component-settings__checkbox">
              <label class="va-title" :style="{ color: 'var(--va-primary)' }">{{ key }}</label>
              <VaCheckbox v-model="props[key]" :label="props[key] ? 'true' : 'false'" />
            </div>
          </template>
        </template>
      </template>
    </div>
  </VaScrollContainer>
</template>

<style>
  .c-component-settings * {
    box-sizing: border-box;
  }

  .c-component-settings h6 {
    margin: 0;
  }

  .c-component-settings {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
    padding-right: 10px;
  }

  .c-component-settings__checkbox {
    display: flex;
    flex-direction: column;
  }

  fieldset {
    padding: 0;
  }
</style>
