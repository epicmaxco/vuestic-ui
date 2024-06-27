import type { GlobalBlock, DefinePageConfig, DefineManualApi } from './runtime'

import { markRaw } from 'vue'

export type BaseBlock = { type: string }

type BlockOptions<
  BlockName extends string,
  BlockArgs extends any[],
  BlockReturn extends Record<string, any> & { type: BlockName }
> = {
  component: any,
  setup(...args: BlockArgs): BlockReturn,
}

export const definePageConfigBlock = <
  BlockArgs extends any[],
  BlockName extends string,
  BlockReturn extends Record<string, any> & { type: BlockName }
>(options: BlockOptions<BlockName, BlockArgs, BlockReturn>) => {
  return (...args: BlockArgs) => {
    return {
      ...options.setup(...(args as any)),
      _blockComponent: markRaw(options.component),
    } as BlockReturn
  }
}

declare global {
  const block: GlobalBlock

  const definePageConfig: DefinePageConfig
}
