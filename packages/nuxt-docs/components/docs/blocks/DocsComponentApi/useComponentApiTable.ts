import { ComponentApi } from "~~/components/docs/blocks/DocsComponentApi/useComponentApi";
import { ManualApiOptions } from "~~/types/page-config";
import { MaybeRef } from "~~/types/utils";
import { TableColumns, TableDataRecord } from "../DocsTable/DocsTableTypes";
import camelCase from 'lodash/camelCase.js'
import kebabCase from 'lodash/kebabCase.js'
import { useI18n } from "~~/composables/useI18n";

type OptionsType = 'props' | 'events' | 'methods' | 'slots'

const columns: Record<OptionsType, TableColumns> = {
  props: [
    { title: 'name', type: 'strong' },
    { title: 'description', type: 'markdown' },
    { title: 'types', type: 'code' },
    { title: 'default', type: 'code' },
    { title: 'required' },
    // { title: 'Version' },
  ],
  events: [
    { title: 'name', type: 'strong' },
    { title: 'description' },
    { title: 'types', type: 'code' },
  ],
  slots: [
    { title: 'name', type: 'strong' },
    { title: 'description' },
  ],
  methods: [
    { title: 'name', type: 'strong' },
    { title: 'description' },
    { title: 'types', type: 'code' },
  ]
}

const getConstructorname = (fn: () => any) => {
  const match = fn && fn.toString().match(/^\s*function (\w+)/)
  return match ? match[1] : ''
}

type PropTypeConstructor = Boolean | String | Number | Array<any> | Object | string
const propTypeToString = (types: PropTypeConstructor | PropTypeConstructor[]) => {
  if (typeof types === 'string') { return types }

  const norm = Array.isArray(types) ? types : [types]

  return norm.map((constructor) => getConstructorname(constructor)).join(' | ')
}

const createSortTextComarator = (sortBy: any) => (a,b) => a[sortBy] < b[sortBy] ? -1 : 1 

export const useComponentApiTable = (api: MaybeRef<ComponentApi>, manualApi: ManualApiOptions) => {
  const { te, fallbackLocale } = useI18n()
  
  const getTranslationKey = (name: string, type: 'props' | 'events' | 'methods' | 'slots') => {
    const camelName = camelCase(name)

    const localKey = `api.${unref(api).componentName}.${type}.${camelName}`
    if (te(localKey) || te(localKey, fallbackLocale.value as string)) { return localKey }

    const globalKey = `api.all.${type}.${camelName}`
    if (te(globalKey) || te(globalKey, fallbackLocale.value as string)) { return globalKey }

    return ''
  }

  const safeManual = <Key extends OptionsType>(name: string, type: Key): ManualApiOptions[Key][string] => {
    return manualApi?.[type]?.[name] || {} as any
  }

  const props = Object.entries(unref(api).props)
    .map(([name, prop]): TableDataRecord => {
      const manual = safeManual(name, 'props')
      if (manual.hidden) { return undefined }

      return [
        kebabCase(manual.name || name),
        manual.translation || getTranslationKey(name, 'props'),
        manual.types || propTypeToString(prop.type),
        prop.default ? prop.default.toString() : '',
        prop.required ? '*' : '',
      ]
    })
    .filter((el) => typeof el !== 'undefined')
    .sort(createSortTextComarator(0))

  const events = unref(api).emits
    .map((name): TableDataRecord  => {
      const manual = safeManual(name, 'events')
      if (manual.hidden) { return undefined }

      return [
        kebabCase(manual.name || name),
        manual.translation || getTranslationKey(name, 'events'),
        manual.types || '',
      ]
    })
    .filter((el) => typeof el !== 'undefined')
    .sort(createSortTextComarator(0))
  
  const methods = Object.keys(manualApi.methods)
    .map((name): TableDataRecord  => {
      const manual = safeManual(name, 'methods')
      // if (manual.hidden) { return undefined }

      return [
        kebabCase(manual.name || name),
        manual.translation || getTranslationKey(name, 'methods'),
        manual.types,
      ]
    })
    .filter((el) => typeof el !== 'undefined')
    .sort(createSortTextComarator(0))

  const slots = Object.keys(manualApi.slots)
    .map((name): TableDataRecord  => {
      const manual = safeManual(name, 'slots')

      return [
        kebabCase(manual.name || name),
        manual.translation || getTranslationKey(name, 'slots'),
      ]
    })
    .sort(createSortTextComarator(0))

  return {
    columns,
    tableData: {
      props,
      events,
      methods,
      slots
    }
  }
}