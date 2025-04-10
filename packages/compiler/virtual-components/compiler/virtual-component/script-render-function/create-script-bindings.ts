import { BindingMetadata, SFCScriptBlock } from '@vue/compiler-sfc'
import { BindingTypes } from '@vue/compiler-core'
import { Statement } from '@babel/types'
import { execute } from '../../execute/execute'

const getImports = (scriptSetupAst: Statement[]) => {
  return scriptSetupAst
    .filter(node => node.type === 'ImportDeclaration')
    .map(node => {
      return {
        from: node.source.value,
        specifiers: node.specifiers.map(specifier => {
          return {
            local: specifier.local.name,
            imported: specifier
          }
        })
      }
    })
    .reduce((acc, i) => {
      i.specifiers.forEach(specifier => {
        acc[specifier.local] = i.from
      })
      return acc
    }, {} as VirtualComponentImports)
}

type VirtualComponentImports = Record<string, string>

export enum VirtualComponentBindingType {
  Static = 'static',
  MaybeDynamic = 'maybe-dynamic',
  Dynamic = 'dynamic',
}

export enum VirtualComponentBindingSource {
  // Static
  Function = 'function', // Function without side effects

  // Maybe dynamic
  Const = 'const',
  Let = 'let',
  Method = 'method', // Function with side effects
  Prop = 'prop',

  // Dynamic
  FromComposable = 'from-composable'
}

export type VirtualComponentBinding = {
  type: VirtualComponentBindingType,
  source: VirtualComponentBindingSource,
  name: string
}

const transformBindings = (bindings: BindingMetadata, imports: VirtualComponentImports) => {
  return Object.entries(bindings).map(([key, binding]) => {
    if (binding === undefined) {
      throw new Error('Not implemented')
    }

    if (typeof binding === 'object') {
      throw new Error('Not implemented')
    }

    if (typeof binding === 'boolean') {
      throw new Error('Not implemented')
    }

    const forceDynamic = key in imports

    const setType = (type: VirtualComponentBindingType) => {
      return forceDynamic ? VirtualComponentBindingType.Dynamic : type
    }

    if (binding === BindingTypes.PROPS) {
      return {
        type: setType(VirtualComponentBindingType.MaybeDynamic),
        source: VirtualComponentBindingSource.Prop,
        name: key
      }
    }

    if (binding === BindingTypes.SETUP_CONST) {
      return {
        type: setType(VirtualComponentBindingType.Static),
        source: VirtualComponentBindingSource.Const,
        name: key
      }
    }

    if (binding === BindingTypes.SETUP_REACTIVE_CONST) {
      return {
        type: setType(VirtualComponentBindingType.Dynamic),
        source: VirtualComponentBindingSource.Const,
        name: key
      }
    }

    if (binding === BindingTypes.SETUP_REF) {
      return {
        type: setType(VirtualComponentBindingType.Dynamic),
        source: VirtualComponentBindingSource.Const,
        name: key
      }
    }

    if (binding === BindingTypes.SETUP_LET) {
      return {
        type: setType(VirtualComponentBindingType.Dynamic),
        source: VirtualComponentBindingSource.Let,
        name: key
      }
    }

    if (binding === BindingTypes.LITERAL_CONST) {
      return {
        type: setType(VirtualComponentBindingType.Static),
        source: VirtualComponentBindingSource.Const,
        name: key
      }
    }

    if (binding === BindingTypes.PROPS_ALIASED) {
      return {
        type: setType(VirtualComponentBindingType.MaybeDynamic),
        source: VirtualComponentBindingSource.Prop,
        name: key
      }
    }

    if (binding === BindingTypes.SETUP_MAYBE_REF) {
      return {
        type: setType(VirtualComponentBindingType.MaybeDynamic),
        source: VirtualComponentBindingSource.Method,
        name: key
      }
    }
  })
  .reduce((acc, binding) => {
    if (binding === undefined) {
      return acc
    }
    acc[binding.name] = binding
    return acc
  }, {} as Record<string, {
    type: VirtualComponentBindingType,
    source: VirtualComponentBindingSource,
    name: string
  }>)
}

/** Do not import components */
const stubComponentsImports = (script: SFCScriptBlock) => {
  let content = script.content
  const imports = script.imports ?? {} as NonNullable<SFCScriptBlock['imports']>

  Object.keys(imports).forEach((imported) => {
    const importBlock = imports[imported]

    if (importBlock.isUsedInTemplate && importBlock.source.endsWith('.vue')) {
      content = content.replace(new RegExp(`import ${imported} from ['|"]${importBlock.source}['|"][;]?`, 'g'), `const ${imported} = { render: () => null }`)
    }
  })

  return content
}

export const createScriptBindings = (script: SFCScriptBlock): Record<string, VirtualComponentBinding> => {
  if (!script.bindings || script.scriptSetupAst === undefined) {
    return {}
  }

  const imports = getImports(script.scriptSetupAst)
  const bindings = transformBindings(script.bindings, imports)

  console.log(stubComponentsImports(script))

  console.log(script)

  return bindings
}
