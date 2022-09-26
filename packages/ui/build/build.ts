import { $ } from 'deploy/execute'
import { defineVuesticBuild } from './types/define-vuestic-build'
import { buildStart } from './steps/buildStart'
import { buildEnd } from './steps/buildEnd'

defineVuesticBuild(async () => {
  buildStart()

  await Promise.all([
    $('npm run build:types', { successMessage: 'types built' }),
    $('vite build --config ./build/configs/vite.cjs.ts', { successMessage: 'cjs built' }),
    $('vite build --config ./build/configs/vite.iife.ts', { successMessage: 'iife built' }),
    $('vite build --config ./build/configs/vite.es.ts', { successMessage: 'esm built' }),
    $('vite build --config ./build/configs/vite.mjs.ts', { successMessage: 'esm-node built' }),
  ])

  await $('vite build --config ./build/configs/vite.styles.ts', { successMessage: 'styles built' })
  await $('vite build --config ./build/configs/vite.styles-essential.ts', { successMessage: 'essential styles built' })

  buildEnd()
})
