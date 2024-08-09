<script setup lang="ts">
  import { computed, PropType, ref, watch } from 'vue'
  import { VaScrollContainer, VaInput, VaCheckbox, VaSelect, VaAlert, VaCounter, VaDivider, VaButtonToggle, VaTabs, VaTab, VaTextarea, VaIcon } from 'vuestic-ui'
  import { useComponent } from '../../composables/useComponent/useComponent'
  import Color from './options/Color.vue'
  import MultiText from './options/MultiText.vue'
  import Checkbox from './options/Checkbox.vue'
  import { getPropConfig } from './components-config'
  import NumberInput from './options/Number.vue'
  import NotAvaliable from './options/NotAvaliable.vue'

  const { options, name } = useComponent()

  const getTypeFromProp = (proptype: PropType<any> | undefined) => {
    if (proptype === undefined) {
      return 'text'
    }

    if (proptype === String) {
      return 'text'
    }

    if (proptype === Number) {
      return 'number'
    }

    if (proptype === Boolean) {
      return 'checkbox'
    }

    if (Array.isArray(proptype)) {
      proptype = proptype.filter(t => t !== null)
      if (proptype.length === 2) {
        if (proptype.includes(String) && proptype.includes(Number)) {
          return 'text'
        }
      }
    }

    return 'unknown'
  }

  const propsFilter = ref('')

  const propsConfigs = computed(() => {
    return Object
      .entries(options.props.value)
      .map(([propName, p]) => {
        const prop = p

        const customConfig = getPropConfig(name.value ?? '', propName)

        const type = customConfig?.type ?? getTypeFromProp(prop.meta.type)

        if (type === 'unknown') {
          console.error(`Unknown type for prop ${propName}`, prop.meta.type)
        }

        return {
          ...customConfig,
          name: propName,
          prop: prop,
          type: type,
          get value() {
            return prop.codeValue
          },
          set value(value) {
            prop.codeValue = value
          }
        }
      })
      .sort((a, b) => a.name.localeCompare(b.name))
      .filter(prop => prop.name.toLowerCase().includes(propsFilter.value.toLowerCase()))
  })
</script>

<template>
  <div class="component-props">
    <VaInput v-model="propsFilter" class="component-settings__search-field" placeholder="Search" #prependInner>
      <VaIcon name="search" />
    </VaInput>

    <VaDivider />

    <template v-for="prop in propsConfigs">
      <Color v-if="prop.type === 'color'" :label="prop.name" v-model="prop.value" :prop="prop.prop" />
      <VaInput v-else-if="prop.type === 'text'" :label="prop.name" v-model="prop.value" />
      <Checkbox v-else-if="prop.type === 'checkbox'" :label="prop.name" v-model="prop.value" :prop="prop.prop" />
      <VaSelect v-else-if="prop.type === 'select'" :label="prop.name" v-model="prop.value" :options="'options' in prop ? prop.options : []" />
      <NumberInput v-else-if="prop.type === 'number'" :label="prop.name" v-model="prop.value" :prop="prop.prop" />
      <MultiText v-else-if="prop.type === 'multi-text'" :label="prop.name" v-model="prop.value" />
      <NotAvaliable v-else-if="prop.type === 'disabled'" :label="prop.name" />
      <div v-else>
        <div class="va-label">{{ prop.name }}</div>
        <div style="height: 36px; line-height: 36px;">
          This prop can be edited only in Source Code tab for now.
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
.component-props {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .va-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.625rem;
    letter-spacing: 0.6px;
    line-height: 1.2;
    font-weight: 700;
    text-transform: uppercase;
    min-height: 1rem;
    display: block;
    color: var(--va-primary);
  }
}
</style>
