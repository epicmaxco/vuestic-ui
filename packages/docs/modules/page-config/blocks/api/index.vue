<script setup lang="ts">
import { DefineComponent, PropType } from 'vue';
import merge from 'lodash/merge'
import camelCase from 'lodash/camelCase'
import ApiTable from './components/ApiDocs.vue';
import { MarkdownView } from '../shared/markdown'
import {
  CssVariables,
  ManualApiOptions,
  VisualOptions,
  APIDescriptionOptions,
  APIDescriptionType,
  ComponentMeta,
} from './types';
import commonDescription from "./common-description";
import { Anchor } from "../shared/anchor";

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
  meta: {
    type: Object as PropType<ComponentMeta>,
    required: true
  },
  visualOptions: {
    type: Object as PropType<VisualOptions>,
    default: () => ({}),
  },
  descriptionOptions: {
    type: Object as PropType<APIDescriptionOptions>,
    required: true,
  },
  changeLog: {
    type: Array as PropType<{
      version: string,
      changes: string[],
    }[]>,
    default: () => [],
  }
})

const withManual = computed(() => {
  return merge(props.meta, props.manual as ManualApiOptions)
})

function getDescription (type: APIDescriptionType, name: string): string {
  const nameCamel = camelCase(name)

  return props.descriptionOptions?.[type]?.[nameCamel]
    ?? (commonDescription[type] as Record<string, string>)[nameCamel]
    ?? '';
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

const propsOptions = computed(() => {
  if (!withManual.value.props) { return [] }

  return Object
    .entries(withManual.value.props)
    .filter(([name, prop]) => !prop.hidden)
    .map(([name, prop]) => ({
      name: name,
      description: getDescription('props', name),
      types: '`' + prop.types + '`',
      default: cleanDefaultValue(prop.default) ?? '',
    }))
    .sort((a, b) => (a.name || '').localeCompare(b.name))
  }
)

const eventsOptions = computed(() => Object
  .entries(withManual.value.events || {})
  .filter(([key, prop]) => !prop.hidden)
  .map(([key, prop]) => ({
    name: key,
    description: prop.types && typeof prop.types === 'string'
      ? {
          text: getDescription('events', key) + '. ' + getDescription('events', 'eventArgument'),
          code: prop.types
        }
      : getDescription('events', key)
  }))
  .sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
)

const slotsOptions = computed(() => Object
  .entries(withManual.value.slots || {})
  .map(([key, prop]) => ({
    name: key,
    description: prop.types
      ? {
          text: getDescription('slots', key) + '. ' + getDescription('slots', 'scopeAvailable'),
          code: prop.types
        }
      : getDescription('slots', key)
  }))
  .sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
)

const methodsOptions = computed(() => Object
  .entries(withManual.value.methods || {})
  .map(([key, prop]) => ({
    name: key,
    description: getDescription('methods', key),
  }))
  .sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
)

const cssVariablesOptions = computed(() => props.cssVariables.map(([name, value, comment]) => ({
  name, value, /* comment */ // TODO: Enable comment when everywhere is used correct comments
  // TODO: Or add translations after i18n splitted
})))

const isValueIsDefaultTranslation = (value: String) => {
  return value.startsWith('`"$t:');
}

const changeLogValue = ref(true)
</script>

<template>
  <VaContent>
    <ApiTable
      v-if="propsOptions.length > 0 && !visualOptions.hideProps"
      :title="visualOptions.hidePropsTitle ? '' : 'Props'"
      :columns="['Name', 'Description', 'Types', 'Default']"
      :data="propsOptions"
    >
      <template #name="{ value, row }">
        <strong>{{ value }}</strong>
        <VaBadge
          v-if="row.required"
          class="ml-2"
          text="required"
          color="primary"
        />
      </template>
      <template
        #default="{value}"
      >
        <div class="flex items-center gap-1">
          <MarkdownView :content="value" />
          <VaPopover
            placement="right"
            trigger="click"
          >
            <VaIcon
              v-if="isValueIsDefaultTranslation(value)"
              name="info"
              color="secondary"
            />
            <template #body>
              <NuxtLink to="/services/i18n#translations">
                Read more
              </NuxtLink>
            </template>
          </VaPopover>
        </div>
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
      <template #name="{ value }">
        <strong class="va-text-code">{{ value }}</strong>
      </template>
      <template #value="{ value }">
        <span class="va-text-code va-text-secondary">{{ value }}</span>
      </template>
    </ApiTable>
  </VaContent>
  <VaCollapse
    v-if="$props.changeLog && $props.changeLog.length > 0"
    v-model="changeLogValue"
    class="mt-8 page-config-api-change-log"
  >
    <template #header="{ bind }">
      <div class="page-config-api-change-log__title" v-bind="bind">
        <h4 class="va-h4">
          Change log
          <Anchor text="Change log" />
        </h4>
        <VaIcon name="va-arrow-down" />
      </div>
    </template>

    <template #content>
      <div class="page-config-api-change-log__content pt-4">
        <div v-for="{ version, changes } in $props.changeLog" :key="version" class="page-config-api-change-log__version-wrapper">
          <div class="page-config-api-change-log__version">
            <VaIcon name="rocket_launch" class="mr-1" size="18px" color="secondary" />
            <span>
              <a :href="`https://github.com/epicmaxco/vuestic-ui/releases/tag/v${version}`">
                v{{ version }}
              </a>
            </span>
          </div>
          <ul>
            <li v-for="change in changes.filter(Boolean)" :key="change">
              <div class="page-config-api-change-log__circle" />
              <MarkdownView :content="change" />
            </li>
          </ul>
        </div>
      </div>
    </template>
  </VaCollapse>
</template>

<style lang="scss">
.page-config-api-change-log {
  margin-bottom: 2rem;

  &__block {
    padding: 1rem 0;
  }

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  li {
    border-left: 2px solid var(--va-background-border);
    padding: 0.1rem 2.5rem;
    padding-left: 0;
    margin: 0;
    margin-left: 0.75rem;
    margin-top: 0.75rem;
    display: flex;

    p, h6 {
      margin: 0 !important;
    }
  }

  &__version {
    display: inline-flex;
    align-items: center;
    background: var(--va-background-element);
    border-radius: 6px;
    padding: 0.25rem 0.5rem;
    margin-left: 0;
    font-weight: 600;
  }

  &__version-wrapper {
    margin-top: 2rem;

    &:first-child {
      margin-top: 0;
    }
  }

  &__circle {
    height: 12px;
    width: 12px;
    border-radius: 99999px;
    background: var(--va-background-primary);
    border: 2px solid var(--va-background-border);
    margin-left: -7px;
    margin-top: 0.45rem;
    margin-right: 14px;
  }

  a {
    color: var(--va-primary);
  }
}
</style>
