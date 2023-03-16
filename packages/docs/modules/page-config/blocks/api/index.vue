<script setup lang="ts">
import { DefineComponent, PropType } from 'vue';
import { parseComponent } from './component-parser'
import merge from 'lodash/merge'
import camelCase from 'lodash/camelCase'
import ApiTable from './components/api-table.vue';
import { CssVariables, ManualApiOptions, VisualOptions } from './types';

const props = defineProps({
  componentName: {
    type: String,
    required: true,
  },
  component: {
    type: Object as PropType<DefineComponent>,
    required: true,
  },
  manual: {
    type: Object as PropType<ManualApiOptions>,
    default: () => {},
  },
  cssVariables: {
    type: Array as PropType<CssVariables>,
    required: true,
  },
  visualOptions: {
    type: Object as PropType<VisualOptions>,
    default: () => ({}),
  }
})

const options = parseComponent(props.component)

const withManual = merge(options, props.manual as ManualApiOptions)

const { t, te, fallbackLocale } = useI18n()

const translateIfExistsWithFallback = (key: string) => te(key) || te(key, fallbackLocale.value as string)

function getTranslation (type: string, name: string): string {
  const nameCamel = camelCase(name)
  // if (custom && translateIfExistsWithFallback(custom)) { return custom }

  const componentTranslation = `api.${props.componentName}.${type}.${nameCamel}`

  if (translateIfExistsWithFallback(componentTranslation)) {
    return componentTranslation
  }

  const allTranslation = `api.all.${type}.${nameCamel}`
  if (translateIfExistsWithFallback(allTranslation)) {
    return allTranslation
  }

  return ''
}

const cleanDefaultValue = (o: Record<string, any> | string) => {
  if (!o) { return o }
  const str: string = o.toString()

  const defaultFnStartRegex = /function _default\(\) \{\n\s*return\s*/

  if (defaultFnStartRegex.test(str)) {
    const defaultFnEndRegex = /\s*}$/

    return str
      .replace(defaultFnStartRegex, '')
      .replace(defaultFnEndRegex, '')
  }

  return str
}

const propsOptions = Object
  .entries(withManual.props || {})
  .filter(([key, prop]) => !prop.hidden)
  .map(([key, prop]) => ({
    name: { name: key, ...prop },
    description: t(getTranslation('props', key)),
    types: '`' + prop.types + '`',
    default: cleanDefaultValue(prop.default),
  }))

const eventsOptions = Object
  .entries(withManual.events || {})
  .filter(([key, prop]) => !prop.hidden)
  .map(([key, prop]) => ({
    name: key,
    description: t(getTranslation('events', key)),
  }))

const slotsOptions = Object
  .entries(withManual.slots || {})
  .map(([key, prop]) => ({
    name: key,
    description: t(getTranslation('slots', key)),
  }))

const methodsOptions = Object
  .entries(withManual.methods || {})
  .map(([key, prop]) => ({
    name: key,
    description: t(getTranslation('methods', key)),
  }))

const cssVariablesOptions = props.cssVariables.map(([name, value, comment]) => ({
  name, value, /* comment */ // TODO: Enable comment when everywhere is used correct comments
  // TODO: Or add tanslations after i18n splitted
}))
</script>

<template>
  <va-content>
    <ApiTable
      v-if="propsOptions.length > 0 && !visualOptions.hideProps"
      :title="visualOptions.hidePropsTitle ? '' : 'Props'"
      :columns="['Name', 'Description', 'Types', 'Default']"
      :data="propsOptions"
    >
      <template #name="{ data }">
        <strong>{{ data.name }}</strong>
        <va-badge
          v-if="data.required"
          class="ml-2"
          text="required"
          color="primary"
        />
      </template>
    </ApiTable>

    <ApiTable
      v-if="eventsOptions.length > 0 && !visualOptions.hideEvents"
      :title="visualOptions.hideEventsTitle ? '' : 'Events'"
      :columns="['Name', 'Description']"
      :data="eventsOptions"
    />

    <ApiTable
      v-if="slotsOptions.length > 0 && !visualOptions.hideSlots"
      :title="visualOptions.hideEventsTitle ? '' : 'Slots'"
      :columns="['Name', 'Description']"
      :data="slotsOptions"
    />

    <ApiTable
      v-if="methodsOptions.length > 0 && !visualOptions.hideMethods"
      :title="visualOptions.hideEventsTitle ? '' : 'Methods'"
      :columns="['Name', 'Description']"
      :data="methodsOptions"
    />

    <ApiTable
      v-if="cssVariablesOptions.length > 0 && !visualOptions.hideCssVariables"
      :title="visualOptions.hideEventsTitle ? '' : 'Css Variables'"
      :columns="['Name', 'Default Value']"
      :data="cssVariablesOptions"
    >
      <template #name="{ data }">
        <strong class="va-text-code">{{ data }}</strong>
      </template>
      <template #value="{ data }">
        <span class="va-text-code va-text-secondary">{{ data }}</span>
      </template>
    </ApiTable>
  </va-content>
</template>
