import { ElementNode } from "@vue/compiler-core"
import { CompilerComponent } from "./context"
import { walkSlots } from "./walk"
import { parse } from "@vue/compiler-sfc"

// export const removeProp = (ctx: CompilerComponent, prop: string) => {
//   return ctx.props = ctx.props.filter((p) => p.name !== prop)
// }

// export const addProp = (ctx: CompilerComponent, prop: string, value: string) => {
//   return ctx.props.push({
//     name: prop,
//     value: value
//   })
// }

export const makeDiv = () => {
  return {

  } as ElementNode
}

export const replaceSlot =  (ctx: CompilerComponent, slotName: string, newSlot: string) => {
  const source = ctx.source.trim()

  const result = parse(`<template>${source}</template>`)

  walkSlots(result.descriptor.template?.ast as any, (node, parent) => {
    const relativeOffset = {
      start: node.loc.start.offset - parent.loc.start.offset,
      end: parent.loc.source.length + node.loc.end.offset - parent.loc.end.offset
    }

    ctx.source = ctx.source.slice(0, relativeOffset.start) + newSlot + ctx.source.slice(relativeOffset.end)
  })

  return result.descriptor.template?.ast
}
