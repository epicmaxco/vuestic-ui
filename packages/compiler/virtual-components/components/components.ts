import button from "./button";
import input from './input'

export const virtualComponents = {
  VcButton: {
    props: button.props,
    source: button.source,
    templateAst: button.templateAst,
    script: button.script ?? []
  },
  VcInput: {
    props: input.props,
    source: input.source,
    templateAst: input.templateAst,
    script: input.script ?? []
  }
}
