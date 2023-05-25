import { resolveAlias } from '@nuxt/kit'

import path from 'path'

import type { MetaCheckerOptions } from 'vue-component-meta'
import { createComponentMetaChecker } from 'vue-component-meta'

const checkerOptions: MetaCheckerOptions = {
  forceUseTs: true,
  printer: { newLine: 1 },
}

export const checker = createComponentMetaChecker(
  path.join(resolveAlias('@'), '..', './ui', 'tsconfig.json'),
  checkerOptions,
)
