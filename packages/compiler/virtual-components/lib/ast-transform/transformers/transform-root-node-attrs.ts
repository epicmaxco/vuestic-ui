import { ConstantTypes, ElementNode, NodeTypes } from "@vue/compiler-core";
import { CompilerContext } from "../../create-compiler-context";
import { isPropAttribute } from "../ast-helpers";

/** Apply attributes to root element */
export const transformRootNodeAttrs = (rootNode: ElementNode, ctx: CompilerContext) => {
  ctx.directives.forEach((directive) => {
    rootNode.props.push(directive)
  })

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
