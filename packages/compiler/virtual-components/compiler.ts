import { MagicString, parse } from '@vue/compiler-sfc'
import { createCompilerContext } from './compiler/context'
import { walkCompiledVIf, walkPropBinds, walkSlots, walkTags } from './compiler/walk'
import { virtualComponents } from './components/components'
import { renderTemplate } from './renderer/template'
import { AttributeNode, ElementNode, NodeTypes } from '@vue/compiler-core'

const toCamelCase = (str: string) => {
  return str.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase())
}


const mergeObj = (target: any, obj: any) => {
  for (const key in obj) {
    target[key] = obj[key]
  }
}

const execute = (code: string) => {
  try {
    return (0, eval)(code)
  } catch (e) {
    console.error(e)
    throw new Error(`Failed to execute code: ${code}`)
  }
}

export const compile = (code: string, id: string) => {
  const parsingResult = parse(code)
  const templateAst = parsingResult.descriptor.template?.ast

  if (!templateAst) {
    return
  }

  let source = new MagicString(code)

  walkTags(templateAst, (node) => {
    const componentName = node.tag as keyof typeof virtualComponents
    const component = virtualComponents[componentName as 'VcButton']
    if (component) {
      const ctx = createCompilerContext(node, component.source)

      const componentTemplateAst = structuredClone(parse(component.source, { }).descriptor.template?.ast)

      component.script.forEach((script) => {
        const code = `(${script.arguments}) => ${script.body}`

        const computedProps = (execute(code)(ctx.props))

        mergeObj(ctx.props, computedProps)
      })

      walkSlots(componentTemplateAst!, (node, parent) => {
        if (!('children' in parent)) {
          return
        }
        const nodeIndex = (parent as ElementNode).children.indexOf(node)

        const slotName = node.props.find((prop) => prop.name === 'name')?.name ?? 'default'
        const slot = ctx.slots[slotName]

        if (!slot) {
          parent.children.splice(nodeIndex, 1)
          return
        }

        parent.children.splice(nodeIndex, 1, ...slot.children)
      })

      // const propsCode = Object
      //   .keys({
      //     ...component.props,
      //     ...ctx.props
      //   })
      //   .map((propName) => `const ${toCamelCase(propName)} = ${JSON.stringify(ctx.props[propName] === "" ? true : ctx.props[propName])}`)
      //   .join(';')

      const allProps = { ...component.props, ...ctx.props}
      const destructedProps = `{ ${Object.keys(allProps).filter((p) => !['class'].includes(p)).join(', ')} }`

      walkCompiledVIf(componentTemplateAst!, (node, parent) => {
        if (!('children' in parent)) {
          return
        }

        const prop = (node.props).find((prop) => prop.name === '$v-if') as AttributeNode

        if (!prop) {
          return
        }

        const condition = prop.value?.content

        const code = `($props, ${destructedProps}) => ${condition}`  //`${propsCode};Boolean(${condition})`

        console.log(code)

        const doShow = execute(code)(ctx.props, ctx.props)

        if (!doShow) {
          const index = (parent as ElementNode).children.indexOf(node)
          parent.children.splice(index, 1)
        }
      })

      walkPropBinds(componentTemplateAst!, (prop, parent) => {
        if (!prop) {
          return
        }

        if (prop.exp?.type !== NodeTypes.SIMPLE_EXPRESSION) {
          return
        }

        const fn = `(($props, ${destructedProps}) => ${prop.exp.content})`

        const simplifiedExp = execute(fn)(ctx.props, ctx.props)

        prop.exp.content = JSON.stringify(simplifiedExp).replace(/"/g, "'")
      })

      if (!('props' in componentTemplateAst!.children[0])) {
        throw new Error('Expected root element in component template')
      }

      const props = componentTemplateAst!.children[0].props

      props.push(...ctx.directives)

      ctx.rawProps.forEach(({ rawName: propName, value }) => {
        if (propName in component.props) {
          return
        }

        if (!componentTemplateAst!.children || componentTemplateAst!.children.length > 1) {
          console.warn('Can not pass custom attributes to components with multiple root nodes')
          return
        }

        if (propName === 'class' || propName === 'style') {
          const prop = props.find((prop) => prop.name === propName)

          if (!prop || !('value' in prop)) {
            return
          }

          if (!prop.value) {
            throw new Error('Expected prop value')
          }

          prop.value.content = `normalizeClass([${prop.value.content}, ${value}])`
          return
        }

        if (props.find((prop) => prop.name === propName)) {
          return
        }

        props.push({
          type: NodeTypes.ATTRIBUTE,
          name: propName,
          value: {
            type: NodeTypes.TEXT,
            content: String(value),
            loc: {
              start: { offset: -1, line: -1, column: -1 },
              end: { offset: -1, line: -1, column: -1 },
              source: ''
            }
          },
          loc: {
            start: { offset: -1, line: -1, column: -1 },
            end: { offset: -1, line: -1, column: -1 },
            source: ''
          },
          nameLoc: {
            start: { offset: -1, line: -1, column: -1 },
            end: { offset: -1, line: -1, column: -1 },
            source: ''
          }
        })
      })

      source.overwrite(node.loc.start.offset, node.loc.end.offset, renderTemplate(componentTemplateAst!))
    }
  })

  return source.toString()
}
