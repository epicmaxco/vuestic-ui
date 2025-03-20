import { AttributeNode, NodeTypes, RootNode, type TextNode, type ElementNode, type Node, ConstantTypes } from "@vue/compiler-core";
import { type VirtualComponent } from "./create-virtual-component";
import { createCompilerContext, type CompilerContext } from "./create-compiler-context";
import {  walkPropBinds, walkSlots, walkTemplateInterpolations } from '../compiler/walk'
import { isPropAttribute } from "./utils";
import { createInTemplateExecuter, printValueInTemplate } from "./execute/print-rendering-context";
import { normalizeClass, normalizeStyle } from 'vue'

function getNodeSlotName(node: ElementNode): string | undefined {
  const nameProp = node.props.find((prop) => prop.name === 'name')

  if (nameProp && isPropAttribute(nameProp)) {
    return nameProp.value?.content
  }

  return undefined
}

const patchNode = <T extends Node>(node: Node, newNode: T) => {
  const keys = Object.keys(node) as (keyof Node)[]
  for (const key of keys) {
    delete node[key]
  }

  Object.assign(node, newNode)

  return node
}

export const applySlots = (ast: RootNode, node: ElementNode, ctx: CompilerContext) => {
  walkSlots(ast, (node, parent) => {
    if (parent.type !== NodeTypes.ELEMENT) {
      return
    }

    const nodeIndex = parent.children.indexOf(node)

    const slotName = getNodeSlotName(node) || 'default'
    const slot = ctx.slots[slotName]

    if (!slot) {
      parent.children.splice(nodeIndex, 1)
      return
    }

    parent.children.splice(nodeIndex, 1, ...slot.children)
  })
}

export const applyPropBinds = (ast: RootNode, node: ElementNode, ctx: CompilerContext) => {
  const execute = createInTemplateExecuter(ctx)

  walkPropBinds(ast, (prop, node, parent) => {
    if (!prop) { return }

    if (prop.exp?.type !== NodeTypes.SIMPLE_EXPRESSION) {
      console.warn('Only simple expressions are supported in prop binds')
      return
    }

    if (!prop.arg || prop.arg.type !== NodeTypes.SIMPLE_EXPRESSION) {
      // Hide elements on v-if
      if (prop.type === NodeTypes.DIRECTIVE && prop.name === 'if') {
        const result = execute(prop.exp.content)

        if (result.value) {
          if (!result.isDynamic) {
            node.props = node.props.filter((p) => prop !== p)
          } else {
            prop.exp.content = printValueInTemplate(result, 'Bind')
          }

          return
        }

        parent.children = parent.children.filter((child) => child !== node)
        return
      }

      if (prop.type === NodeTypes.DIRECTIVE && prop.name === 'for') {
        const arrayStr = prop.forParseResult?.source.loc.source

        if (!arrayStr) {
          throw new Error('Invalid v-for directive: Unable to parse v-for')
        }

        const providedProp = ctx.dynamicProps.find((prop) => prop.name === arrayStr)

        if (!providedProp) {
          throw new Error('Invalid v-for directive: No prop passed, idk what to do')
        }

        const array = execute(providedProp.value)

        if (array.value && Array.isArray(array.value)) {
          // const children = array.value.map((item) => {
          //   const clonedNode = structuredClone(node)

          //   return null
          // })

          // parent.children.splice(parent.children.indexOf(node), 1, ...children)
          return
        } else {
          throw new Error('Invalid v-for directive: Expected array')
        }
      }

      throw new Error('Invalid bind directive')
    }

    const result = execute(prop.exp.content)

    if (prop.arg.content === 'class') {
      result.value = normalizeClass(result.value)
    } else if (prop.arg.content === 'style') {
      result.value = normalizeStyle(result.value)
    }

    if (result.isDynamic) {
      prop.exp.content = printValueInTemplate(result, 'Bind')
    } else {
      patchNode<AttributeNode>(prop, {
        type: NodeTypes.ATTRIBUTE,
        loc: prop.loc,
        name: prop.arg.content,
        nameLoc: prop.arg.loc,
        value: {
          type: NodeTypes.TEXT,
          content: result.value,
          loc: prop.exp.loc
        } satisfies TextNode,
      })
    }
  })
}

export const applyTextInterpolations = (ast: RootNode, node: ElementNode, ctx: CompilerContext) => {
  const execute = createInTemplateExecuter(ctx)

  walkTemplateInterpolations(ast, (node) => {
    if (node.content.type !== NodeTypes.SIMPLE_EXPRESSION) {
      throw new Error('Only simple expressions are supported in text interpolations')
    }

    const result = execute(node.content.content)

    patchNode(node, {
      type: NodeTypes.TEXT,
      content: printValueInTemplate(result, 'Interpolation'),
      loc: node.loc
    })
  })
}

const applyAttrs = (ast: RootNode, node: ElementNode, ctx: CompilerContext) => {
  if (ctx.attrs.length === 0 && ctx.dynamicAttrs.length === 0) {
    return
  }

  if (ast.children.length > 1) {
    console.warn('Can not pass custom attributes to components with multiple root nodes')
    return
  }

  const rootNode = ast.children[0] as ElementNode

  ctx.attrs.forEach(({ name, value }) => {
    if (name === 'class' || name === 'style') {
      const prop = rootNode.props.find((prop) => prop.name === name)

      if (!prop || !('value' in prop)) {
        return
      }

      if (!prop.value) {
        throw new Error('Expected prop value')
      }

      prop.value.content = `${prop.value.content} ${value}`
      return
    }

    if (rootNode.props.find((prop) => prop.name === name && isPropAttribute(prop))) {
      return
    }

    rootNode.props.push({
      type: NodeTypes.ATTRIBUTE,
      name,
      nameLoc: {
        start: { offset: -1, column: -1, line: -1 },
        end: { offset: -1, column: -1, line: -1 },
        source: ''
      },
      loc: {
        start: { offset: -1, column: -1, line: -1 },
        end: { offset: -1, column: -1, line: -1 },
        source: ''
      },
      value: {
        type: NodeTypes.TEXT,
        content: String(value),
        loc: {
          start: { offset: -1, column: -1, line: -1 },
          end: { offset: -1, column: -1, line: -1 },
          source: ''
        }
      }
    })
  })

  ctx.dynamicAttrs.forEach(({ name, value }) => {
    if (name === 'class' || name === 'style') {

    }

    if (rootNode.props.find((prop) => prop.name === name && !isPropAttribute(prop))) {
      return
    }

    rootNode.props.push({
      type: NodeTypes.DIRECTIVE,
      name: 'bind',
      loc: {
        start: { offset: -1, column: -1, line: -1 },
        end: { offset: -1, column: -1, line: -1 },
        source: ''
      },
      exp: {
        type: NodeTypes.SIMPLE_EXPRESSION,
        content: value,
        loc: {
          start: { offset: -1, column: -1, line: -1 },
          end: { offset: -1, column: -1, line: -1 },
          source: ''
        },
        isStatic: false,
        constType: ConstantTypes.NOT_CONSTANT
      },
      arg: {
        type: NodeTypes.SIMPLE_EXPRESSION,
        content: name,
        loc: {
          start: { offset: -1, column: -1, line: -1 },
          end: { offset: -1, column: -1, line: -1 },
          source: ''
        },
        isStatic: true,
        constType: ConstantTypes.CAN_STRINGIFY
      },
      modifiers: []
    })
  })
}

/** Apply virtual component to AST Node */
export const transformAstNode = (node: ElementNode, component: VirtualComponent) => {
  const ctx = createCompilerContext(node, component)
  const newAst = structuredClone(component.templateAst)

  // TODO: Move to one walk
  applySlots(newAst, node, ctx)
  applyPropBinds(newAst, node, ctx)
  applyTextInterpolations(newAst, node, ctx)
  applyAttrs(newAst, node, ctx)

  return newAst
}
