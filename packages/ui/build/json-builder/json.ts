// /* @ts-nocheck */
// import components from './importer'
//
// // imports api options from every component of docs
// import apiOptions from './api-options'
// import { PropOptions } from 'vue-class-component'
//
// // @ts-ignore
// import en from '../../../docs/src/locales/en/en.json'
//
// const path = require('path')
// const pack = require(path.join(__dirname, '../../package.json'))
// const fs = require('fs')
//
// type Prop = {
//   name: string,
//   type?: string | string[],
//   title: string
//   description?: string
// } & PropOptions
//
// type ComponentOption = {
//   name: string,
//   title: string
//   description?: string
//   type?: string | string[],
// }
//
// type Component = {
//   slots?: any[],
//   events?: any[],
//   methods?: any[],
//   props?: any[],
//   name: string
//   title: string
//   importIdentifier: string
//   description?: string
// }
//
// function splitCamelCase (input: string) {
//   return input.replace(/([a-z](?=[A-Z]))/g, '$1 ').toLowerCase()
// }
//
// function snakeToCamel (str: string) {
//   return str.toLowerCase().replace(/([-_][a-z])/g, group =>
//     group
//       .toUpperCase()
//       .replace('-', '')
//       .replace('_', ''),
//   )
// }
//
// function parseSlots (component: string) {
//   const slots = en.api[component]?.slots || en.all.api[component]?.slots
//   if (!slots) {
//     return null
//   }
//
//   return Object.keys(slots).map(key => {
//     return {
//       name: key,
//       title: splitCamelCase(key),
//       description: slots[key],
//     }
//   })
// }
//
// function parseProps (component: string, input: any) {
//   // eslint-disable-next-line
//   const props: object | undefined = en.api[component]?.props || en.all.api[component]?.props || {}
//   const componentApi = apiOptions[component]?.props as any
//
//   if (!props) {
//     return null
//   }
//
//   return Object.keys(props).map((key: string) => {
//     const value: Prop = {
//       name: key,
//       title: splitCamelCase(key),
//       description: (props as any)[key],
//     }
//
//     if (input && input[key]?.type) {
//       value.type = [input[key].type].flat().map(a => (a?.toString()?.split(' ')[1].slice(0, -2)))
//     }
//     if (!value.type && componentApi && componentApi[key]?.types) {
//       value.type = componentApi[key].types
//     }
//
//     if (input && input[key]?.default) {
//       value.default = input[key].default
//     }
//
//     // eslint-disable-next-line
//     if (value.default === undefined && componentApi && componentApi[key] && (componentApi[key] as object).hasOwnProperty('default')) {
//       value.default = componentApi[key].default
//     }
//
//     if (input && input[key]) {
//       value.required = input[key].required === true
//     }
//     return value
//   })
// }
//
// function parseEmits (component: string, input: any) {
//   const events = en.api[component]?.events || en.all.api[component]?.events
//   const componentApi = apiOptions[component]?.events as any
//
//   if (!events) {
//     return null
//   }
//
//   return Object.keys(events).map(key => {
//     const value: ComponentOption = {
//       name: key,
//       title: key.replace(':', ' '),
//     }
//
//     if (events[snakeToCamel(key)] || events[key]) {
//       value.description = events[snakeToCamel(key)] || events[key]
//     }
//
//     if (componentApi && componentApi[key]) {
//       value.type = componentApi[key].types
//     }
//
//     return value
//   })
// }
//
// function parseMethods (component: string, methods: any) {
//   const methodKeys = Object.keys(methods || {})
//   const methodTranslations = en.api[component]?.methods || en.all.api[component]?.methods
//   const componentApi = apiOptions[component]?.methods as any
//
//   return methodKeys.filter(a => a.length).map((key: string) => {
//     const value: ComponentOption = {
//       name: key,
//       title: splitCamelCase(key),
//     }
//
//     if (methodTranslations && methodTranslations[key]) {
//       value.description = methodTranslations[key]
//     }
//
//     if (componentApi && componentApi[key]) {
//       value.type = componentApi[key].types
//     }
//
//     return value
//   })
// }
//
// const result = {
//   name: pack.name,
//   description: pack.description,
//   components: components.map((el: any) => {
//     const value: Component = {
//       name: el.name,
//       title: el.name.slice(2),
//       importIdentifier: `import { ${el.name} } from 'vuestic-ui'`,
//     }
//     const slots = parseSlots(el.name)
//     const props = parseProps(el.name, el?.props)
//     const methods = parseMethods(el.name, el?.methods)
//     const events = parseEmits(el.name, el?.emits)
//
//     if (slots?.length) {
//       value.slots = slots
//     }
//
//     if (props?.length) {
//       value.props = props
//     }
//
//     if (methods?.length) {
//       value.methods = methods
//     }
//
//     if (events?.length) {
//       value.events = events
//     }
//
//     return value
//   }),
// }
//
// fs.writeFileSync('./dist/json/builder.json', JSON.stringify(result))
