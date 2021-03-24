// @ts-nocheck
// See https://github.com/Akryum/v-tooltip/issues/473
// TODO Feel free to remove this declaration once it's fixed.

import Vue, { VueConstructor, DirectiveOptions, PluginFunction } from 'vue'

declare const vToolTip: PluginFunction<unknown>
export default vToolTip

export const VPopover: VueConstructor<Vue>
export const VClosePopover: DirectiveOptions
export const VTooltip: DirectiveOptions
