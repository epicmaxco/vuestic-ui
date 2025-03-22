import { AttributeNode, DirectiveNode, ElementNode, NodeTypes, RootNode, TextNode, Node } from "@vue/compiler-core";
import { CompilerNodeContext } from "../../create-compilation-context/create-node-context";
import { normalizeClass, normalizeStyle } from "@vue/shared";
import { isNodeElement, isPropAttribute, isPropDirective, patchNode } from "../ast-helpers";
import { transformAstWithContext } from "../transform-node";
import { VirtualComponentError } from "../../errors";

const transformBindDirective = (prop: DirectiveNode, ctx: CompilerNodeContext) => {
  if (prop.exp?.type !== NodeTypes.SIMPLE_EXPRESSION) {
    console.warn('Only simple expressions are supported in prop binds')
    return
  }

  if (!prop.arg || prop.arg.type !== NodeTypes.SIMPLE_EXPRESSION) {
    throw new VirtualComponentError('Invalid bind directive: v-bind directive is not supported yet. Use :prop instead')
  }

  const result = ctx.execute(prop.exp.content)

  if (prop.arg.content === 'class') {
    result.value = normalizeClass(result.value)
  } else if (prop.arg.content === 'style') {
    result.value = normalizeStyle(result.value)
  }

  if (result.isDynamic) {
    prop.exp.content = ctx.execute.printInTemplate(result, 'Bind')
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
}

const transformIfDirective = (prop: DirectiveNode, node: ElementNode, parent: ElementNode | RootNode, ctx: CompilerNodeContext) => {
  if (prop.exp?.type !== NodeTypes.SIMPLE_EXPRESSION) {
    console.warn('Only simple expressions are supported in v-if')
    return
  }

  const result = ctx.execute(prop.exp.content)

  if (result.value) {
    if (!result.isDynamic) {
      node.props = node.props.filter((p) => prop !== p)
    } else {
      prop.exp.content = ctx.execute.printInTemplate(result, 'Bind')
    }

    return
  }

  parent.children = parent.children.filter((child) => child !== node)
}

const transformForDirective = (prop: DirectiveNode, node: ElementNode, parent: ElementNode | RootNode, ctx: CompilerNodeContext) => {
  const arrayStr = prop.forParseResult?.source.loc.source
  const argsStr = prop.forParseResult?.value?.loc.source

  if (!arrayStr || !argsStr) {
    throw new VirtualComponentError('Invalid v-for directive: Unable to parse v-for')
  }

  const providedProp = ctx.dynamicProps.find((prop) => prop.name === arrayStr)

  if (!providedProp) {
    throw new VirtualComponentError('Invalid v-for directive: No prop passed')
  }

  if (!providedProp.value) {
    throw new VirtualComponentError('Unexpected missing value in v-for directive')
  }

  const executionResult = ctx.execute(providedProp.value)

  let array = executionResult.value
  if (executionResult.isDynamic) {
    array = ctx.execute.tryGetValue(executionResult.value)
  }

  if (array && Array.isArray(array)) {
    node.props = node.props.filter((p) => p !== prop)
    node.props = node.props.filter((p) => isPropDirective(p) && p.name === 'bind' && 'content' in p.arg! && p.arg?.content !== 'key')

    const children = array.map((item) => {
      const clonedNode = structuredClone(node)

      const scope = { static: { item } }

      ctx.execute.addScope(scope)

      const newNode = transformAstWithContext(clonedNode, ctx)

      ctx.execute.removeScope(scope)

      return newNode
    })

    parent.children = parent.children.map((child) => {
      if (child === node) {
        return children
      }

      return child
    }).flat()

    return
  } else {
    const key = node.props.find((p) => isPropDirective(p) && p.name === 'bind' && 'content' in p.arg! && p.arg?.content === 'key')

    node.props = node.props.filter((p) => p !== key)

    const scope = { dynamic: { item: 'item'}}

    parent.children = parent.children.map((child) => {
      if (!isNodeElement(child)) { return child }

      ctx.execute.addScope(scope)

      const newNode = transformAstWithContext(child, ctx)

      ctx.execute.removeScope(scope)

      return newNode
    })

    if (key) node.props.push({...key})
  }
}

export const transformPropBind = (prop: DirectiveNode, node: ElementNode, parent: ElementNode | RootNode, ctx: CompilerNodeContext) => {
  if (!prop) { return }

  if (prop.name === 'bind') {
    return transformBindDirective(prop, ctx)
  } else if (prop.name === 'if') {
    return transformIfDirective(prop, node, parent, ctx)
  } else if (prop.name === 'for') {
    return transformForDirective(prop, node, parent, ctx)
  } else if (prop.name === 'slot') {
    // pass
    return
  }

  throw new VirtualComponentError(`Unexpected Error: Unexpected directive ${prop.name}`)
}

export const mergeDuplicate = (props: (DirectiveNode | AttributeNode)[]) => {
  const newProps = [] as (DirectiveNode | AttributeNode)[]

  props.forEach((prop) => {
    if (!newProps.find((p) => p.name === prop.name)) {
      newProps.push(prop)
    } else {
      if (isPropAttribute(prop) && (prop.name === 'class' || prop.name === 'style')) {
        const existingProp = newProps.find((p) => p.name === prop.name) as AttributeNode
        const existingValue = existingProp.value?.content
        const newValue = prop.value?.content

        if (prop.name === 'class') {
          existingProp.value!.content = normalizeClass(`${existingValue} ${newValue}`)
        } else {
          existingProp.value!.content = String(normalizeStyle(`${existingValue}; ${newValue}`))
        }
      }
    }
  })

  return newProps
}
